BEGIN;
ALTER TABLE directory."OnboardingCandidate"
  ADD COLUMN "publishedSlug" TEXT UNIQUE REFERENCES directory."ProviderProfile"(slug) ON UPDATE CASCADE ON DELETE RESTRICT,
  ADD COLUMN "publishedVersion" INTEGER;
COMMIT;
