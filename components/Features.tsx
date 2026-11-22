const features = [
  {
    title: "Verifierade jurister",
    description:
      "Alla jurister är verifierade och har relevant erfarenhet inom sitt område. Du vet alltid vem du pratar med.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3 7.5h-6a3 3 0 01-3-3v-4.5a3 3 0 013-3h6a3 3 0 013 3V12m-3 7.5H18a3 3 0 003-3V9a3 3 0 00-3-3" />
      </svg>
    ),
  },
  {
    title: "Omdöden från kunder",
    description:
      "Läs ärliga omdöden från andra som sökt juridisk hjälp. Välj med trygghet baserat på verkliga erfarenheter.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.098a5.5 5.5 0 007.424-6.43l-.392-.517a5.5 5.5 0 00-7.424-6.43L8.288 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.712 15.098a5.5 5.5 0 00-7.424 6.43l.392.517a5.5 5.5 0 007.424 6.43L15.712 22.5" />
      </svg>
    ),
  },
  {
    title: "Boka enkelt",
    description:
      "Boka konsultation direkt – online eller på plats, i din tid. Få svar på din fråga utan onödig väntan.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25m0 12.75V21m9-18v2.25m0 12.75V21m-9-13.5h9a.75.75 0 00.75-.75A3.75 3.75 0 0016.5 4.5h-9a3.75 3.75 0 00-3.75 3.75v9a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75v-9A3.75 3.75 0 0016.5 4.5" />
      </svg>
    ),
  },
  {
    title: "Tydliga priser",
    description:
      "Se kostnaden innan du bokat. Inga dolda avgifter, inga överraskningar – bara transparent prissättning.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 8.25V6a3 3 0 013-3h.375c1.125 0 2.125-.45 2.812-1.188l.538-.538A2.25 2.25 0 0119.125 0H21a2.25 2.25 0 012.25 2.25v16.5a2.25 2.25 0 01-2.25 2.25h-9" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Varför RättJurist?
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trygg juridisk hjälp, utan stress
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Vi gör det enkelt att hitta en jurist du kan lita på – oavsett vilken fråga du har.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-blue-100 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-[#1e3a5f] group-hover:bg-blue-100">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
