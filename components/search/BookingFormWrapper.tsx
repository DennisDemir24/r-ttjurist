"use client";

import { useState } from "react";
import type { LawyerProfile } from "@/lib/types";
import BookingForm, { type BookingFormData } from "./BookingForm";

/**
 * BookingFormWrapper - A client component that manages the booking modal state.
 * 
 * This wrapper handles client-side state (useState) which cannot be used in Server Components,
 * and provides a clean API for opening/closing the booking modal from parent components.
 */
export default function BookingFormWrapper({ profile }: { profile: LawyerProfile }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = async (bookingData: BookingFormData) => {
    console.log("Booking confirmed:", bookingData);
    
    // Here you would call the backend API:
    // await fetch('/api/v1/bookings', { method: 'POST', body: JSON.stringify(bookingData) });
    
    // The modal stays open: BookingConfirmation's "Stäng" button / auto-close
    // calls onClose, which closes it after the user has seen the confirmation.
  };

  const openBooking = () => setIsModalOpen(true);

  return (
    <div>
      {/* CTA button */}
      <button
        onClick={openBooking}
        className="mt-4 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
      >
        Boka konsultation
      </button>

      {/* Booking modal - only renders when isModalOpen is true */}
      {isModalOpen && (
        <BookingForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          providerName={profile.name}
          onSubmit={handleConfirm}
        />
      )}
    </div>
  );
}