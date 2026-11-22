import type { ReactNode } from "react";
import Link from "next/link";
import { categories } from "@/lib/data/categories";

/** Icons per category slug – kept local since they're purely presentational. */
const categoryIcons: Record<string, ReactNode> = {
  "arbetsskada-arbetsratt": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
    </svg>
  ),
  "skilsmassa-sambo": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
      <path d="M12 21C7 16 3 12.5 3 8.5A4.5 4.5 0 017.5 4c1.7 0 3.2.9 4.5 2.5C13.3 4.9 14.8 4 16.5 4A4.5 4.5 0 0121 8.5c0 4-4 7.5-9 12z" />
    </svg>
  ),
  "boforvarv-hyresratt": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  ),
  familjeratt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
      <circle cx="9" cy="7" r="3" />
      <circle cx="16" cy="8" r="2.5" />
      <path d="M4 20c0-3 2.5-5 5-5s5 2 5 5" />
      <path d="M15 20c0-2.5 1.8-4 3.5-4S22 17.5 22 20" />
    </svg>
  ),
  foretagsjuridik: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
    </svg>
  ),
  skattefragon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2" />
    </svg>
  ),
  konsumentratt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  "arv-testamente": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-6 w-6">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M10 12h5M10 16h5" />
    </svg>
  ),
};

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="eyebrow">Juridiska områden</span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Vilken typ av ärende behöver du hjälp med?
        </h2>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/search?category=${category.slug}`}
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
              {categoryIcons[category.slug]}
            </div>
            <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-blue-700">
              {category.name}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}