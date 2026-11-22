export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24 sm:py-32">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Sveriges mest betrodda juristplattform</span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Hitta rätt <span className="text-blue-600">jurist</span> för ditt ärende
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Jämför verifierade jurister, läs omdöden från andra och boka en kostnadsfri rådgivning – direkt på mobilen.
          </p>

          {/* Search form (P1.2) – GET so results are shareable URLs */}
          <form action="/search" method="GET" className="mt-10 w-full max-w-xl">
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                name="q"
                placeholder="Beskriv ditt ärende, t.ex. skilsmässa eller arbetsskada…"
                className="w-full rounded-lg border border-slate-200 bg-white py-4 pl-12 pr-4 text-base text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="mt-3 w-full rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-md transition-colors hover:bg-blue-700 sm:mt-5 sm:w-auto"
            >
              Sök nu
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4 text-emerald-500">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Verifierade jurister
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4 text-emerald-500">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Kostnadsfri rådgivning
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}