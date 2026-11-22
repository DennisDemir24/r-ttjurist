const testimonials = [
  {
    name: "Anna Lindqvist",
    location: "Stockholm",
    text: "Jag hade en arbetsskada och visste inte vem jag skulle vända mig till. På RättJurist hittade jag en jurist inom arbetsrätt som förklarade allt på ett tydligt sätt. Hela processen var mycket smidigare än jag trodde.",
    rating: 5,
    area: "Arbetsskade",
  },
  {
    name: "Mikael Johansson",
    location: "Göteborg",
    text: "Vi behövde hjälp med ett samboavtal och gemensam egendom. Genom RättJurist kunde jag jämföra flera jurister, läsa omdöden och boka en konsultation direkt. En helt trygg upplevelse.",
    rating: 5,
    area: "Skilsmässa & Sambo",
  },
  {
    name: "Sofia Bergström",
    location: "Malmö",
    text: "En hyresvärd vägrade göra nödvändiga reparationer. Jag hittade en jurist inom hyresrätt på RättJurist som hjälpte mig att agera snabbt. Nu har jag fått det jag behövde – och det tog bara några dagar.",
    rating: 5,
    area: "Hyresrätt",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} av 5 stjärnor`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.19 6.88L12 17.77l-6.19 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="omdomden" className="scroll-mt-20 bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Omdöden
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Vad våra kunder säger
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              {/* Stars + area tag */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <StarRating rating={t.rating} />
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#1e3a5f]">
                  {t.area}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e3a5f] text-xs font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-900">{t.name}</span>
                  <span className="block text-xs text-slate-500">{t.location}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
