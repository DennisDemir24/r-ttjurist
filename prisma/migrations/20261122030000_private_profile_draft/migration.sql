ALTER TABLE directory."OnboardingCandidate"
  ADD COLUMN "draftBio" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "draftSpecialties" TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN "draftServices" TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN "draftVersion" INTEGER NOT NULL DEFAULT 0;
