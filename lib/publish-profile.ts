"use server";

import { randomUUID, createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { getDb } from "./db";
import { requireAdmin } from "./require-admin";

function slugify(text: string) {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function publishProfile(id: string, version: number) {
  await requireAdmin();
  const slug = await getDb().$transaction(async tx => {
    await tx.$queryRaw`SELECT id FROM directory."OnboardingCandidate" WHERE id = ${id}::uuid FOR UPDATE`;
    const candidate = await tx.onboardingCandidate.findUnique({ where: { id }, include: { submission: true } });
    if (!candidate || candidate.reviewStatus !== "APPROVED") notFound();
    if (candidate.publishedSlug && candidate.publishedVersion === version) return candidate.publishedSlug;
    const snapshot = candidate.submission;
    if (!snapshot || snapshot.version !== version) redirect(`/admin/${id}`);

    const firm = await tx.firm.upsert({ where: { name: snapshot.firmName }, create: { name: snapshot.firmName }, update: {} });
    const fields = { name: snapshot.name, title: snapshot.claimedTitle, bio: snapshot.bio, firmId: firm.id, published: true };
    const profileSlug = candidate.publishedSlug ?? `${slugify(snapshot.name) || "jurist"}-${id}`;
    if (candidate.publishedSlug) {
      await tx.providerProfile.update({ where: { slug: profileSlug }, data: fields });
      await tx.service.deleteMany({ where: { profileSlug } });
      await tx.profileSpecialty.deleteMany({ where: { profileSlug } });
    } else {
      await tx.providerProfile.create({ data: { slug: profileSlug, ...fields } });
    }
    if (snapshot.services.length) {
      await tx.service.createMany({ data: snapshot.services.map((name, position) => ({
        id: randomUUID(), name, description: "", profileSlug, position,
      })) });
    }
    for (const [position, name] of [...new Set(snapshot.specialties)].entries()) {
      const base = slugify(name);
      const existing = base && await tx.specialty.findUnique({ where: { slug: base } });
      const specialtySlug = existing && existing.name === name ? base :
        `${base || "omrade"}-${createHash("sha256").update(name).digest("hex").slice(0,16)}`;
      await tx.specialty.upsert({ where: { slug: specialtySlug }, create: { name, slug: specialtySlug }, update: {} });
      await tx.profileSpecialty.create({ data: { profileSlug, specialtySlug, position } });
    }
    await tx.onboardingCandidate.update({ where: { id }, data: { publishedSlug: profileSlug, publishedVersion: version } });
    await tx.profileSubmission.delete({ where: { candidateId: id } });
    return profileSlug;
  }, { timeout: 30000 });
  for (const path of ["/admin", `/admin/${id}`, "/min-profil", "/search", `/profile/${slug}`]) revalidatePath(path);
  redirect(`/admin/${id}`);
}
