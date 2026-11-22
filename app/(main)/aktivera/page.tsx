"use client";

import { useState, type FormEvent } from "react";
import { acceptInvitation } from "@/lib/review-actions";
import Link from "next/link";
import { inputClass, labelClass } from "@/components/form-styles";

async function post(path: string, data: Record<string, string>) {
  return fetch(`/api/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export default function ActivationPage() {
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState<"activate" | "sign-in" | "done">("activate");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const email = String(fields.get("email")).trim();
    const password = String(fields.get("password"));
    setBusy(true);
    setMessage("");
    try {
      if (stage === "activate") {
        const reset = await post("email-otp/reset-password", {
          email, password, otp: String(fields.get("otp")).trim(),
        });
        if (!reset.ok) {
          setMessage("Kunde inte ställa in lösenordet. Kontrollera e-postadress och kod.");
          return;
        }
        setStage("sign-in");
      }
      const login = await post("sign-in/email", { email, password });
      if (!login.ok) {
        setMessage("Lösenordet har sparats. Försök logga in igen.");
        return;
      }
      form.reset();
      setStage("done");
      if (await acceptInvitation()) window.location.assign("/min-profil");
    } catch {
      setMessage("Anslutningen misslyckades. Försök igen.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-slate-50 px-4 py-8 sm:py-16">
      <section className="mx-auto max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <header className="border-l-4 border-amber-400 bg-[#1e3a5f] px-6 py-7 text-white sm:px-9 sm:py-9">
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">{stage === "done" ? "Du är inloggad" : stage === "sign-in" ? "Logga in" : "Aktivera ditt konto"}</h1>
          {stage === "activate" && <p className="mt-3 text-sm leading-relaxed text-slate-100">Ange koden från din inbjudan och välj ett lösenord.</p>}
        </header>
        {stage === "done" ? <div className="grid gap-4 p-6 sm:px-10">
          {message && <p role="alert">{message}</p>}
          <Link href="/konto" className="btn h-12 border-0 bg-[#1e3a5f] text-white hover:bg-slate-800">Till mitt konto</Link>
        </div> : (
        <form onSubmit={submit} aria-busy={busy} className="grid gap-5 px-6 py-7 sm:px-10 sm:py-8">
          <label className={labelClass}>E-postadress<input className={inputClass} name="email" type="email" autoComplete="username" required /></label>
          {stage === "activate" && (
            <label className={labelClass}>Kod från e-postmeddelandet<input className={inputClass} name="otp" autoComplete="one-time-code" required /></label>
          )}
          <label className={labelClass}>{stage === "activate" ? "Nytt lösenord" : "Lösenord"}
            <input className={inputClass} name="password" type="password" minLength={8} maxLength={128} aria-describedby={stage === "activate" ? "password-help" : undefined}
              autoComplete={stage === "activate" ? "new-password" : "current-password"} required />
            {stage === "activate" && <span id="password-help" className="text-sm font-normal text-slate-600">Använd minst 8 tecken.</span>}
          </label>
          {message && <p role="alert" className="rounded-lg border-l-4 border-rose-600 bg-rose-50 px-4 py-3 text-sm text-rose-900">{message}</p>}
          <button className="btn h-12 border-0 bg-[#1e3a5f] text-white hover:bg-slate-800" disabled={busy}>
            {busy ? "Vänta…" : stage === "activate" ? "Aktivera och logga in" : "Logga in"}
          </button>
        </form>
        )}
        {stage !== "done" && <p className="border-t border-slate-200 px-6 py-5 text-sm text-slate-600 sm:px-10">
          Redan aktiverat ditt konto? <Link href="/logga-in" className="link font-semibold text-[#1e3a5f] underline-offset-4">Logga in</Link>
        </p>}
      </section>
    </div>
  );
}
