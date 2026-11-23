import { forbidden } from "next/navigation";
import { getDb } from "@/lib/db";
import { providerAccess } from "@/lib/provider";
import { withdrawSlot } from "@/lib/slot-actions";
import { appointmentLabel } from "@/lib/appointment-time";
import SlotForm from "@/components/SlotForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const now = new Date();
  const profile = await getDb().providerProfile.findFirst({
    where: { owner: { is: await providerAccess() } },
    select: { published: true, slots: {
      where: { endsAt: { gt: now } }, orderBy: { startsAt: "asc" },
      select: { id: true, startsAt: true, endsAt: true, timeZone: true, bookedAt: true,
        visitorName: true, visitorEmail: true, visitorPhone: true, message: true },
    } },
  });
  if (!profile) forbidden();
  const booked = profile.slots.filter(slot => slot.bookedAt);
  const available = profile.slots.filter(slot => !slot.bookedAt && slot.startsAt > now);
  return <section className="mx-auto max-w-5xl px-4 py-8 text-slate-900 sm:px-6 lg:py-12">
    <Link className="text-sm font-medium text-[#1e3a5f] hover:underline" href="/min-profil">Tillbaka till min profil</Link>
    <h1 className="my-6 text-3xl font-bold tracking-tight">Mina bokningar</h1>
    <div className="grid items-start gap-6 md:grid-cols-[1.2fr_1fr]">
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold text-[#1e3a5f]">Kommande konsultationer</h2>
      {!booked.length && <p className="text-sm text-slate-600">Du har inga kommande bokningar.</p>}
      <ul className="divide-y divide-slate-200">{booked.map(slot => <li key={slot.id} className="space-y-1 break-words py-4 text-sm text-slate-700">
        <strong>{appointmentLabel(slot.startsAt, slot.endsAt, slot.timeZone)}</strong>
        <p>{slot.visitorName}</p><p>{slot.visitorEmail}</p><p>{slot.visitorPhone}</p>
        {slot.message && <p className="whitespace-pre-wrap break-words">{slot.message}</p>}
      </li>)}</ul>
    </section>
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold text-[#1e3a5f]">Lediga tider</h2>
      {profile.published && <SlotForm />}
      <ul className="divide-y divide-slate-200">{available.map(slot => <li key={slot.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm text-slate-700">
        {appointmentLabel(slot.startsAt, slot.endsAt, slot.timeZone)}
        <form action={withdrawSlot.bind(null, slot.id)}><button className="btn btn-sm">Ta bort tid</button></form>
      </li>)}</ul>
    </section>
    </div>
  </section>;
}
