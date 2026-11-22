/**
 * Search Results - Main component for displaying search results with filtering.
 * 
 * This is a complete page component that integrates:
 * - Filter sidebar (FilterSidebar)
 * - Results grid (using ResultCard)
 * - Pagination controls
 * - Loading states and error handling
 */

import { useState, useMemo } from "react";
import type { LawyerProfile } from "@/lib/types";
import ResultCard from "./ResultCard";
import FilterSidebar from "./FilterSidebar";
import {
  DEFAULT_FILTERS,
  validateFilters,
  sortProfiles,
  getPaginationPages,
  type SearchFilters,
} from "./SearchFilters";

interface SearchResultsProps {
  /** Array of lawyer profiles to display */
  profiles: LawyerProfile[];
  
  /** Whether the data is currently loading */
  isLoading?: boolean;
  
  /** Error message if any occurred during data fetching */
  error?: string | null;
}

export default function SearchResults({
  profiles,
  isLoading = false,
  error = null,
}: SearchResultsProps) {
  // Validate filters at init and on every change to prevent invalid states
  const [filters, setFilters] = useState<SearchFilters>(() => validateFilters(DEFAULT_FILTERS));

  // Simulate data fetching (replace with actual API call in production)
  const fetchProfiles = async () => {
    // In a real app, this would be:
    // const response = await fetch(`/api/v1/search?query=${filters.query}&specialties=${encodeURIComponent(filters.specialties.join(','))}`);
    
    console.log("Fetching profiles with filters:", filters);
    
    // Simulate network delay
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 300);
    });
  };

  // Filter and sort profiles based on current filter state
  const filteredProfiles = useMemo(() => {
    let result = [...profiles];
    
    // Apply filters (query, specialties, etc.)
    if (filters.query) {
      result = result.filter((p) => 
        [p.name.toLowerCase(), p.title.toLowerCase(), p.firmName.toLowerCase()].some(
          (text) => text.includes(filters.query.toLowerCase())
        )
      );
    }
    
    if (filters.specialties.length > 0) {
      result = result.filter((p) => 
        filters.specialties.some((s) => p.specialties.includes(s))
      );
    }
    
    // Sort based on preferences
    const sorted = sortProfiles(result, filters);
    
    return sorted;
  }, [profiles, filters]);

  // Calculate pagination state
  const totalPages = Math.ceil(Math.max(filteredProfiles.length, 1) / filters.resultsPerPage);
  const currentPage = 1; // Would come from URL params in production
  
  // Get profiles for current page
  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * filters.resultsPerPage,
    currentPage * filters.resultsPerPage
  );

  // Handle filter changes
  const handleFilterChange = async (changes: Partial<SearchFilters>) => {
    setFilters((prev) => validateFilters({ ...prev, ...changes }));
    
    // In production, you would refetch data with new filters
    await fetchProfiles();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-sm text-slate-500">Laddar resultat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
        <div className="max-w-md text-center">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Ett fel uppstod</h2>
          <p className="text-sm text-slate-600">{error}</p>
          <button
            onClick={() => handleFilterChange({ query: "" })}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Försök igen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        resultCount={filteredProfiles.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-6 lg:p-8">
        {/* Header with results summary */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">Sökresultat</h1>
          
          {filteredProfiles.length > 0 && (
            <p className="text-sm text-slate-500">
              {filteredProfiles.length.toLocaleString()} av {profiles.length} profiler matchar
            </p>
          )}
        </div>

        {/* Results Grid */}
        {paginatedProfiles.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mx-auto h-12 w-12 text-slate-300"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.51v-2.222A3.75 3.75 0 0015.5 3.75C15.5 1.689 13.811 0 12 0s-3.5 1.689-3.5 3.75c0 .77.195 1.498.52 2.197l-.28.27h-.79v6.444c0 2.061 1.689 3.75 3.75 3.75s3.75-1.689 3.75-3.75V9.51a6.471 6.471 0 00-.52-2.197z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-slate-900">Inga resultat</h3>
            <p className="mt-2 text-sm text-slate-500">
              Prova att ändra dina sökfilter eller söktermer.
            </p>
          </div>
        ) : (
          <>
            {/* Results Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProfiles.map((profile) => (
                <ResultCard key={profile.slug} profile={profile} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                resultsPerPage={filters.resultsPerPage}
                totalCount={filteredProfiles.length}
                onNavigate={() => {}} // Page navigation would update URL params in production
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Pagination component for navigating between result pages.
 */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  resultsPerPage: number;
  /** Total number of matching profiles (for the "Visa X–Y av Z" summary). */
  totalCount: number;
  onNavigate: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  resultsPerPage,
  totalCount,
  onNavigate,
}: PaginationProps) {
  // Generate page numbers with ellipsis for large result sets
  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
      <p className="text-sm text-slate-500">
        Visa {((currentPage - 1) * resultsPerPage + 1).toLocaleString()}-{Math.min(
          currentPage * resultsPerPage,
          totalCount
        ).toLocaleString()} av {totalCount.toLocaleString()} resultat
      </p>

      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => onNavigate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            currentPage === 1
              ? "text-slate-300"
              : "text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          }`}
        >
          Föregående
        </button>

        {/* Page numbers */}
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => onNavigate(typeof page === "number" ? page : 1)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              typeof page === "number" && page === currentPage
                ? "bg-blue-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {typeof page === "string" ? "..." : page}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => onNavigate(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            currentPage >= totalPages
              ? "text-slate-300"
              : "text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          }`}
        >
          Nästa
        </button>
      </div>
    </div>
  );
}

