BEGIN;
SET LOCAL search_path TO "directory";

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "OnboardingCandidate" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firmName" TEXT NOT NULL,
    "claimedTitle" TEXT NOT NULL,
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OnboardingCandidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderInvitation" (
    "id" UUID NOT NULL,
    "candidateId" UUID NOT NULL,
    "recipientEmail" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "ProviderInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingCandidate_email_key" ON "OnboardingCandidate"("email");

-- CreateIndex
CREATE INDEX "ProviderInvitation_candidateId_sentAt_idx" ON "ProviderInvitation"("candidateId", "sentAt");

-- AddForeignKey
ALTER TABLE "ProviderInvitation" ADD CONSTRAINT "ProviderInvitation_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "OnboardingCandidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

COMMIT;
