import Link from "next/link";

export default function Hero() {
  return (
    <section id="sok" className="scroll-mt-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Headline */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Hitta rätt jurist{" "}
            <span className="bg-gradient-to-r from-[#1e3a5f] to-blue-700 bg-clip-text text-transparent">
              för din fråga
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Sök efter det du behöver hjälp med, jämför jurister och boka en ledig tid.
          </p>

          {/* Search bar - now functional! */}
          <div className="mt-10 w-full max-w-xl">
            <form action="/search" method="GET">
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

          <div className="mt-3 flex flex-wrap justify-center gap-x-6 text-sm font-medium text-[#1e3a5f]">
            <Link
              href="/search"
              className="link link-hover py-3"
            >
              Visa alla jurister
            </Link>
            <a
              href="#sa-fungerar-det"
              className="link link-hover py-3"
            >
              Hur det fungerar
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
