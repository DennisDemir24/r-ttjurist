"use client";

import { useState } from "react";

interface ContactFormProps {
  /** Selected consultation date (ISO, e.g. "2026-11-20"), or null if not selected yet */
  date?: string | null;
  /** Selected time slot (e.g. "14:30"), or null if not selected yet */
  timeSlot?: string | null;
  onSubmit: (data: BookingFormData) => Promise<void>;
}

export interface BookingFormData {
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

interface ContactFields {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact Form - Collects user information for booking a consultation.
 *
 * Features:
 * - Validates all required fields (name, e-mail, date, time) before submission
 * - Shows inline error messages and clears them as the user fixes each field
 * - Auto-fills name from browser (optional)
 * - Supports Swedish phone format (+46 XXXX XXX XX)
 */
export default function ContactForm({ date, timeSlot, onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFields>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ContactFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear the field's error as soon as the user starts fixing it
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields before submitting
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Namn är obligatoriskt";
    }
    if (!formData.email.trim()) {
      newErrors.email = "E-post är obligatorisk";
    } else if (!EMAIL_RE.test(formData.email)) {
      newErrors.email = "Ogiltig e-postadress";
    }

    // Date and time come from the pickers above — they must be selected first
    if (!date || !timeSlot) {
      setErrors({ ...newErrors, general: "Välj datum och tid först." });
      return;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      await onSubmit({
        date,
        timeSlot,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() ? formData.phone.trim() : undefined,
        message: formData.message?.trim() ? formData.message.trim() : undefined,
      });
      // On success the parent (BookingForm) switches to the confirmation screen.
    } catch (error) {
      console.error("Form submission failed:", error);
      setErrors({ general: "Ett fel uppstod. Försök igen." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Namn *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          autoComplete="name"
          className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition-colors ${
            errors.name ? "border-red-500 ring-red-200" : "border-slate-200 focus:border-blue-500 focus:ring-blue-200"
          }`}
          placeholder="Ditt namn"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          E-post *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          autoComplete="email"
          className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition-colors ${
            errors.email ? "border-red-500 ring-red-200" : "border-slate-200 focus:border-blue-500 focus:ring-blue-200"
          }`}
          placeholder="namn@exempel.se"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Phone field - optional */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
          Telefonnummer (valfritt)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+46 XXXX XXX XX"
          className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-blue-500 focus:ring-blue-200"
        />
      </div>

      {/* Message field - optional */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          Meddelande (valfritt)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message || ""}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={3}
          placeholder="Berätta kort om vad du behöver hjälp med..."
          className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-blue-500 focus:ring-blue-200"
        />
      </div>

      {/* General error message */}
      {errors.general && (
        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errors.general}
        </p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
          isSubmitting
            ? "cursor-not-allowed bg-slate-300"
            : errors.general
              ? "bg-slate-300"
              : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? "Skickar..." : "Boka konsultation"}
      </button>
    </form>
  );
}
