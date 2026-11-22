import type { LawyerProfile } from "@/lib/types";
import { getAllProfiles } from "@/lib/data/profiles";
import { getCategoryBySlug, type LegalCategory } from "@/lib/data/categories";

/**
 * Normalize text for lenient matching: lowercase + strip Swedish diacritics
 * so "familjerätt" and "familjeratt" match the same records.
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o");
}

export interface SearchCriteria {
  /** Free-text query matched against name, firm, title, bio, specialties and services. */
  query?: string;
  /** Category slug – filters lawyers whose specialties match the category's keywords. */
  categorySlug?: string;
}

/**
 * Search placeholder profiles by free text and/or legal category.
 * Results are ranked best-first: rating desc → review count desc → name asc,
 * so the highest-rated lawyer for a case type always comes out on top.
 * (Phase 3 will insert premium/boosted ordering here once paid ranking lands.)
 */
export function searchProfiles({ query, categorySlug }: SearchCriteria): LawyerProfile[] {
  const normalizedQuery = normalize(query ?? "").trim();
  const queryWords = normalizedQuery ? normalizedQuery.split(/\s+/).filter(Boolean) : [];
  const category: LegalCategory | undefined = categorySlug
    ? getCategoryBySlug(categorySlug)
    : undefined;

  return getAllProfiles()
    .filter((profile) => matchesCategory(profile, category))
    .filter((profile) => (queryWords.length > 0 ? matchesQuery(profile, queryWords) : true))
    .sort(rankProfiles);
}

/** A lawyer belongs to a category when any of the category's keywords appears in one of their specialties. */
function matchesCategory(profile: LawyerProfile, category?: LegalCategory): boolean {
  if (!category) return true;
  const specialties = profile.specialties.map(normalize);
  return category.keywords.some((keyword) => {
    const normalizedKeyword = normalize(keyword);
    return specialties.some((specialty) => specialty.includes(normalizedKeyword));
  });
}

/** Every query word must appear somewhere in the lawyer's searchable text. */
function matchesQuery(profile: LawyerProfile, queryWords: string[]): boolean {
  const haystack = [
    profile.name,
    profile.title,
    profile.firmName,
    profile.bio,
    ...profile.specialties,
    ...profile.services.map((service) => `${service.name} ${service.description}`),
  ]
    .join(" ")
    ;
  const normalizedHaystack = normalize(haystack);
  return queryWords.every((word) => normalizedHaystack.includes(word));
}

/** Best-first ranking: rating, then review count as tie-breaker, then name for stable output. */
function rankProfiles(a: LawyerProfile, b: LawyerProfile): number {
  if (b.rating !== a.rating) return b.rating - a.rating;
  if (b.reviewCount !== a.reviewCount) return b.reviewCount - a.reviewCount;
  return a.name.localeCompare(b.name);
}
