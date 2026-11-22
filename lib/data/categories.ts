/**
 * Legal areas offered on the platform (homepage category cards + /search filter).
 *
 * `keywords` are the Swedish search terms that map a category to lawyer
 * specialties – this is the stand-in for the seeded `specialties` table
 * (P1.5) until the backend lands.
 */
export interface LegalCategory {
  /** URL-safe slug used in /search?category=<slug> */
  slug: string;
  name: string;
  description: string;
  keywords: string[];
}

export const categories: LegalCategory[] = [
  {
    slug: "arbetsskada-arbetsratt",
    name: "Arbetsskade & Arbetsrätt",
    description: "Skador, uppsägning, lönefrågor och arbetsvillkor.",
    keywords: ["arbetsskada", "arbetsrätt", "uppsägning"],
  },
  {
    slug: "skilsmassa-sambo",
    name: "Skilsmässa & Sambo",
    description: "Samboavtal, skilsmässor och gemensam egendom.",
    keywords: ["skilsmässa", "sambo", "bodelning"],
  },
  {
    slug: "boforvarv-hyresratt",
    name: "Boförvärv & Hyresrätt",
    description: "Köp, försäljning, hyresavtal och bostadsrättsfrågor.",
    keywords: ["boförvärv", "hyresrätt", "köpeavtal"],
  },
  {
    slug: "familjeratt",
    name: "Familjerätt",
    description: "Vårdnad, umgänge och underhållsbidrag.",
    keywords: ["familjerätt", "vårdnad", "umgänge", "underhållsbidrag"],
  },
  {
    slug: "foretagsjuridik",
    name: "Företagsjuridik",
    description: "Bolag, avtal, upphandling och affärsfrågor.",
    keywords: ["företagsjuridik", "avtalsrätt", "bolag", "upphandling"],
  },
  {
    slug: "skattefragon",
    name: "Skattefrågor",
    description: "Inkomstskatt, moms, bolagsskatt och skattekontroll.",
    keywords: ["skattefrågor", "moms", "inkomstskatt"],
  },
  {
    slug: "konsumentratt",
    name: "Konsumenträtt",
    description: "Garanti, reklamationer och köp av varor.",
    keywords: ["konsumenträtt", "garanti", "reklamationer"],
  },
  {
    slug: "arv-testamente",
    name: "Arv & Testamente",
    description: "Testamenten, arvskifte och bodelning.",
    keywords: ["arv", "testamente", "arvskifte", "bodelning"],
  },
];

/** Look up a category by its URL slug. */
export function getCategoryBySlug(slug: string): LegalCategory | undefined {
  return categories.find((category) => category.slug === slug);
}