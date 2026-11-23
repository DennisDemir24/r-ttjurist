import "server-only";
import { getDb } from "./db";

export async function deliverBookingEmails(slotId?: string) {
  const db = getDb();
  const due = { slotId, sentAt: null, nextAttempt: { lte: new Date() } };
  const emails = await db.bookingEmail.findMany({ where: due, orderBy: { nextAttempt: "asc" }, take: 12 });
  let sent = 0;
  for (const email of emails) {
    // Lease the row so concurrent workers do not send it simultaneously.
    const claim = await db.bookingEmail.updateMany({
      where: { ...due, id: email.id },
      data: { nextAttempt: new Date(Date.now() + 5 * 60_000) },
    });
    if (!claim.count) continue;
    if (!process.env.RESEND_API_KEY || !process.env.BOOKING_EMAIL_FROM) continue;
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST", signal: AbortSignal.timeout(5000),
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json",
          "Idempotency-Key": `booking/${email.id}`,
        },
        body: JSON.stringify({
          from: process.env.BOOKING_EMAIL_FROM, to: [email.recipient], subject: email.subject, text: email.body,
        }),
      });
      if (!response.ok) continue;
      await db.bookingEmail.update({ where: { id: email.id }, data: { sentAt: new Date() } });
      sent++;
    } catch {
      // The committed email remains eligible after the lease expires.
      continue;
    }
  }
  return { considered: emails.length, sent };
}
