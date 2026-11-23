const steps = [
  {
    number: "1",
    title: "Hitta jurister",
    description:
      "Sök på ett ord som ”skilsmässa” eller välj ett rättsområde för att se jurister som arbetar med det.",
  },
  {
    number: "2",
    title: "Jämför profiler",
    description:
      "Läs juristens presentation och se vilka tjänster som erbjuds. Du väljer själv vem du vill boka.",
  },
  {
    number: "3",
    title: "Boka en ledig tid",
    description:
      "Öppna ”Boka konsultation” för att se juristens lediga tider. Välj en tid, fyll i dina kontaktuppgifter och bekräfta bokningen.",
  },
];

export default function HowItWorks() {
  return (
    <section id="sa-fungerar-det" className="scroll-mt-20 bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Så fungerar det
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tre enkla steg till juridisk hjälp
          </h2>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Step number circle */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#1e3a5f] text-xl font-bold text-white shadow-lg shadow-blue-900/20">
                {step.number}
              </div>

              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="absolute top-7 left-[calc(50%+3.5rem)] hidden h-px w-[calc(100%-7rem)] bg-slate-200 md:block" />
              )}

              <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#sok"
            className="inline-flex items-center gap-2 rounded-lg bg-[#1e3a5f] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-[#2d5078] hover:shadow-lg"
          >
            Starta din sökning
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H21a.75.75 0 01.75.75v12A.75.75 0 0121 21h-7.5a.75.75 0 01-.75-.75V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A.75.75 0 003 6.75v12a.75.75 0 00.75.75h9a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75h-9z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
