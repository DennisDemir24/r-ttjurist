BEGIN;
ALTER TABLE directory."OnboardingCandidate"
  ADD COLUMN "reviewNote" TEXT,
  ADD COLUMN "reviewedBy" TEXT,
  ADD COLUMN "reviewedAt" TIMESTAMP(3);
ALTER TABLE directory."ProviderInvitation" ADD COLUMN "authUserId" TEXT;
COMMIT;
