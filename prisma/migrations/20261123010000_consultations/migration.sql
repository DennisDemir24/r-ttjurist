BEGIN;
SET LOCAL search_path TO directory;
-- CreateTable
CREATE TABLE "ConsultationSlot" (
    "id" UUID NOT NULL,
    "profileSlug" TEXT NOT NULL,
    "startsAt" TIMESTAMPTZ(3) NOT NULL,
    "endsAt" TIMESTAMPTZ(3) NOT NULL,
    "timeZone" TEXT NOT NULL DEFAULT 'Europe/Stockholm',
    "bookingKey" UUID,
    "bookedAt" TIMESTAMP(3),
    "visitorName" TEXT,
    "visitorEmail" TEXT,
    "visitorPhone" TEXT,
    "message" TEXT,

    CONSTRAINT "ConsultationSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingEmail" (
    "id" UUID NOT NULL,
    "slotId" UUID NOT NULL,
    "recipient" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "nextAttempt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "BookingEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationSlot_bookingKey_key" ON "ConsultationSlot"("bookingKey");

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationSlot_profileSlug_startsAt_key" ON "ConsultationSlot"("profileSlug", "startsAt");

-- CreateIndex
CREATE INDEX "BookingEmail_sentAt_nextAttempt_idx" ON "BookingEmail"("sentAt", "nextAttempt");

-- AddForeignKey
ALTER TABLE "ConsultationSlot" ADD CONSTRAINT "ConsultationSlot_profileSlug_fkey" FOREIGN KEY ("profileSlug") REFERENCES "ProviderProfile"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingEmail" ADD CONSTRAINT "BookingEmail_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "ConsultationSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

COMMIT;
