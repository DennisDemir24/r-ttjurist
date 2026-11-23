"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { inputClass } from "@/components/form-styles";

export default function SignInPage() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const fields = new FormData(event.currentTarget);
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(fields.get("email")).trim(), password: fields.get("password") }),
      });
      if (response.ok) window.location.assign("/konto");
      else setMessage("Inloggningen misslyckades. Kontrollera e-postadress och lösenord.");
    } catch {
      setMessage("Kunde inte ansluta. Försök igen.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-slate-50 px-4 py-8 sm:py-16">
      <section aria-labelledby="signin-title" className="mx-auto max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <header className="border-l-4 border-amber-400 bg-[#1e3a5f] px-6 py-7 text-white sm:px-9 sm:py-9">
          <h1 id="signin-title" className="font-serif text-4xl tracking-tight sm:text-5xl">Logga in</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-100">Använd e-postadressen som ditt konto är kopplat till.</p>
        </header>
        <form onSubmit={submit} aria-busy={busy} className="grid gap-5 px-6 py-7 sm:px-10 sm:py-8">
          <label className="grid gap-2 text-sm font-semibold text-slate-800">E-postadress
            <input className={inputClass} type="email" name="email" autoComplete="username" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-800">Lösenord
            <input className={inputClass} type="password" name="password" autoComplete="current-password" required />
          </label>
          {message && <p role="alert" className="rounded-lg border-l-4 border-rose-600 bg-rose-50 px-4 py-3 text-sm text-rose-900">{message}</p>}
          <button className="btn h-12 w-full border-0 bg-[#1e3a5f] text-white hover:bg-slate-800" disabled={busy}>
            {busy ? "Loggar in…" : "Logga in"}
          </button>
        </form>
        <div className="border-t border-slate-200 px-6 py-5 text-sm leading-relaxed text-slate-600 sm:px-10">
          Har du fått en aktiveringskod?{" "}
          <Link href="/aktivera" className="link font-semibold text-[#1e3a5f] underline-offset-4">Aktivera ditt konto</Link>
        </div>
      </section>
    </div>
  );
}
