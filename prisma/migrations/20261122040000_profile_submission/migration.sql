CREATE TABLE directory."ProfileSubmission" (
  "candidateId" UUID PRIMARY KEY REFERENCES directory."OnboardingCandidate"("id") ON UPDATE CASCADE,
  "version" INTEGER NOT NULL,
  "name" TEXT NOT NULL,
  "firmName" TEXT NOT NULL,
  "claimedTitle" TEXT NOT NULL,
  "bio" TEXT NOT NULL,
  "specialties" TEXT[] NOT NULL,
  "services" TEXT[] NOT NULL,
  "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
