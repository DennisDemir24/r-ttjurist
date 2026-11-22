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
  return <section className="mx-auto max-w-2xl space-y-5 px-5 py-12">
    <h1 className="text-3xl font-bold">Mitt profilutkast</h1>
    <p>{draft.name} · {draft.claimedTitle} · {draft.firmName}</p>
    <p>Utkastet är privat tills en administratör godkänner publicering.</p>
    {draft.publishedSlug && <p>Publicerad version {draft.publishedVersion} · <Link className="link" href={`/profile/${draft.publishedSlug}`}>Visa publicerad profil</Link></p>}
    {draft.submission && <p>Väntar på granskning · Version {draft.submission.version}</p>}
    <ProfileDraftForm draft={draft} pendingReview={Boolean(draft.submission)} />
  </section>;
}
