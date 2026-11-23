import Logo from "./Logo";

const footerLinks = {
  "Hitta jurist": [
    { label: "Arbetsskade & Arbetsrätt", href: "#omraden" },
    { label: "Skilsmässa & Sambo", href: "#omraden" },
    { label: "Boförvärv & Hyresrätt", href: "#omraden" },
    { label: "Familjerätt", href: "#omraden" },
  ],
  "Om oss": [
    { label: "Ansök om en juristprofil", href: "/ansok" },
    { label: "Aktivera ditt konto", href: "/aktivera" },
    { label: "Logga in", href: "/logga-in" },
    { label: "Så fungerar det", href: "#sa-fungerar-det" },
    { label: "Omdöden", href: "#omdomden" },
    { label: "Kontakt", href: "#" },
  ],
  "Juridiskt": [
    { label: "Användarvillkor", href: "#" },
    { label: "Sekretesspolicy", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Sveriges mest betrodda plattform för att hitta rätt jurist. Snabbt, enkelt och tryggt.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-slate-900">{heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-[#1e3a5f]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-slate-100 pt-8">
          <p className="text-center text-xs text-slate-400">
            © 2026 RättJurist. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
}
