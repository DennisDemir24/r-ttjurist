import { forbidden } from "next/navigation";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { providerAccess } from "@/lib/provider";
import ProfileDraftForm from "@/components/ProfileDraftForm";

export const dynamic = "force-dynamic";

export default async function ProviderPage() {
  const draft = await getDb().onboardingCandidate.findFirst({
    where: await providerAccess(),
    select: { id: true, name: true, firmName: true, claimedTitle: true,
      draftVersion: true, draftBio: true, draftSpecialties: true, draftServices: true, publishedSlug: true, publishedVersion: true,
      submission: { select: { version: true } } },
  });
  if (!draft) forbidden();
  return <section className="mx-auto max-w-5xl px-4 py-8 text-slate-900 sm:px-6 lg:py-12">
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Mitt profilutkast</h1>
      {draft.publishedSlug && <Link className="btn min-h-11 rounded-lg border-slate-300 bg-white text-[#1e3a5f] hover:bg-slate-50" href="/mina-bokningar">Mina bokningar</Link>}
    </header>
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-start-2 lg:row-start-1">
        <h2 className="break-words text-lg font-bold text-[#1e3a5f]">{draft.name}</h2>
        <p className="mt-1 break-words text-sm text-slate-600">{draft.claimedTitle} · {draft.firmName}</p>
        <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 text-sm">
          <p className="leading-relaxed text-slate-600">Utkastet är privat tills en administratör godkänner publicering.</p>
          {draft.submission && <p className="rounded-lg bg-amber-50 px-3 py-2 font-medium text-amber-900">Väntar på granskning · Version {draft.submission.version}</p>}
          {draft.publishedSlug && <div>
            <p className="font-semibold">Publicerad version {draft.publishedVersion}</p>
            <Link className="mt-1 inline-block font-medium text-[#1e3a5f] underline underline-offset-4" href={`/profile/${draft.publishedSlug}`}>Visa publicerad profil</Link>
          </div>}
        </div>
      </aside>
      <ProfileDraftForm draft={draft} pendingReview={Boolean(draft.submission)} />
    </div>
  </section>;
}
