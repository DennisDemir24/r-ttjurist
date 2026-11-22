import "server-only";
import { cache } from "react";
import { getDb } from "../db";
import type { Prisma } from "../generated/prisma/client";
import type { LawyerProfile } from "../types";

const include = {
  firm: true,
  services: { orderBy: { position: "asc" } },
  specialties: { include: { specialty: true }, orderBy: { position: "asc" } },
} satisfies Prisma.ProviderProfileInclude;

function toProfile(row: Prisma.ProviderProfileGetPayload<{ include: typeof include }>): LawyerProfile {
  return {
    slug: row.slug, name: row.name, title: row.title, bio: row.bio,
    firmName: row.firm.name, specialties: row.specialties.map(link => link.specialty.name),
    services: row.services.map(({ id, name, description }) => ({ id, name, description })),
    rating: row.rating, reviewCount: row.reviewCount, isPremium: row.isPremium,
    isAvailable: row.isAvailable, email: row.email ?? undefined, phone: row.phone ?? undefined,
  };
}

export const getProfileBySlug = cache(async (slug: string) => {
  const row = await getDb().providerProfile.findUnique({ where: { slug, published: true }, include });
  return row ? toProfile(row) : undefined;
});

export async function getAllProfiles() {
  const rows = await getDb().providerProfile.findMany({ where: { published: true }, include });
  return rows.map(toProfile);
}
