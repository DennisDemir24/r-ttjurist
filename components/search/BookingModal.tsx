"use client";
import { useEffect, useRef } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName?: string;
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
 * Booking Modal - A centered modal for booking a consultation.
 * 
 * Features:
 * - Close on Escape key or backdrop click
 * - Traps focus when open (placeholder)
 * - Smooth fade-in animation
 * - Renders child components via children prop
 */
export default function BookingModal({
  isOpen,
  onClose,
  providerName = "Jurist",
  children,
}: BookingModalProps & { children?: React.ReactNode }) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle backdrop click to close
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{ opacity: isOpen ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      <div
        ref={modalRef}
        className={`w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-opacity ${
          isOpen ? "" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Boka konsultation</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Stäng"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        {children ? children : (
          <p className="text-sm text-slate-500">
            Välj en tid för din konsultation med {providerName}.
          </p>
        )}
      </div>
    </div>
  );
}