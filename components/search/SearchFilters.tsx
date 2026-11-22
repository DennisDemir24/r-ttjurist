/**
 * Search Filters - Filter state management and helper types.
 */

import type { LawyerProfile } from "@/lib/types";

export interface SearchFilters {
  query: string;
  specialties: string[];
  locations: string[];
  showOnlyAvailable: boolean;
  sortByPremium: boolean;
  resultsPerPage: number;
}

export const DEFAULT_FILTERS: SearchFilters = {
  query: "",
  specialties: [],
  locations: ["Alla orter"],
  showOnlyAvailable: false,
  sortByPremium: true,
  resultsPerPage: 12,
};

export function validateFilters(filters: SearchFilters): SearchFilters {
  return {
    ...filters,
    query: filters.query.slice(0, 100),
    specialties: Array.from(new Set(filters.specialties)).slice(0, 5),
    locations: Array.from(new Set(filters.locations)).slice(0, 3),
    resultsPerPage: Math.min(Math.max(6, filters.resultsPerPage), 24),
  };
}

export function profileMatchesFilters(profile: LawyerProfile, filters: SearchFilters): boolean {
  const query = filters.query.toLowerCase();
  if (query && !matchesQuery(profile, query)) return false;
  
  if (filters.specialties.length > 0) {
    const hasSpecialty = filters.specialties.some((s) => profile.specialties.includes(s));
    if (!hasSpecialty) return false;
  }
  
  // Unknown availability (placeholder data) is treated as available.
  if (filters.showOnlyAvailable && profile.isAvailable === false) return false;
  return true;
}

function matchesQuery(profile: LawyerProfile, query: string): boolean {
  const searchable = [
    profile.name.toLowerCase(),
    profile.title.toLowerCase(),
    profile.firmName.toLowerCase(),
    (profile.bio || "").toLowerCase(),
    ...profile.specialties.map((s) => s.toLowerCase()),
  ].join(" ");
  return searchable.includes(query);
}

export function sortProfiles(profiles: LawyerProfile[], filters: SearchFilters): LawyerProfile[] {
  const sorted = [...profiles];
  
  if (filters.sortByPremium) {
    sorted.sort((a, b) => {
      const aIsPremium = a.isPremium ? 1 : 0;
      const bIsPremium = b.isPremium ? 1 : 0;
      
      if (aIsPremium !== bIsPremium) return bIsPremium - aIsPremium;
      return b.rating - a.rating;
    });
  } else {
    sorted.sort((a, b) => b.rating - a.rating);
  }
  
  return sorted;
}

export function countMatchingProfiles(profiles: LawyerProfile[], filters: SearchFilters): number {
  let count = profiles.length;
  if (filters.query) {
    const queryMatches = profiles.filter((p) => matchesQuery(p, filters.query));
    count = queryMatches.length;
  }
  if (filters.specialties.length > 0) {
    const specialtyMatches = profiles.filter((p) => 
      filters.specialties.some((s) => p.specialties.includes(s))
    );
    count = specialtyMatches.length;
  }
  return Math.max(0, count);
}

export function getPageFromParams(params?: { page?: string | null }): number {
  if (params?.page && parseInt(params.page, 10) >= 1) {
    return parseInt(params.page, 10);
  }
  return 1;
}

export function getPaginationPages(currentPage: number, totalPages: number): (number | string)[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);

  const windowSize = Math.min(3, totalPages - currentPage + 1);
  for (let i = Math.max(2, currentPage - windowSize); i <= Math.min(totalPages - 1, currentPage + windowSize); i++) {
    pages.add(i);
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const result: (number | string)[] = [];
  
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] !== sorted[i - 1] + 1) {
      const gapStart = sorted[i - 1] + 1;
      const gapEnd = sorted[i] - 1;
      if (gapEnd - gapStart > 1) {
        result.push(gapStart);
        result.push("...");
      }
    }
    result.push(sorted[i]);
  }

  return result;
}