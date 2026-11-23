"use client";

import { useEffect, useRef, useState } from "react";
import { availableSlots, bookSlot } from "@/lib/booking-actions";
import Link from "next/link";
import { bookingButton, inputClass, labelClass } from "../form-styles";

type Slot = Awaited<ReturnType<typeof availableSlots>>[number];

export default function BookingForm({ slug, name, firmName, onClose }: { slug: string; name: string; firmName: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const requestKey = useRef("");
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [pending, setPending] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  useEffect(() => {
    let active = true;
    availableSlots(slug).then(items => {
      if (active) setSlots(items);
    }).catch(() => { if (active) setLoadFailed(true); });
    return () => { active = false; };
  }, [slug, refresh]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || pending) return;
    const form = new FormData(event.currentTarget);
    requestKey.current ||= crypto.randomUUID();
    setPending(true);
    setFeedback("");
    try {
      const result = await bookSlot(slug, selected, requestKey.current, form);
      if (result.status === "confirmed") setConfirmed(result.label);
      else if (result.status === "unavailable") {
        setFeedback("Tiden är inte längre tillgänglig. Välj en annan tid.");
        setSelected("");
        setSlots(null);
        setRefresh(value => value + 1);
      } else setFeedback("Kontrollera namn, e-post och kontaktuppgifter.");
    } catch {
      setFeedback("Bokningen kunde inte kontrolleras. Försök igen med samma tid.");
    } finally {
      setPending(false);
    }
  }

  return <dialog ref={dialog} className="modal" aria-label="Boka konsultation"
    onCancel={event => { event.preventDefault(); if (!pending) onClose(); }}>
    <div className="modal-box max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-xl">
      <header className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-5 sm:px-7">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold tracking-tight text-[#1e3a5f]">{confirmed ? "Bokning bekräftad" : "Boka konsultation"}</h2>
          <p className="mt-2 break-words text-sm font-semibold">{name}</p>
          <p className="break-words text-sm text-slate-600">{firmName}</p>
        </div>
        <button type="button" aria-label="Stäng bokningsrutan" className="btn btn-ghost btn-circle shrink-0 text-slate-600" onClick={onClose} disabled={pending}>
          <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
      </header>
      <div className="space-y-5 px-5 py-6 sm:px-7">
      {confirmed ? <div className="space-y-5">
        <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold text-emerald-900">{confirmed}</p><p className="text-sm text-emerald-800">Svensk tid</p>
        </div>
        <button type="button" className={`${bookingButton} w-full`} onClick={onClose}>Klar</button>
      </div> : <>
        {loadFailed ? <div role="alert">Tiderna kunde inte hämtas. <button className="btn btn-sm" onClick={() => {
          setLoadFailed(false); setRefresh(value => value + 1);
        }}>Försök igen</button></div>
          : slots === null ? <p role="status">Hämtar lediga tider…</p>
          : slots.length === 0 && <div className="space-y-5">
            <div role="status">
              <h3 className="text-lg font-semibold">Inga lediga tider just nu</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">Kom tillbaka senare eller se om en annan jurist har en tid som passar.</p>
            </div>
            <Link href="/search" onClick={onClose} className={`${bookingButton} w-full`}>Visa alla jurister</Link>
          </div>}
        <form onSubmit={submit} hidden={!slots?.length} className="space-y-3">
          <fieldset disabled={pending} className="grid min-w-0 gap-4">
            <label className={labelClass}>Lediga tider (svensk tid)
              <select className="select h-12 w-full rounded-lg border-slate-500 bg-slate-100 text-base font-normal text-slate-900 focus:outline-[#1e3a5f]" value={selected} required onChange={event => {
                setSelected(event.target.value); requestKey.current = ""; setFeedback("");
              }}>
                <option value="">Välj en tid</option>
                {slots?.map(slot => <option key={slot.id} value={slot.id}>{slot.label}</option>)}
              </select>
            </label>
            <label className={labelClass}>Namn<input className={inputClass} name="name" autoComplete="name" required maxLength={150} /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>E-post<input className={inputClass} name="email" type="email" autoComplete="email" required maxLength={254} /></label>
              <label className={labelClass}>Telefon (valfritt)<input className={inputClass} name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
            </div>
            <label className={labelClass}>Meddelande till juristen (valfritt)<textarea className="textarea min-h-20 w-full rounded-lg border-slate-500 bg-slate-100 text-base font-normal text-slate-900 focus:outline-[#1e3a5f]" name="message" maxLength={2000} /></label>
            <button className={`${bookingButton} w-full`} disabled={!selected}>{pending ? "Bokar…" : "Bekräfta bokning"}</button>
          </fieldset>
        </form>
        {feedback && <p role="status" className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">{feedback}</p>}
      </>}
      </div>
    </div>
    <div className="modal-backdrop" onClick={() => { if (!pending) onClose(); }} />
  </dialog>;
}
