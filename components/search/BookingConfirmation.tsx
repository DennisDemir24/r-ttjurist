"use client";

import { useEffect, useState } from "react";

interface BookingConfirmationProps {
  bookingData: BookingFormData;
  onClose?: () => void;
}

export interface BookingFormData {
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

/**
 * Booking Confirmation - Shows after successful booking.
 * 
 * Features:
 * - Displays a summary of the booked consultation
 * - Shows next steps for both client and provider
 * - Auto-closes after 5 seconds (or can be manually closed)
 */
export default function BookingConfirmation({ bookingData, onClose }: BookingConfirmationProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Start exactly one interval timer while the modal is open.
  useEffect(() => {
    if (!onClose) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const handleClose = async () => {
      try {
        await onClose();
      } finally {
        // Cancel any pending timer immediately so manual close doesn't
        // create a duplicate auto-dismiss.
        if (intervalId !== null) clearInterval(intervalId);
        intervalId = null;
      }
    };

    // Start exactly one timer while the modal is open.
    if (isVisible && !intervalId) {
      intervalId = setInterval(handleClose, 5000);
    }

    return () => {
      if (intervalId !== null) clearInterval(intervalId);
    };
  }, [isVisible, onClose]);

  // Format date for display
  const formattedDate = new Date(bookingData.date).toLocaleDateString("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format time for display
  const formattedTime = bookingData.timeSlot;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      <div
        className={`w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl transition-opacity ${
          isVisible ? "" : "pointer-events-none"
        }`}
      >
        {/* Success icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="h-8 w-8 text-green-600"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        {/* Header */}
        <h2 className="text-2xl font-bold text-slate-900">Bokning bekräftad!</h2>
        <p className="mt-2 text-sm text-slate-500">
          Vi har mottagit din bokningsförfrågan. {bookingData.name}, vi kommer att kontakta dig snarast för att bekräfta tidpunkten.
        </p>

        {/* Summary */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Sammanfattning
          </h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-slate-500">Datum</dt>
              <dd className="font-medium text-slate-900">{formattedDate}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Tid</dt>
              <dd className="font-medium text-slate-900">{formattedTime}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Namn</dt>
              <dd className="font-medium text-slate-900">{bookingData.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">E-post</dt>
              <dd className="font-medium text-slate-900">{bookingData.email}</dd>
            </div>
          </dl>
        </div>

        {/* Next steps */}
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-base font-semibold text-slate-900">Nästa steg</h3>
            
            {/* For the client */}
            <div className="ml-5 space-y-2">
              <p className="text-sm text-slate-600">
                📧 <strong>E-postbekräftelse:</strong> Du kommer att få en bekräftelse på din e-postadress.
              </p>
              <p className="text-sm text-slate-600">
                📱 <strong>Svarar vi inte?</strong> Kontakta oss via e-post om du inte hör av dig inom 24 timmar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}