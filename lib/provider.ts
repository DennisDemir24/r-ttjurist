import "server-only";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import type { Prisma } from "./generated/prisma/client";

export async function providerAccess() {
  const { data, error } = await auth.getSession();
  if (error) throw new Error("Kunde inte kontrollera inloggningen.");
  if (!data?.user) redirect("/logga-in");
  return {
    reviewStatus: "APPROVED",
    invitations: { some: {
      authUserId: data.user.id, recipientEmail: data.user.email.toLowerCase(), acceptedAt: { not: null }, revokedAt: null,
    } },
  } satisfies Prisma.OnboardingCandidateWhereInput;
}
