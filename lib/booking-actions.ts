"use server";

import { after } from "next/server";
import { getDb } from "./db";
import { appointmentLabel } from "./appointment-time";
import { deliverBookingEmails } from "./booking-email";

const uuid = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;
const bookable = { published: true, isAvailable: true, owner: { is: { reviewStatus: "APPROVED" as const } } };

export async function availableSlots(profileSlug: string) {
  const slots = await getDb().consultationSlot.findMany({
    where: { profileSlug, profile: bookable, bookedAt: null, startsAt: { gt: new Date() } },
    select: { id: true, startsAt: true, endsAt: true, timeZone: true }, orderBy: { startsAt: "asc" },
  });
  return slots.map(slot => ({ id: slot.id, label: appointmentLabel(slot.startsAt, slot.endsAt, slot.timeZone) }));
}

export async function bookSlot(profileSlug: string, slotId: string, key: string, form: FormData) {
  const field = (name: string) => String(form.get(name) ?? "").trim();
  const name = field("name"), email = field("email"), phone = field("phone"), message = field("message");
  if (!uuid.test(slotId) || !uuid.test(key) || !name || name.length > 150 || email.length > 254 ||
      !/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(email) || phone.length > 40 || message.length > 2000) {
    return { status: "invalid" } as const;
  }

  const result = await getDb().$transaction(async tx => {
    const changed = await tx.consultationSlot.updateMany({
      where: { id: slotId, profileSlug, profile: bookable, startsAt: { gt: new Date() }, bookedAt: null },
      data: { bookingKey: key, bookedAt: new Date(), visitorName: name, visitorEmail: email, visitorPhone: phone, message },
    });
    const slot = await tx.consultationSlot.findFirst({
      where: { id: slotId, profileSlug, bookingKey: key },
      select: { startsAt: true, endsAt: true, timeZone: true, profile: { select: { name: true, owner: { select: { email: true } } } } },
    });
    if (!slot) return { status: "unavailable" } as const;
    const label = appointmentLabel(slot.startsAt, slot.endsAt, slot.timeZone);
    if (changed.count) {
      if (!slot.profile.owner) throw new Error("Bokningen saknar mottagare.");
      await tx.bookingEmail.createMany({ data: [
        { slotId, recipient: email, subject: "Bokning bekräftad", body: `Din konsultation med ${slot.profile.name} är bokad.\n${label} (svensk tid).` },
        { slotId, recipient: slot.profile.owner.email, subject: "Ny bokad konsultation", body: `En konsultation har bokats ${label} (svensk tid). Logga in och öppna Mina bokningar för kontaktuppgifter.` },
      ] });
    }
    return { status: "confirmed", label } as const;
  });
  if (result.status === "confirmed") after(() => deliverBookingEmails(slotId).then(() => {}));
  return result;
}
