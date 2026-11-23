"use client";

import { useActionState } from "react";
import { reviewCandidate, sendInvitation } from "@/lib/review-actions";

export default function CandidateReview({ id, pending, canInvite, previouslyInvited }: {
  id: string; pending: boolean; canInvite: boolean; previouslyInvited: boolean;
}) {
  const [reviewMessage, review, reviewing] = useActionState(
    (_previous: string, form: FormData) => reviewCandidate(id, form), "");
  const [inviteMessage, invite, inviting] = useActionState(() => sendInvitation(id), "");
  return (
    <>
      {pending && <form action={review} className="grid gap-5">
        <fieldset className="grid gap-1">
          <legend className="mb-2 text-sm font-semibold text-slate-600">Verifiering</legend>
          {[
            ["identity", "Personens identitet kontrollerad"],
            ["title", "Yrkestiteln styrkt"],
            ["firm", "Anknytningen till byrån bekräftad"],
          ].map(([name, label]) => <label key={name} className="flex cursor-pointer items-center gap-3 rounded-lg bg-slate-50 px-3 py-3 hover:bg-slate-100">
            <input className="checkbox checkbox-sm checkbox-neutral shrink-0" type="checkbox" name={name} />
            {label}
          </label>)}
        </fieldset>
        <label className="grid gap-2 text-sm font-semibold">Underlag för beslutet<textarea className="textarea block w-full font-normal" rows={4} name="note" required maxLength={1500}
          placeholder="Ange källa och vad du har kontrollerat." /></label>
        <div className="flex gap-3">
          <button className="btn border-0 bg-[#1e3a5f] px-6 text-white hover:bg-slate-800" name="decision" value="APPROVED" disabled={reviewing}>Godkänn</button>
          <button className="btn btn-outline text-rose-800" name="decision" value="REJECTED" disabled={reviewing}>Avslå</button>
        </div>
      </form>}
      {reviewMessage && <p role="status">{reviewMessage}</p>}
      {canInvite && <form action={invite} className="border-t border-slate-200 pt-5">
        {!previouslyInvited && <p className="mb-3">Skapa först kandidatens konto i Neon Auth med den granskade e-postadressen. Skicka sedan aktiveringskoden här.</p>}
        <button className="btn border-0 bg-[#1e3a5f] px-5 text-white hover:bg-slate-800" disabled={inviting}>{previouslyInvited ? "Skicka ny aktiveringskod" : "Skicka inbjudan"}</button>
      </form>}
      {inviteMessage && <p role="status">{inviteMessage}</p>}
    </>
  );
}
