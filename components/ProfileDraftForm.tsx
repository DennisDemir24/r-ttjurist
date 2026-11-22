"use client";

import { useState, type FormEvent } from "react";
import { saveProfileDraft, submitProfileDraft } from "@/lib/profile-draft-actions";

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
  return <form className="grid gap-4" onSubmit={submit} onChange={() => setDirty(true)}>
    <fieldset disabled={busy} className="grid gap-4">
    <label>Presentation (högst 4 000 tecken)<textarea name="bio" className="textarea block w-full" rows={5} defaultValue={draft.draftBio} maxLength={4000} /></label>
    <label>Rättsområden (ett per rad, högst 20 rader à 120 tecken)<textarea name="specialties" className="textarea block w-full" rows={3} defaultValue={draft.draftSpecialties.join("\n")} /></label>
    <label>Tjänster (en per rad, högst 20 rader à 300 tecken)<textarea name="services" className="textarea block w-full" rows={3} defaultValue={draft.draftServices.join("\n")} /></label>
    <button className="btn btn-primary justify-self-start" disabled={busy}>Spara utkast</button>
    {!pendingReview && version !== draft.publishedVersion && <button type="button" className="btn justify-self-start" disabled={dirty || !version} onClick={requestReview}>Skicka för granskning</button>}
    </fieldset>
    <p role="status">{message}</p>
  </form>;
}
