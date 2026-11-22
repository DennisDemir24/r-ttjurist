"use client";

import { useState } from "react";
import type { LawyerProfile } from "@/lib/types";
import ResultCard from "./ResultCard";
import BookingForm, { type BookingFormData } from "./BookingForm";

/**
 * ResultCardWithBooking – a result card with booking capability.
 *
 * The "Boka konsultation" button is rendered inside the card (via onBook),
 * so each result reads as one unified card instead of two detached boxes.
 */
export default function ResultCardWithBooking({ profile }: { profile: LawyerProfile }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = async (bookingData: BookingFormData) => {
    console.log("Booking confirmed for", profile.name, bookingData);

    // Here you would call the backend API:
    // await fetch('/api/v1/bookings', { method: 'POST', body: JSON.stringify(bookingData) });

    // The modal stays open: BookingConfirmation's "Stäng" button / auto-close
    // calls onClose, which closes it after the user has seen the confirmation.
  };

  return (
    <>
      <ResultCard profile={profile} onBook={() => setIsModalOpen(true)} />

      {/* Booking modal – only renders when isModalOpen is true */}
      {isModalOpen && (
        <BookingForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          providerName={`${profile.name} (${profile.firmName})`}
          onSubmit={handleConfirm}
        />
      )}
    </>
  );
}
