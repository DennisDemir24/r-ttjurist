import CandidateForm from "@/components/CandidateForm";

export default function ApplyPage() {
  return (
    <section className="mx-auto max-w-lg space-y-5 px-5 py-12">
      <h1 className="text-3xl font-bold">Ansök om en juristprofil</h1>
      <p>Vi granskar din yrkestitel och koppling till byrån. Om ansökan godkänns får du en personlig inbjudan till din e-postadress.</p>
      <CandidateForm />
    </section>
  );
}
