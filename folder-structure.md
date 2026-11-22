# 📁 Project Structure (Next.js / TypeScript)

This structure is based on the App Router in Next.js, which is optimal for managing Server Components and maximizing performance, critical for a scalable marketplace like JuristFinder.

```
/app
├── /(main)               // Root layout for main app flow (All general users see this flow)
│   ├── page.tsx          # Homepage (High-conversion area, search widget)
│   ├── search/page.tsx   # Search results page (/search?q=...) - Critical for performance!
│   └── profile/[id]/page.tsx # Profile viewing page (/profile/lawyer-slug) - Where conversion happens.
├── /(auth)               // Authentication flow (Handles NextAuth.js)
│   ├── login/page.tsx    # Login screen
│   └── register/page.tsx # Registration screen
├── dashboard/(...)      // Provider/Lawyer Dashboard (Exclusive to logged-in firms)
│   ├── page.tsx          # Overview/Dashboard
│   ├── profile/edit/page.tsx # Edit own profile, the primary CRUD interface.
│   └── billing/page.tsx    # Managing subscriptions and payment flows (Stripe).
├── global-error.tsx      # Application-level error handling
└── layout.tsx            # Root Layout (Header, Footer, Navigation)

/components
├── ui/                   // Reusable UI elements (Basic building blocks)
│   ├── Button.tsx        # Ex: Tailwind-based component
│   └── SkeletonLoader.tsx # To manage perceived performance during data fetching.
├── search/               // Search-specific components
│   ├── FilterSidebar.tsx    # Handles filter clicks (Specialty, Location, Price).
│   └── ResultCard.tsx       # Card view for each result item in the list.
├── profile/              // Profile viewing specific components
│   ├── ProfileHeader.tsx    # Image, name, title, and status indicator ("Premium").
│   ├── ServiceList.tsx      # Dynamic list of services with edit capability.
│   └── ReviewSection.tsx    # Widget for reviews & average rating display.
└── provider/             // Components for the provider's dashboard
    └── BillingDashboard.tsx # UI component for managing subscriptions and payments.

lib/
├── auth.ts               # NextAuth configuration and session management.
├── db.ts                 # Initialization of the NeonDB/PostgreSQL client (where DB connection happens).
├── utils.ts              # General helper functions (e.g., generating URL slugs, formatting dates).
└── types.ts              # Type definitions for all domain models (Lawyer, Specialty, Review, etc.).

middleware.ts          # Handles routing logic and protects routes based on user role/authentication status.
next.config.js
package.json
```