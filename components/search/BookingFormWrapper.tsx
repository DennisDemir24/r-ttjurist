"use client";

import { useState } from "react";
import type { LawyerProfile } from "@/lib/types";
import BookingForm from "./BookingForm";
import ResultCard from "./ResultCard";
import { bookingButton } from "../form-styles";

export default function BookingFormWrapper({ profile, asCard = false }: { profile: LawyerProfile; asCard?: boolean }) {
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
  return <>
    {asCard ? <ResultCard profile={profile} onBook={show} /> :
      <button className={`${bookingButton} mt-4 w-full`} onClick={show}>Boka konsultation</button>}
    {open && <BookingForm slug={profile.slug} name={profile.name} firmName={profile.firmName} onClose={() => setOpen(false)} />}
  </>;
}
