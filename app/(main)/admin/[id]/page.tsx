import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { getDb } from "@/lib/db";
import CandidateReview from "@/components/CandidateReview";
import { invitationLabel, reviewLabels } from "@/lib/onboarding";

export const dynamic = "force-dynamic";
const date = new Intl.DateTimeFormat("sv-SE", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Stockholm" });

export default async function CandidatePage({ params }: PageProps<"/admin/[id]">) {
  await requireAdmin();
  const { id } = await params;
  if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id)) notFound();
  const candidate = await getDb().onboardingCandidate.findUnique({
    where: { id }, include: { invitations: { orderBy: { sentAt: "desc" } } },
  });
  if (!candidate) notFound();
  return (
    <div className="min-h-[65vh] bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
        <Link href="/admin" className="text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-900">Alla kandidater</Link>
        <header className="mb-6 mt-4 rounded-xl border-l-4 border-amber-400 bg-[#1e3a5f] px-5 py-6 text-white sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="min-w-0 break-words font-serif text-4xl leading-tight tracking-tight sm:text-5xl">{candidate.name}</h1>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${candidate.reviewStatus === "APPROVED" ? "bg-emerald-100 text-emerald-900" : candidate.reviewStatus === "REJECTED" ? "bg-rose-100 text-rose-900" : "bg-amber-100 text-amber-900"}`}>{reviewLabels[candidate.reviewStatus]}</span>
          </div>
          <p className="mt-3 break-words text-lg text-slate-100">{candidate.claimedTitle} · {candidate.firmName}</p>
          <p className="mt-1 break-all text-sm text-slate-200">{candidate.email}</p>
        </header>
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <section className="min-w-0 space-y-5 rounded-xl border border-slate-200 bg-white p-5 sm:p-7">
            <h2 className="text-2xl font-semibold tracking-tight">Granskning</h2>
            {candidate.reviewedAt && <div className="border-l-2 border-slate-300 pl-4">
              <p className="text-sm font-medium text-slate-600">Granskad <time dateTime={candidate.reviewedAt.toISOString()}>{date.format(candidate.reviewedAt)}</time></p>
              <p className="mt-1 whitespace-pre-wrap break-words">{candidate.reviewNote}</p>
            </div>}
            <CandidateReview id={id} pending={candidate.reviewStatus === "PENDING"}
              canInvite={candidate.reviewStatus === "APPROVED" && !candidate.invitations.some(invite => invite.acceptedAt)}
              previouslyInvited={candidate.invitations.length > 0} />
            {candidate.publishedSlug && <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
              <span className="text-sm text-slate-600">Publicerad version {candidate.publishedVersion}</span>
              <Link className="link font-semibold text-[#1e3a5f]" href={`/profile/${candidate.publishedSlug}`}>Visa publicerad profil</Link>
            </div>}
          </section>
          <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 sm:p-7">
            <h2 className="text-xl font-semibold">Inbjudningar</h2>
            {candidate.invitations.length === 0 ? <p className="mt-4 text-sm text-slate-600">Ingen inbjudan har skickats.</p> : (
              <ol className="mt-4 divide-y divide-slate-200">{candidate.invitations.map(invite =>
                <li key={invite.id} className="space-y-2 py-4 first:pt-0 last:pb-0">
                  <p className="font-semibold text-[#1e3a5f]">{invitationLabel(invite)}</p>
                  <p className="break-all text-sm">{invite.recipientEmail}</p>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                    <dt className="text-slate-600">Skickad</dt><dd>{date.format(invite.sentAt)}</dd>
                    <dt className="text-slate-600">Giltig till</dt><dd>{date.format(invite.expiresAt)}</dd>
                    {invite.acceptedAt && <><dt className="text-slate-600">Accepterad</dt><dd>{date.format(invite.acceptedAt)}</dd></>}
                  </dl>
                </li>
              )}</ol>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
