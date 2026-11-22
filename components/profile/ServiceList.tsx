import type { Service } from "@/lib/types";

export default function ServiceList({ services }: { services: Service[] }) {
  return (
    <ul className="space-y-4">
      {services.map((service) => (
        <li
          key={service.id}
          className="flex gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          {/* Icon */}
          <div
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#1e3a5f]"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{service.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{service.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
