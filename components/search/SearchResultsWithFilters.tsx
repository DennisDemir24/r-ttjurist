/**
 * SearchResultsWithFilters – client-side filter state for the /search page.
 *
 * The server component (app/(main)/search/page.tsx) narrows results by URL
 * params (?q=...&category=...) and hands them over as `initialProfiles`.
 * This wrapper adds the interactive FilterSidebar on top of that baseline:
 * specialty, location, availability and premium-sort filters are applied
 * client-side against the placeholder data from lib/data/profiles.ts.
 *
 * When the NeonDB backend lands, swap the local filter/sort for an API call –
 * the SearchFilters state shape is already designed to be sent as query params.
 */

"use client";

import { useMemo, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ResultCardWithBooking from "./ResultCardWithBooking";
import {
  DEFAULT_FILTERS,
  profileMatchesFilters,
  sortProfiles,
  validateFilters,
  type SearchFilters,
} from "./SearchFilters";
import type { LawyerProfile } from "@/lib/types";

interface SearchResultsWithFiltersProps {
  /** Baseline results already narrowed by URL params (q / category). */
  initialProfiles: LawyerProfile[];
}

export default function SearchResultsWithFilters({
  initialProfiles,
}: SearchResultsWithFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>(() => validateFilters(DEFAULT_FILTERS));

  // FilterSidebar sends partial updates (e.g. { specialties: [...] }) – merge into state.
  const handleFilterChange = (update: Partial<SearchFilters>) => {
    setFilters((prev) => validateFilters({ ...prev, ...update }));
  };

  // Re-run the "fetch" whenever filters change. With placeholder data this is a
  // local filter + sort; with the backend it becomes an API request.
  // Note: location filtering activates once profiles carry location data from
  // the backend – placeholder profiles have no location field yet, so the
  // location selection only updates state for now ("Alla orter" is the default).
  const results = useMemo(() => {
    return sortProfiles(
      initialProfiles.filter((profile) => profileMatchesFilters(profile, filters)),
      filters,
    );
  }, [initialProfiles, filters]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Filter sidebar – specialty, location, availability, premium sort */}
      <FilterSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        resultCount={results.length}
      />

      {/* Results column */}
      <div className="min-w-0 flex-1">
        <p className="text-sm text-slate-500">
          {results.length} verifierade jurist{results.length === 1 ? "" : "er"} · Sorterat efter{" "}
          {filters.sortByPremium ? "premium & högst betyg" : "högst betyg"}
        </p>

        {results.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((profile) => (
              <ResultCardWithBooking key={profile.slug} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              className="mx-auto h-10 w-10 text-slate-300"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-slate-900">Inga resultat</h3>
            <p className="mt-2 text-sm text-slate-500">
              Prova att ändra dina sökfilter eller söktermer.
            </p>
          </div>
        )}

        {/* Pagination would go here */}
      </div>
    </div>
  );
}
