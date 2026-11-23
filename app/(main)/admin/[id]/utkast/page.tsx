import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { publishProfile } from "@/lib/publish-profile";

export const dynamic = "force-dynamic";

export default async function SubmissionPage({ params }: PageProps<"/admin/[id]/utkast">) {
  await requireAdmin();
  const { id } = await params;
  if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id)) notFound();
  const s = await getDb().profileSubmission.findUnique({ where: { candidateId: id } });
  if (!s) notFound();
  return <section className="mx-auto max-w-2xl space-y-4 px-5 py-12">
    <Link href="/admin" className="link">Till granskningen</Link>
    <h1 className="text-3xl font-bold">{s.name}</h1>
    <p>{s.claimedTitle} · {s.firmName}</p>
    <p>Inskickad version {s.version} · {s.submittedAt.toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" })}</p>
    <h2 className="text-xl font-semibold">Presentation</h2><p className="whitespace-pre-wrap">{s.bio || "Ej angiven"}</p>
    <h2 className="text-xl font-semibold">Rättsområden</h2><ul>{s.specialties.map((v,i) => <li key={i}>{v}</li>)}</ul>
    <h2 className="text-xl font-semibold">Tjänster</h2><ul>{s.services.map((v,i) => <li key={i}>{v}</li>)}</ul>
    <form action={publishProfile.bind(null, id, s.version)}><button className="btn btn-primary">Publicera</button></form>
  </section>;
}
