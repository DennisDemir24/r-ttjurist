/**
 * Filter Sidebar - The sidebar for applying search filters.
 * 
 * Features:
 * - Specialty filtering (multi-select)
 * - Location filtering
 * - Availability toggle
 * - Premium sorting toggle
 * - Results count and pagination controls
 */

import { useState } from "react";
import type { SearchFilters } from "./SearchFilters";

// Sample data for demonstration (replace with API calls in production)
const SPECIALTIES = [
  "Arbetsskada",
  "Familjerätt",
  "Bostadsrättsfrågor",
  "Arbetsrätt",
  "Företagsjuridik",
  "Immateriell rättighet",
  "Skatterätt",
  "Strafförhandlingar",
  "Mäklarskyddslagen",
  "Sjukdomsskadeersättning",
];

const LOCATIONS = [
  "Stockholm",
  "Göteborg",
  "Malmö",
  "Uppsala",
  "Linköping",
  "Örebro",
  "Västerås",
  "Norrköping",
  "Helsingborg",
  "Lund",
];

interface FilterSidebarProps {
  filters: SearchFilters;
  onFilterChange: (filters: Partial<SearchFilters>) => void;
  resultCount: number;
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  resultCount,
}: FilterSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Handle specialty selection (multi-select with checkboxes)
  const toggleSpecialty = (specialty: string) => {
    const current = filters.specialties;
    
    if (current.includes(specialty)) {
      onFilterChange({ specialties: current.filter((s) => s !== specialty) });
    } else {
      onFilterChange({ specialties: [...current, specialty] });
    }
  };

  // Handle location selection
  const toggleLocation = (location: string) => {
    const current = filters.locations;
    
    if (current.includes(location)) {
      onFilterChange({ locations: current.filter((l) => l !== location) });
    } else {
      onFilterChange({ locations: [...current, location] });
    }
  };

  // Calculate total pages for pagination display
  const totalPages = Math.ceil(Math.max(resultCount, 1) / filters.resultsPerPage);

  return (
    <div className="w-72 shrink-0 bg-white border-r border-slate-200 p-5 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Filter</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          {isExpanded ? "Dölj filter" : "Visa filter"}
        </button>
      </div>

      {/* Search Query Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Sökterm
        </label>
        <input
          type="text"
          placeholder="T.ex. 'arbitrering'..."
          value={filters.query}
          onChange={(e) => onFilterChange({ query: e.target.value })}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Specialties Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Område för rätten
        </label>
        {SPECIALTIES.map((specialty) => (
          <label key={specialty} className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-slate-50 rounded px-1.5 -ml-1.5">
            <input
              type="checkbox"
              checked={filters.specialties.includes(specialty)}
              onChange={() => toggleSpecialty(specialty)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">{specialty}</span>
          </label>
        ))}
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Ort
        </label>
        {LOCATIONS.map((location) => (
          <label key={location} className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-slate-50 rounded px-1.5 -ml-1.5">
            <input
              type="radio"
              name="location"
              checked={filters.locations.includes(location)}
              onChange={() => toggleLocation(location)}
              className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">{location}</span>
          </label>
        ))}
      </div>

      {/* Availability Toggle */}
      <div className="mb-6">
        <label className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-slate-50 rounded px-1.5 -ml-1.5">
          <input
            type="checkbox"
            checked={filters.showOnlyAvailable}
            onChange={(e) => onFilterChange({ showOnlyAvailable: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-700">Visa endast tillgängliga</span>
        </label>
      </div>

      {/* Premium Sorting Toggle */}
      <div className="mb-6">
        <label className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-slate-50 rounded px-1.5 -ml-1.5">
          <input
            type="checkbox"
            checked={filters.sortByPremium}
            onChange={(e) => onFilterChange({ sortByPremium: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-700">Sortera premium först</span>
        </label>
      </div>

      {/* Results Summary */}
      <div className="mt-8 pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-600">
          {resultCount === 1 ? (
            `${resultCount} resultat`
          ) : resultCount > 1 ? (
            `${resultCount.toLocaleString()} resultat`
          ) : (
            "Inga resultat"
          )}
        </p>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => onFilterChange({ sortByPremium: !filters.sortByPremium })}
              className={`text-sm font-medium ${
                filters.sortByPremium ? "text-blue-600" : "text-slate-500"
              }`}
            >
              Premium först
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">
                Sida {getPageFromParams({ page: "1" })} av {totalPages}
              </span>
              
              {/* Pagination buttons would go here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function getPageFromParams(params?: { page?: string | null }): number {
  if (params?.page && parseInt(params.page, 10) >= 1) {
    return parseInt(params.page, 10);
  }
  return 1;
}