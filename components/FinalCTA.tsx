export default function FinalCTA() {
  return (
    <section className="bg-[#1e3a5f] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Redo att få juridisk hjälp?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-blue-100">
          Boka din första konsultation idag – det är enkelt, tryggt och utan förpliktelser.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#sok"
            className="inline-flex w-full items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-[#1e3a5f] shadow-md transition-all hover:bg-blue-50 sm:w-auto"
          >
            Hitta din jurist
          </a>
          <a
            href="#sa-fungerar-det"
            className="inline-flex w-full items-center justify-center rounded-lg border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Läs mer om hur det fungerar
          </a>
        </div>
      </div>
    </section>
  );
}
