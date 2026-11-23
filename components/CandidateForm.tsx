"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { inputClass, labelClass } from "./form-styles";
import { addReferral, submitApplication } from "@/lib/candidate-actions";

export default function CandidateForm({ referral = false }: { referral?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [existingId, setExistingId] = useState("");
  const [received, setReceived] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setExistingId("");
    try {
      const action = referral ? addReferral : submitApplication;
      const result = await action(new FormData(event.currentTarget));
      setError(result.error ?? "");
      setExistingId(result.existingId ?? "");
      setReceived(Boolean(result.received));
    } finally {
      setBusy(false);
    }
  }

  if (received) return <p role="status">Tack! Vi går igenom ansökningarna och kontaktar dig via din e-postadress om vi behöver fler uppgifter eller vill bjuda in dig.</p>;
  return (
    <form className={referral ? "grid gap-5 sm:grid-cols-2" : "grid gap-4"} aria-busy={busy} onSubmit={submit}>
      {[
        { name: "name", label: "För- och efternamn", complete: "name", max: 120 },
        { name: "email", label: "E-postadress på arbetet", complete: "email", max: 254 },
        { name: "firmName", label: "Byrå eller företag", complete: "organization", max: 160 },
        { name: "claimedTitle", label: "Yrkestitel", complete: "organization-title", max: 100 },
      ].map(field => <label key={field.name} className={referral ? labelClass : undefined}>{field.label}
        <input className={referral ? inputClass : "input block w-full"} name={field.name} type={field.name === "email" ? "email" : "text"}
          autoComplete={field.complete} maxLength={field.max} required />
      </label>)}
      <button className={referral ? "btn h-12 border-0 bg-[#1e3a5f] px-6 text-white hover:bg-slate-800 sm:col-span-2 sm:justify-self-start" : "btn btn-primary"} disabled={busy}>
        {referral ? (busy ? "Sparar…" : "Spara kandidat") : "Skicka ansökan"}
      </button>
      {error && <p role="alert" className={referral ? "rounded-lg border-l-4 border-rose-600 bg-rose-50 px-4 py-3 text-sm text-rose-900 sm:col-span-2" : undefined}>{error} {existingId && <Link className="link" href={`/admin/${existingId}`}>Öppna kandidaten</Link>}</p>}
    </form>
  );
}
