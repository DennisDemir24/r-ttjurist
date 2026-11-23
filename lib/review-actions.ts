"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { getDb } from "./db";
import { requireAdmin } from "./require-admin";
import { auth } from "./auth";

function refresh(id: string) {
  revalidatePath(`/admin/${id}`);
  revalidatePath("/admin");
}

export async function reviewCandidate(id: string, form: FormData) {
  const admin = await requireAdmin();
  const decision = form.get("decision");
  const note = String(form.get("note") ?? "").trim();
  if (!note || note.length > 1500 || (decision !== "APPROVED" && decision !== "REJECTED")) {
    return "Ange ett beslut och ett granskningsunderlag på högst 1 500 tecken.";
  }
  if (decision === "APPROVED" && ["identity", "title", "firm"].some(key => form.get(key) !== "on")) {
    return "Kontrollera personen, yrkestiteln och anknytningen till byrån före godkännande.";
  }
  const result = await getDb().onboardingCandidate.updateMany({
    where: { id, reviewStatus: "PENDING" },
    data: { reviewStatus: decision, reviewedAt: new Date(), reviewedBy: admin.id, reviewNote: note },
  });
  refresh(id);
  return result.count ? "Beslutet har sparats." : "Ansökan har redan granskats.";
}

export async function sendInvitation(id: string) {
  await requireAdmin();
  const origin = (await headers()).get("origin");
  if (!origin) return "Ladda om kandidatsidan och skicka inbjudan igen.";
  try {
    const message = await getDb().$transaction(async tx => {
      // Serialize sends for one candidate, including concurrent clicks from two tabs.
      await tx.$queryRaw`SELECT id FROM directory."OnboardingCandidate" WHERE id = ${id}::uuid FOR UPDATE`;
      const candidate = await tx.onboardingCandidate.findUniqueOrThrow({ where: { id } });
      if (candidate.reviewStatus !== "APPROVED") return "Godkänn kandidaten före inbjudan.";
      const latest = await tx.providerInvitation.findFirst({ where: { candidateId: id }, orderBy: { sentAt: "desc" } });
      if (latest?.acceptedAt) return "Inbjudan har redan accepterats.";
      if (latest && Date.now() - latest.sentAt.getTime() < 60000) return "Vänta en minut innan du skickar en ny kod.";
      const [user] = await tx.$queryRaw<{ id: string }[]>`SELECT id FROM neon_auth."user" WHERE lower(email) = lower(${candidate.email})`;
      if (!user) return "Skapa ett konto med kandidatens e-postadress i Neon Auth och skicka sedan inbjudan igen.";
      const response = await fetch(`${process.env.NEON_AUTH_BASE_URL?.replace(/\/$/, "")}/email-otp/request-password-reset`, {
        method: "POST", signal: AbortSignal.timeout(8000), headers: { "Content-Type": "application/json", Origin: origin },
        body: JSON.stringify({ email: candidate.email }),
      });
      if (!response.ok) {
        console.error("Neon activation request failed", { status: response.status });
        if (response.status === 429) return "För många kodförfrågningar. Vänta en stund och försök igen.";
        return "Neon kunde inte skicka aktiveringskoden. Kontrollera att webbplatsens adress är tillåten i Neon Auth.";
      }
      const now = new Date();
      await tx.providerInvitation.updateMany({ where: { candidateId: id, revokedAt: null, acceptedAt: null }, data: { revokedAt: now } });
      await tx.providerInvitation.create({ data: { candidateId: id, authUserId: user.id, recipientEmail: candidate.email, sentAt: now, expiresAt: new Date(now.getTime() + 7 * 86400000) } });
      return "En aktiveringskod har begärts. Kandidaten anger koden på /aktivera.";
    }, { timeout: 25000 });
    refresh(id);
    return message;
  } catch {
    return "Inbjudan kunde inte bekräftas. Kontrollera Neon-konfigurationen och försök igen.";
  }
}

export async function acceptInvitation() {
  const { data } = await auth.getSession();
  if (!data?.user) return false;
  const now = new Date();
  const result = await getDb().providerInvitation.updateMany({
    where: { authUserId: data.user.id, recipientEmail: data.user.email.toLowerCase(), acceptedAt: null, revokedAt: null,
      expiresAt: { gt: now }, candidate: { reviewStatus: "APPROVED" } },
    data: { acceptedAt: now },
  });
  return result.count > 0;
}
