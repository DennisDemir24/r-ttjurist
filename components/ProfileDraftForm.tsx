"use client";

import { useState, type FormEvent } from "react";
import { saveProfileDraft, submitProfileDraft } from "@/lib/profile-draft-actions";
import { bookingButton, labelClass } from "./form-styles";

const textareaClass = "textarea w-full resize-y rounded-lg border-slate-500 bg-slate-100 px-4 py-3 text-base text-slate-900 focus:outline-2 focus:outline-offset-2 focus:outline-[#1e3a5f]";
const hintClass = "mt-1 text-sm text-slate-600";

type Draft = { id: string; draftVersion: number; draftBio: string; draftSpecialties: string[]; draftServices: string[]; publishedVersion: number | null };

export default function ProfileDraftForm({ draft, pendingReview }: { draft: Draft; pendingReview: boolean }) {
  const [dirty, setDirty] = useState(false);
  const [version, setVersion] = useState(draft.draftVersion);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      const result = await saveProfileDraft(draft.id, version, new FormData(event.currentTarget));
      if (result.version > version) setDirty(false);
      setVersion(result.version);
      setMessage(result.message);
    } catch {
      setMessage("Utkastet kunde inte sparas. Kontrollera inloggningen och försök igen.");
    } finally { setBusy(false); }
  }
  async function requestReview() {
    setBusy(true);
    try { setMessage(await submitProfileDraft(draft.id, version)); }
    catch { setMessage("Kunde inte skicka utkastet. Försök igen."); }
    finally { setBusy(false); }
  }
  return <form className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-start-1 lg:row-start-1" onSubmit={submit} onChange={() => setDirty(true)}>
    <fieldset disabled={busy} className="grid min-w-0 gap-6">
      <div>
        <label htmlFor="draft-bio" className={labelClass}>Presentation</label>
        <p id="bio-hint" className={hintClass}>Högst 4 000 tecken.</p>
        <textarea id="draft-bio" name="bio" aria-describedby="bio-hint" className={`${textareaClass} mt-2`} rows={5} defaultValue={draft.draftBio} maxLength={4000} />
      </div>
      <div>
        <label htmlFor="draft-specialties" className={labelClass}>Rättsområden</label>
        <p id="specialties-hint" className={hintClass}>Ett per rad. Högst 20 rader med 120 tecken per rad.</p>
        <textarea id="draft-specialties" name="specialties" aria-describedby="specialties-hint" className={`${textareaClass} mt-2`} rows={3} defaultValue={draft.draftSpecialties.join("\n")} />
      </div>
      <div>
        <label htmlFor="draft-services" className={labelClass}>Tjänster</label>
        <p id="services-hint" className={hintClass}>En per rad. Högst 20 rader med 300 tecken per rad.</p>
        <textarea id="draft-services" name="services" aria-describedby="services-hint" className={`${textareaClass} mt-2`} rows={3} defaultValue={draft.draftServices.join("\n")} />
      </div>
      <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:flex-wrap">
        <button className={bookingButton} disabled={busy}>Spara utkast</button>
        {!pendingReview && version !== draft.publishedVersion && <button type="button" className="btn min-h-11 rounded-lg border-slate-300 bg-white text-[#1e3a5f]" disabled={dirty || !version} onClick={requestReview}>Skicka för granskning</button>}
      </div>
    </fieldset>
    <p role="status" className="mt-4 rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-800 empty:hidden">{message}</p>
  </form>;
}
