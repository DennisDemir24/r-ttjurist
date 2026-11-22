"use client";

import { useEffect, useId, useState } from "react";
import Logo from "./Logo";

const navLinks = [
  { label: "Hitta jurist", href: "#sok" },
  { label: "Juridiska områden", href: "#omraden" },
  { label: "Så fungerar det", href: "#sa-fungerar-det" },
  { label: "Omdömen", href: "#omdomden" },
];

function MenuIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const navId = useId().replace(/:/g, "");
  const drawerId = `${navId}-drawer`;
  const panelId = `${navId}-panel`;

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    function closeOnDesktop() {
      if (desktop.matches) setOpen(false);
    }
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  function close() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="drawer drawer-end">
        <input
          id={drawerId}
          type="checkbox"
          className="drawer-toggle"
          checked={open}
          onChange={(event) => setOpen(event.target.checked)}
        />

        <div className="drawer-content">
          <div className="navbar mx-auto h-16 min-h-16 max-w-7xl justify-between px-4 sm:px-6 lg:px-8">
            <div className="navbar-start w-auto!">
              <a href="#sok" aria-label="RättJurist – Hem" onClick={close}>
                <Logo />
              </a>
            </div>

            <nav className="navbar-center hidden lg:flex" aria-label="Huvudmeny">
              <ul className="menu menu-horizontal gap-1 px-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm font-medium text-slate-600">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="navbar-end w-auto! gap-2">
              <a
                href="#sok"
                className="btn hidden border-[#1e3a5f] bg-[#1e3a5f] text-white hover:border-[#2d5078] hover:bg-[#2d5078] lg:inline-flex"
              >
                Boka konsultation
              </a>
              <button
                type="button"
                className="btn btn-ghost btn-square lg:hidden"
                aria-label="Öppna meny"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="drawer-side z-[80]!">
          <label htmlFor={drawerId} aria-label="Stäng meny" className="drawer-overlay" />
          <div
            id={panelId}
            className="flex h-dvh w-[min(22rem,88vw)] flex-col bg-white pb-[env(safe-area-inset-bottom)] text-slate-900 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
              <Logo />
              <button type="button" className="btn btn-ghost btn-circle" aria-label="Stäng meny" onClick={close}>
                <CloseIcon />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobilmeny">
              <ul className="menu menu-lg w-full p-0">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="min-h-12 font-medium" onClick={close}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-slate-200 p-4">
              <a
                href="#sok"
                className="btn btn-block border-[#1e3a5f] bg-[#1e3a5f] text-white hover:border-[#2d5078] hover:bg-[#2d5078]"
                onClick={close}
              >
                Boka konsultation
              </a>
              <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
                Jämför jurister och boka en tid direkt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
