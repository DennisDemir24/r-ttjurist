BEGIN;
CREATE SCHEMA IF NOT EXISTS "directory";
SET LOCAL search_path TO "directory";

CREATE TABLE "Firm" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE
);
CREATE TABLE "ProviderProfile" (
  "slug" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "bio" TEXT NOT NULL,
  "location" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "isPremium" BOOLEAN NOT NULL DEFAULT false,
  "isAvailable" BOOLEAN NOT NULL DEFAULT true,
  "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "reviewCount" INTEGER NOT NULL DEFAULT 0,
  "firmId" INTEGER NOT NULL REFERENCES "Firm"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE "Specialty" (
  "slug" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL
);
CREATE TABLE "ProfileSpecialty" (
  "profileSlug" TEXT NOT NULL REFERENCES "ProviderProfile"("slug") ON DELETE CASCADE ON UPDATE CASCADE,
  "specialtySlug" TEXT NOT NULL REFERENCES "Specialty"("slug") ON DELETE RESTRICT ON UPDATE CASCADE,
  "position" INTEGER NOT NULL,
  PRIMARY KEY ("profileSlug", "specialtySlug")
);
CREATE INDEX "ProfileSpecialty_specialtySlug_idx" ON "ProfileSpecialty" ("specialtySlug");
CREATE TABLE "Service" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "position" INTEGER NOT NULL,
  "profileSlug" TEXT NOT NULL REFERENCES "ProviderProfile"("slug") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "Service_profileSlug_idx" ON "Service" ("profileSlug");
COMMIT;
