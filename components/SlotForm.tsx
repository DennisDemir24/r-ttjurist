"use client";

import { useActionState } from "react";
import { addSlot } from "@/lib/slot-actions";
import { bookingButton, inputClass, labelClass } from "./form-styles";

export default function SlotForm() {
  const [feedback, action, pending] = useActionState(addSlot, "");
  return <form action={action} className="grid gap-4">
    <label className={labelClass}>Starttid (svensk tid)
      <input name="start" type="datetime-local" step={1800} required className={inputClass} />
    </label>
    <button className={bookingButton} disabled={pending}>{pending ? "Sparar…" : "Lägg till 30 minuters konsultation"}</button>
    {feedback && <p role="status" className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-700">{feedback}</p>}
  </form>;
}
