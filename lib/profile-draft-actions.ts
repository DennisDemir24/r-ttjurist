"use server";

import { forbidden } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb } from "./db";
import { providerAccess } from "./provider";

export async function saveProfileDraft(id: string, version: number, form: FormData) {
  const access = await providerAccess();
  const where = { ...access, id };
  const db = getDb();
  if (!await db.onboardingCandidate.count({ where })) forbidden();
  const bio = String(form.get("bio") ?? "").trim();
  const lines = (key: string) => String(form.get(key) ?? "").split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const specialties = lines("specialties");
  const services = lines("services");
  if (bio.length > 4000 || specialties.length > 20 || services.length > 20 ||
      specialties.some(s => s.length > 120) || services.some(s => s.length > 300)) {
    return { message: "Kontrollera fältens längd och antal rader.", version };
  }
  const result = await db.onboardingCandidate.updateMany({
    where: { ...where, draftVersion: version },
    data: { draftBio: bio, draftSpecialties: specialties, draftServices: services, draftVersion: { increment: 1 } },
  });
  if (!result.count) return { message: "Utkastet har ändrats eller åtkomsten har upphört. Ladda om sidan.", version };
  revalidatePath("/min-profil");
  return { message: "Utkastet har sparats.", version: version + 1 };
}

export async function submitProfileDraft(id: string, version: number) {
  const access = await providerAccess();
  const db = getDb();
  const result = await db.$transaction(async tx => {
    await tx.$queryRaw`SELECT id FROM directory."OnboardingCandidate" WHERE id = ${id}::uuid FOR UPDATE`;
    const draft = await tx.onboardingCandidate.findFirst({ where: { ...access, id } });
    if (!draft) forbidden();
    if (draft.publishedVersion === version) return "Versionen är redan publicerad.";
    if (draft.draftVersion !== version || !version) return "Ladda om sidan och kontrollera den sparade versionen.";
    if (!draft.draftBio && !draft.draftSpecialties.length && !draft.draftServices.length) return "Fyll i och spara utkastet först.";
    await tx.profileSubmission.createMany({
      data: { candidateId: id, version, name: draft.name, firmName: draft.firmName,
        claimedTitle: draft.claimedTitle, bio: draft.draftBio, specialties: draft.draftSpecialties, services: draft.draftServices },
      skipDuplicates: true,
    });
    return "Väntar på granskning";
  });
  revalidatePath("/min-profil");
  revalidatePath("/admin");
  return result;
}
