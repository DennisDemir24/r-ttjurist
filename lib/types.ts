/**
 * Domain models for JuristFinder.
 *
 * These mirror the NeonDB schema (see `schema-design.md`) so that swapping
 * placeholder data for real API/DB calls later is a drop-in change.
 */

/** A single service offered by a lawyer (maps to the `services` table). */
export interface Service {
  id: string;
  name: string;
  description: string;
}

/** A short client quote shown on the profile page (maps to the `reviews` table). */
export interface Testimonial {
  id: string;
  text: string;
}

/** Public lawyer profile shown on /profile/[id] (maps to provider_profiles + firms). */
export interface LawyerProfile {
  /** URL slug used as the [id] route param, e.g. /profile/anna-svensson */
  slug: string;
  name: string;
  title: string; // e.g. "Advokat"
  firmName: string; // e.g. "Svensson & Partners Advokatbyrå"
  /** Summarized description of areas of expertise (maps to provider_profiles.bio). */
  bio: string;
  specialties: string[]; // e.g. ["Arbetsskada", "Arbetsrätt"]
  /** Boosted listing status – rendered as a badge on the profile (Phase 3). */
  isPremium: boolean;
  services: Service[];
  /** Average rating from reviews, 0–5 (computed from the `reviews` table in Phase 2). */
  rating: number;
  /** Number of verified reviews – used as a ranking tie-breaker. */
  reviewCount: number;
  /** Contact e-mail, if published (optional in placeholder data). */
  email?: string;
  /** Phone number without country prefix, if published. */
  phone?: string;
  /** Whether the lawyer currently accepts new clients; unknown = treated as available. */
  isAvailable?: boolean;
  /** Short client quotes shown on /profile/[id] (maps to `reviews`). */
  testimonials?: Testimonial[];
}
