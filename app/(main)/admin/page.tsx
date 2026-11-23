import { requireAdmin } from "@/lib/require-admin";
import { getDb } from "@/lib/db";
import { invitationLabel, reviewLabels } from "@/lib/onboarding";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  await requireAdmin();
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const pending = params.view === "pending";
  const match = { contains: q, mode: "insensitive" as const };
  const submissions = await getDb().profileSubmission.findMany({
    orderBy: { submittedAt: "asc" }, select: { candidateId: true, name: true, version: true },
  });
  const candidates = await getDb().onboardingCandidate.findMany({
    where: {
      ...(q && { OR: [{ name: match }, { email: match }, { firmName: match }] }),
      ...(pending && { invitations: { some: { acceptedAt: null, revokedAt: null, expiresAt: { gt: new Date() } } } }),
    },
    include: { invitations: { orderBy: [{ sentAt: "desc" }, { id: "asc" }], take: 1 } },
    orderBy: [{ name: "asc" }, { id: "asc" }],
  });
  return (
    <div className="min-h-[65vh] bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
        <header className="mb-7 flex flex-wrap items-center justify-between gap-5 border-b border-slate-300 pb-6">
          <h1 className="font-serif text-4xl leading-tight tracking-tight text-[#1e3a5f] sm:text-5xl">Administration av jurister</h1>
          <Link className="btn border-0 bg-[#1e3a5f] px-5 text-white shadow-none hover:bg-slate-800" href="/admin/ny">
            <span aria-hidden="true" className="text-lg">+</span> Lägg till kandidat
          </Link>
        </header>
        <div className="grid items-start gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <section aria-labelledby="queue-title" className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-3 border-l-4 border-amber-400 bg-[#1e3a5f] px-4 py-5 text-white">
              <h2 id="queue-title" className="text-lg font-semibold">Profilutkast att granska</h2>
              <span className="rounded bg-white/15 px-2 py-0.5 text-sm font-semibold tabular-nums">{submissions.length}</span>
            </div>
            {submissions.length === 0 ? <p className="px-5 py-6 text-sm text-slate-600">Inga inskickade utkast.</p> : (
              <ul className="divide-y divide-slate-200">
                {submissions.map(s => <li key={s.candidateId}>
                  <Link className="group block px-5 py-4 hover:bg-slate-50 focus-visible:outline-offset-[-3px]" href={`/admin/${s.candidateId}/utkast`}>
                    <span className="block break-words font-semibold text-[#1e3a5f] group-hover:underline">{s.name}</span>
                    <span className="text-sm text-slate-600">Version {s.version}</span>
                  </Link>
                </li>)}
              </ul>
            )}
          </section>
          <section className="min-w-0 rounded-xl border border-slate-200 bg-white" aria-labelledby="register-title">
            <div className="p-5 sm:p-6">
              <h2 id="register-title" className="mb-5 text-2xl font-semibold tracking-tight">Kandidatregister</h2>
              <form className="grid items-end gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                <label className="grid gap-1.5 text-sm font-medium">Sök jurist
                  <input className="input w-full" name="q" defaultValue={q} placeholder="Namn, byrå eller e-post" />
                </label>
                <label className="grid gap-1.5 text-sm font-medium">Visa
                  <select className="select w-full" name="view" defaultValue={pending ? "pending" : "all"}>
                    <option value="all">Alla kandidater</option><option value="pending">Väntande inbjudningar</option>
                  </select>
                </label>
                <button className="btn btn-neutral">Visa resultat</button>
              </form>
            </div>
            {candidates.length === 0 ? <div className="border-t border-slate-200 px-5 py-8 text-slate-600 sm:px-6">
              <p>{q || pending ? "Inga kandidater matchar urvalet." : "Det finns inga registrerade kandidater ännu."}</p>
              {(q || pending) && <Link className="link mt-2 inline-block" href="/admin">Rensa filter</Link>}
            </div> : (
              <ul className="divide-y divide-slate-200 border-t border-slate-200">
                {candidates.map(candidate => <li key={candidate.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-6">
                  <div className="min-w-0">
                    <Link className="break-words font-semibold text-[#1e3a5f] underline decoration-slate-300 underline-offset-4 hover:decoration-current" href={`/admin/${candidate.id}`}>{candidate.name}</Link>
                    <div className="mt-1 break-words text-sm">{candidate.firmName}</div>
                    <div className="break-all text-sm text-slate-600">{candidate.email}</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end sm:justify-center">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${candidate.reviewStatus === "APPROVED" ? "bg-emerald-50 text-emerald-800" : candidate.reviewStatus === "REJECTED" ? "bg-rose-50 text-rose-800" : "bg-amber-50 text-amber-900"}`}>{reviewLabels[candidate.reviewStatus]}</span>
                    <span className="text-xs text-slate-600">{candidate.invitations[0] ? `Inbjudan: ${invitationLabel(candidate.invitations[0])}` : "Ingen inbjudan"}</span>
                  </div>
                </li>)}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
