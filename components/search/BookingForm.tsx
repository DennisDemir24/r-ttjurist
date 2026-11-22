"use client";

import BookingModal from "./BookingModal";
import DateSelector from "./DateSelector";
import TimeSlotPicker from "./TimeSlotPicker";
import ContactForm from "./ContactForm";
import BookingConfirmation from "./BookingConfirmation";
import { useState } from "react";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  providerName?: string;
  onSubmit: (bookingData: BookingFormData) => Promise<void>;
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
 * BookingForm - Complete booking flow with modal, form, and confirmation.
 *
 * This component integrates all booking components into a seamless user experience:
 * 1. User clicks "Book consultation" → Modal opens
 * 2. Selects date → DateSelector shows calendar
 * 3. Selects time → TimeSlotPicker shows available slots
 * 4. Fills contact info → ContactForm validates and submits
 * 5. Success → BookingConfirmation shows summary (only after a real submission)
 */
export default function BookingForm({
  isOpen,
  onClose,
  providerName = "Jurist",
  onSubmit,
}: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // Set only after ContactForm has actually submitted — this is what flips the
  // modal from the form to the confirmation screen. Selecting a date/time alone
  // must NOT show the confirmation.
  const [submittedBooking, setSubmittedBooking] = useState<BookingFormData | null>(null);

  // Called by ContactForm with date/time + contact info already merged.
  const handleSubmit = async (bookingData: BookingFormData) => {
    await onSubmit(bookingData);
    // Parent's onSubmit only resolves on success; show confirmation afterwards.
    setSubmittedBooking(bookingData);
  };

  // After a successful submission, replace the modal with the confirmation screen.
  if (submittedBooking) {
    return <BookingConfirmation bookingData={submittedBooking} onClose={onClose} />;
  }

  return (
    <BookingModal
      isOpen={isOpen}
      onClose={onClose}
      providerName={providerName}
    >
      <div className="space-y-6">
        {/* Date selection */}
        <section>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Välj datum</h3>
          <DateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            minDaysFromToday={0}
            maxDaysFromToday={30}
          />
        </section>

        {/* Time selection */}
        <section>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Välj tid</h3>
          <TimeSlotPicker
            selectedDate={selectedDate || ""}
            selectedTime={selectedTime}
            onTimeChange={setSelectedTime}
          />
        </section>

        {/* Contact form */}
        <section className="pt-4 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Dina uppgifter</h3>
          <ContactForm
            date={selectedDate}
            timeSlot={selectedTime}
            onSubmit={handleSubmit}
          />
        </section>
      </div>
    </BookingModal>
  );
}
