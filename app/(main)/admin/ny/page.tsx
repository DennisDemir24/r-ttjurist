import CandidateForm from "@/components/CandidateForm";
import Link from "next/link";
import { requireAdmin } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export default async function ReferralPage() {
  await requireAdmin();
  return (
    <div className="bg-slate-50 px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/admin" className="text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4">Alla kandidater</Link>
        <section className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <header className="border-l-4 border-amber-400 bg-[#1e3a5f] px-6 py-7 text-white sm:px-9">
            <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Lägg till kandidat</h1>
            <p className="mt-3 text-sm text-slate-100">Kandidaten sparas i registret för granskning. Du kan skicka en inbjudan efter godkännandet.</p>
          </header>
          <div className="p-6 sm:p-9"><CandidateForm referral /></div>
        </section>
      </div>
    </div>
  );
}
