import Link from "next/link";
import { bookingButton } from "../form-styles";
import type { LawyerProfile } from "@/lib/types";

/** Initials for the avatar, e.g. "Anna Svensson" → "AS". */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/** Five-star rating with individual stars colored based on rating value. */
function RatingStars({ rating }: { rating: number }) {
  const roundedRating = Math.round(rating * 10) / 10; // e.g., 4.7 → 4.7
  
  return (
    <div aria-label={`Betyg ${roundedRating} av 5`} className="flex gap-0.5">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        // Determine if this star should be filled based on rating
        const isFilled = roundedRating >= starValue;
        
        return (
          <svg
            key={index}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`h-3.5 w-3.5 ${
              isFilled ? "text-amber-400" : "text-slate-300"
            }`}
          >
            <path d="M12 2l2.9 5.8 6.4 1-4.6 4.4 1.1 6.3L12 16.6 6.2 19.5l1.1-6.3L2.7 8.8l6.4-1z" />
          </svg>
        );
      })}
    </div>
  );
}

interface ResultCardProps {
  profile: LawyerProfile;
  /** When provided, renders a "Boka konsultation" button inside the card. */
  onBook?: () => void;
}

/** Compact lawyer card for the search results grid (P1.3). */
export default function ResultCard({ profile, onBook }: ResultCardProps) {
  const roundedRating = Math.round(profile.rating * 10) / 10; // e.g., 4.7 → 4.7

  return (
    <div className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
      {/* Clickable header – navigates to the profile page */}
      <Link href={`/profile/${profile.slug}`} className="flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 text-sm font-bold text-white shadow-md">
            {getInitials(profile.name)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-semibold text-slate-900 group-hover:text-blue-700">
                {profile.name}
              </h3>
              {profile.isPremium && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                    <path d="M12 2l2.9 5.8 6.4 1-4.6 4.4 1.1 6.3L12 16.6 6.2 19.5l1.1-6.3L2.7 8.8l6.4-1z" />
                  </svg>
                  Premium
                </span>
              )}
            </div>
            <p className="mt-0.5 truncate text-sm text-slate-500">
              {profile.title} · {profile.firmName}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {profile.specialties.slice(0, 3).map((specialty) => (
                <span
                  key={specialty}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                >
                  {specialty}
                </span>
              ))}
              {profile.specialties.length > 3 && (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-400">
                  +{profile.specialties.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
        <RatingStars rating={profile.rating} />
        <span className="text-sm font-semibold text-slate-700">
          {roundedRating.toFixed(1).replace(".", ",")}
        </span>
        <span className="text-xs text-slate-400">· {profile.reviewCount} omdömen</span>
      </div>

      {/* Booking CTA – only rendered when onBook is provided */}
      {onBook && (
        <button
          type="button"
          onClick={onBook}
          className={`${bookingButton} mt-4 w-full`}
        >
          Boka konsultation
        </button>
      )}
    </div>
  );
}
