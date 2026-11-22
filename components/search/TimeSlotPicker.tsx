"use client";

import { useEffect } from "react";

interface TimeSlotPickerProps {
  selectedDate: string | null;
  selectedTime: string | null;
  onTimeChange: (time: string | null) => void;
}

/**
 * Time Slot Picker - Displays available time slots for a consultation.
 * 
 * Features:
 * - Shows placeholder time slots (e.g., every 30 minutes from 9:00 to 17:00)
 * - Validates that selected time is on the same date as selected date
 * - Placeholder data - will be replaced with real availability when backend is ready
 */
export default function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onTimeChange,
}: TimeSlotPickerProps) {
  // Generate placeholder time slots (every 30 min from 9:00 to 17:00, skipping lunch 12:00-13:00)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 16; hour++) {
      // Skip lunch break (12:00–13:00)
      if (hour === 12 || hour === 13) continue;

      for (const minute of [0, 30]) {
        const date = new Date();
        date.setHours(hour, minute, 0, 0);
        slots.push(date.toTimeString().slice(0, 5));
      }
    }
    return slots;
  };

  const timeSlots = selectedDate ? generateTimeSlots() : [];

  // Prevent selecting a time from a different date
  useEffect(() => {
    if (selectedTime && selectedDate) {
      const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
      const isSameDay = selectedDateTime.toDateString() === new Date(selectedDate).toDateString();

      if (!isSameDay) {
        onTimeChange(null);
      }
    }
  }, [selectedTime, selectedDate, onTimeChange]);

  return (
    <div className="mt-4">
      {/* Error message when date is not selected */}
      {!selectedDate && (
        <p className="mb-3 text-sm text-red-600">
          Välj ett datum för att se tillgängliga tider.
        </p>
      )}

      {/* Time slot grid */}
      {selectedDate && timeSlots.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => onTimeChange(slot)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                selectedTime === slot
                  ? "bg-blue-600 text-white shadow-md"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      ) : (
        <p className="mb-3 text-sm text-slate-500">
          Välj en tid för din konsultation.
        </p>
      )}

      {/* Selected time display */}
      {selectedTime && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
          <p className="text-sm font-medium text-green-800">
            Vald tid: <span className="font-semibold">{selectedTime}</span>
          </p>
        </div>
      )}
    </div>
  );
}