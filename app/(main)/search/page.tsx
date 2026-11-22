import type { Metadata } from "next";
import Link from "next/link";
import SearchResultsWithFilters from "@/components/search/SearchResultsWithFilters";
import { categories, getCategoryBySlug } from "@/lib/data/categories";
import { searchProfiles } from "@/lib/search";

type SearchPageProps = PageProps<"/search">;

/** Next.js may pass query params as arrays (?q=a&q=b) – take the first value. */
function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = firstValue(params.q)?.trim();
  const categorySlug = firstValue(params.category);
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  if (category) {
    return {
      title: `${category.name} – Hitta jurist | RättJurist`,
      description: `Jämför verifierade jurister inom ${category.name.toLowerCase()} och boka en kostnadsfri rådgivning.`,
    };
  }
  if (query) {
    return {
      title: `Sökresultat för "${query}" | RättJurist`,
      description: `Hitta rätt jurist – sökresultat för ${query}.`,
    };
  }
  return {
    title: "Hitta rätt jurist | RättJurist",
    description:
      "Jämför verifierade jurister inom alla områden och boka en kostnadsfri rådgivning.",
  };
}

function chipClass(active: boolean): string {
  return [
    "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
    active
      ? "border-transparent bg-blue-600 text-white"
      : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700",
  ].join(" ");
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = firstValue(params.q)?.trim() || undefined;
  const categorySlug = firstValue(params.category);
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  const results = searchProfiles({ query, categorySlug: category?.slug });

  const heading = category
    ? `Jurister inom ${category.name}`
    : query
      ? `Resultat för "${query}"`
    : "Alla jurister";

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Refine search – GET form so the URL stays shareable */}
      <form action="/search" method="GET" className="flex gap-2">
        {category && <input type="hidden" name="category" value={category.slug} />}
        <div className="relative flex-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            name="q"
            defaultValue={query ?? ""}
            placeholder="Sök efter jurist, specialitet eller byrå…"
            className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
        >
          Sök
        </button>
      </form>

      {/* Category filter chips */}
      <nav aria-label="Juridiska områden" className="mt-6 flex flex-wrap gap-2">
        <Link href="/search" className={chipClass(!category)}>
          Alla
        </Link>
        {categories.map((legalCategory) => (
          <Link
            key={legalCategory.slug}
            href={`/search?category=${legalCategory.slug}`}
            className={chipClass(category?.slug === legalCategory.slug)}
          >
            {legalCategory.name}
          </Link>
        ))}
      </nav>

      {/* Results header – the count line and grid live in SearchResultsWithFilters so they track filters */}
      <div className="mb-6 mt-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{heading}</h1>
      </div>

      {/* Filter sidebar + results grid (client-side filter state) */}
      <SearchResultsWithFilters initialProfiles={results} />

      {/* Pagination would go here */}
    </section>
  );
}