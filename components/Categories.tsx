const categories = [
  {
    name: "Arbetsskade & Arbetsrätt",
    description: "Skador, uppsägning, lönefrågor och arbetsvillkor.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 19a1.5 1.5 0 01-1.5 1.5H5.25A1.5 1.5 0 013.75 19v-8.25a1.5 1.5 0 011.5-1.5h15a1.5 1.5 0 011.5 1.5V19z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12H20.25" />
      </svg>
    ),
  },
  {
    name: "Skilsmässa & Sambo",
    description: "Samboavtal, skilsmässor och gemensam egendom.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 9v10.5a.75.75 0 01-.75.75h-3.75V9m-6 0H4.5a.75.75 0 00-.75.75v10.5a.75.75 0 00.75.75h3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 4.5V3.75c0-.968.782-1.75 1.75-1.75h16.5c.968 0 1.75.782 1.75 1.75v.75" />
      </svg>
    ),
  },
  {
    name: "Boförvärv & Hyresrätt",
    description: "Köp, försäljning, hyresavtal och bostadsrättsfrågor.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
      </svg>
    ),
  },
  {
    name: "Familjerätt",
    description: "Vårdnad, umgänge och underhållsbidrag.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    name: "Företagsjuridik",
    description: "Bolag, avtal, upphandling och affärsfrågor.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v18H21V3H3.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6M9 13h4" />
      </svg>
    ),
  },
  {
    name: "Skattefrågor",
    description: "Inkomstskatt, moms, bolagsskatt och skattekontroll.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5l3 3m0 0l3-3m-3 3v6m-8.25-1.5h16.5a1.5 1.5 0 001.5-1.5V4.5a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 4.5v9a1.5 1.5 0 001.5 1.5z" />
      </svg>
    ),
  },
  {
    name: "Konsumenträtt",
    description: "Garanti, reklamationer och köp av varor.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l2.5 12H21L23 3H3z" />
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
      </svg>
    ),
  },
  {
    name: "Arv & Testamente",
    description: "Testamenten, arvskifte och bodelning.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m-7.5-3a7.5 7.5 0 1015 0 7.5 7.5 0 00-15 0z" />
      </svg>
    ),
  },
];

export default function Categories() {
  return (
    <section id="omraden" className="scroll-mt-20 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Juridiska områden
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Hitta rätt expert inom ditt område
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Oavsett vilken juridisk fråga du har finns det en jurist som kan hjälpa dig.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <a
              key={category.name}
              href="#sok"
              className="group flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-[#1e3a5f]">
                {category.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-[#1e3a5f]">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{category.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
