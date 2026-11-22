import { loadEnvConfig } from "@next/env";
import { profiles } from "../lib/data/profiles";
import { getDb } from "../lib/db";

loadEnvConfig(process.cwd());

async function seed() {
  if (!process.env.NEON_BRANCH || ["main", "production"].includes(process.env.NEON_BRANCH)) {
    throw new Error("Select a development Neon branch before seeding demo profiles.");
  }
  for (const profile of profiles) {
    await getDb().$transaction(async tx => {
      const firm = await tx.firm.upsert({
        where: { name: profile.firmName }, update: {}, create: { name: profile.firmName },
      });
      const { slug, name, title, bio, rating, reviewCount, isPremium } = profile;
      const fields = { name, title, bio, rating, reviewCount, isPremium, firmId: firm.id };
      await tx.providerProfile.upsert({
        where: { slug }, update: fields, create: { ...fields, slug, published: true },
      });
      for (const [position, service] of profile.services.entries()) {
        await tx.service.upsert({ where: { id: service.id }, update: { ...service, position },
          create: { ...service, position, profileSlug: slug } });
      }
      for (const [position, label] of profile.specialties.entries()) {
        const specialtySlug = label.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");
        await tx.specialty.upsert({ where: { slug: specialtySlug }, update: {},
          create: { slug: specialtySlug, name: label } });
        await tx.profileSpecialty.upsert({
          where: { profileSlug_specialtySlug: { profileSlug: slug, specialtySlug } },
          update: { position }, create: { profileSlug: slug, specialtySlug, position },
        });
      }
    });
  }
}

seed().catch(error => { console.error(error); process.exitCode = 1; })
  .finally(async () => { if (process.env.DATABASE_URL) await getDb().$disconnect(); });
