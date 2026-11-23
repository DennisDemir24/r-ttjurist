"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb } from "./db";
import { requireAdmin } from "./require-admin";
import { Prisma } from "./generated/prisma/client";

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function saveCandidate(form: FormData, admin: boolean) {
  const email = text(form, "email").toLowerCase();
  const name = text(form, "name");
  const firmName = text(form, "firmName");
  const claimedTitle = text(form, "claimedTitle");
  if (!name || name.length > 120 || !firmName || firmName.length > 160 ||
      !claimedTitle || claimedTitle.length > 100 || email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Fyll i alla fält och kontrollera e-postadressen." };
  }
  let id: string | undefined;
  try {
    const candidate = await getDb().onboardingCandidate.create({
      data: { email, name, firmName, claimedTitle }, select: { id: true },
    });
    id = candidate.id;
  } catch (error) {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")) {
      return { error: "Uppgifterna kunde inte sparas. Försök igen." };
    }
    if (admin) {
      const existing = await getDb().onboardingCandidate.findUniqueOrThrow({ where: { email }, select: { id: true } });
      return { error: "En kandidat med denna e-postadress finns redan.", existingId: existing.id };
    }
  }
  revalidatePath("/admin");
  if (admin && id) redirect(`/admin/${id}`);
  return { received: true };
}

export async function submitApplication(form: FormData) {
  return saveCandidate(form, false);
}

export async function addReferral(form: FormData) {
  await requireAdmin();
  return saveCandidate(form, true);
}
