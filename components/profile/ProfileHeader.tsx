import type { LawyerProfile } from "@/lib/types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export default function ProfileHeader({ profile }: { profile: LawyerProfile }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Avatar placeholder – replace with profile image once upload is available */}
        <div
          aria-hidden="true"
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-2xl font-bold text-white sm:h-24 sm:w-24"
        >
          {getInitials(profile.name)}
        </div>

        <div className="min-w-0 flex-1">
          {/* Name + premium status badge */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {profile.name}
            </h1>
            {profile.isPremium && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2l2.9 5.8 6.4 1-4.6 4.4 1.1 6.3L12 16.6 6.2 19.5l1.1-6.3L2.7 8.8l6.4-1z" />
                </svg>
                Premium
              </span>
            )}
          </div>

          {/* Title + firm */}
          <p className="mt-1 text-sm font-medium text-slate-600 sm:text-base">
            {profile.title} · {profile.firmName}
          </p>

          {/* Specialties */}
          <ul aria-label="Specialiteter" className="mt-4 flex flex-wrap gap-2">
            {profile.specialties.map((specialty) => (
              <li
                key={specialty}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#1e3a5f]"
              >
                {specialty}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
