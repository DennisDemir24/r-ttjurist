import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ServiceList from "@/components/profile/ServiceList";
import BookingFormWrapper from "@/components/search/BookingFormWrapper";
import { getProfileBySlug } from "@/lib/data/directory";

type ProfilePageProps = PageProps<"/profile/[id]">;

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const profile = await getProfileBySlug(id);

  if (!profile) {
    return { title: "Jurist ej hittad – RättJurist" };
  }

  return {
    title: `${profile.name} (${profile.title}) | ${profile.firmName}`,
    description: profile.bio,
  };
}

// v1: fully dynamic route — the profile is resolved before rendering so unknown
// slugs return a proper 404 (notFound() cannot change status once PPR streaming
// has begun). When real data fetching lands, re-enable cacheComponents in
// next.config.ts and wrap the content in <Suspense> with a skeleton.
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const profile = await getProfileBySlug(id);

  if (!profile) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Brödsmulor" className="mb-6 text-sm text-slate-500">
        <Link href="/" className="transition-colors hover:text-[#1e3a5f]">
          Hem
        </Link>
        <span aria-hidden="true" className="mx-2">
          /
        </span>
        <span className="text-slate-900">{profile.name}</span>
      </nav>

      {/* Main content */}
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left column - Profile info */}
        <main>
          <ProfileHeader profile={profile} />
          
          {/* Services section */}
          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Tjänster</h2>
            <ServiceList services={profile.services} />
          </section>

          {/* CTA section */}
          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Boka konsultation</h3>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                Kostnadsfri
              </span>
            </div>
            
            {/* BookingFormWrapper - manages modal state and renders CTA button */}
            <BookingFormWrapper profile={profile} />

            {/* Additional info */}
            {profile.testimonials && profile.testimonials.length > 0 && (
              <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-6 text-sm text-slate-500">
                {["Svar inom 24 timmar", "Tydlig prisinformation", "Verifierad jurist"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>

        {/* Right column - Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Om {profile.name}</h3>
            
            {/* Bio */}
            <p className="text-sm leading-relaxed text-slate-600">{profile.bio}</p>

            {/* Contact info */}
            <div className="mt-6 space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="block text-sm font-medium text-blue-700 hover:text-blue-800">
                  📧 {profile.email}
                </a>
              )}
              
              {profile.phone && (
                <p className="text-sm text-slate-600">📱 +46 {profile.phone}</p>
              )}

              {/* Testimonials */}
              {profile.testimonials && profile.testimonials.length > 0 && (
                <div className="mt-4 space-y-3">
                  {profile.testimonials.slice(0, 2).map((testimonial) => (
                    <blockquote key={testimonial.id} className="rounded-lg border border-slate-100 bg-white p-3 text-sm italic text-slate-600">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>
                  ))}
                </div>
              )}

              {/* Additional info */}
              <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-6 text-sm text-slate-500">
                {["Svar inom 24 timmar", "Tydlig prisinformation", "Verifierad jurist"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}