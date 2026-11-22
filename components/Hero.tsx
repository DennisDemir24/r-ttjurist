import Link from "next/link";

export default function Hero() {
  return (
    <section id="sok" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-50 via-slate-50 to-amber-50 opacity-60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Badge */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-medium text-[#1e3a5f]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Sveriges mest betrodda juristplattform
          </span>

          {/* Headline */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Hitta rätt jurist{" "}
            <span className="bg-gradient-to-r from-[#1e3a5f] to-blue-700 bg-clip-text text-transparent">
              för din fråga
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Jämför verifierade jurister, läs omdömen och boka konsultation – allt på en plats. Snabbt, enkelt och tryggt.
          </p>

          {/* Search bar - now functional! */}
          <div className="mt-10 w-full max-w-xl">
            <form action="/search" method="GET">
              <input type="hidden" name="category" value="" />
              <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/40 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 sm:flex-row sm:items-center sm:p-1.5">
                <div className="flex min-w-0 flex-1 items-center">
                  <svg
                    className="ml-2 h-5 w-5 shrink-0 text-slate-400 sm:ml-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  <input
                    type="search"
                    name="q"
                    aria-label="Vad behöver du hjälp med?"
                    placeholder="T.ex. arbetsskada eller skilsmässa"
                    className="min-w-0 w-full bg-transparent px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full shrink-0 border-[#1e3a5f] bg-[#1e3a5f] text-white hover:border-[#2d5078] hover:bg-[#2d5078] sm:w-auto transition-colors rounded-lg px-4 py-2.5 font-medium"
                >
                  Sök jurist
                </button>
              </div>
            </form>
          </div>

          {/* Trust stats */}
          <div className="mt-12 grid w-full max-w-lg grid-cols-3 gap-2 sm:gap-6">
            {[
              { value: "500+", label: "Verifierade jurister" },
              { value: "10 000+", label: "Lyckade ärenden" },
              { value: "4,8/5", label: "Genomsnittsbetyg" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center px-1">
                <span className="text-xl font-bold text-slate-900 sm:text-3xl">{stat.value}</span>
                <span className="mt-1 text-center text-[0.7rem] leading-snug text-slate-500 sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA links */}
          <div className="mt-10 flex gap-x-6 gap-y-4 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sök jurist nu
            </Link>
            <a
              href="#sok"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Hur det fungerar
            </a>
          </div>
        </div>

        {/* Background pattern */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-32 h-full w-full opacity-[0.08]">
          <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
            {[...Array(20)].map((_, i) => (
              <circle key={i} cx={`${Math.random() * 100}%`} cy={`${Math.random() * 100}%`} r={Math.random() * 3 + 1} />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}