# 🎯 Detailed Sprint Backlog (Breakdown of TODO.md)

This backlog breaks down the high-level project phases into granular, assignable tickets, making it ready for sprint planning and daily task assignment.

---

### Phase 1 Tickets: MVP - Core Structure (Priority: Highest)
*Goal: Establish basic search capability and profile viewing.*

| Ticket ID | Task Description | Details / Acceptance Criteria | Assigned Agent | Effort Estimate |
| :--- | :--- | :--- | :--- | :--- |
| **P1.1** | Implement `users` & `firms` tables schema | Create necessary initial records for testing. Define relationships between the two core entities. | Backend Agent (Architect) | Medium |
| **P1.2** | Build basic API endpoint: Fetch all profiles by category | Endpoint must accept a `specialty_id` and return paginated results. Must handle no-results gracefully. | Backend Agent (Architect) | High |
| **P1.3** | Develop Search Result List Component (`ResultCard`) | Must display Name, Firm, Specialty (max 3), Hourly Rate. Needs to be fully responsive across devices. | Frontend Agent (Designer) | Medium |
| **P1.4** | Implement static Profile Viewing Page (`/profile/[id]`) | Component must pull data via server component and display Bio, Service List, and Header details reliably. | Frontend Agent (Designer) | High |
| **P1.5** | Seed initial specialty data | Populate the `specialties` table with core areas (e.g., Family Law, Labor Law). | Content Agent (Expert) | Low |

### Phase 2 Tickets: Community & Trust (Priority: Medium)
*Goal: Enable user interaction and social proof.*

| Ticket ID | Task Description | Details / Acceptance Criteria | Assigned Agent | Effort Estimate |
| :--- | :--- | :--- | :--- | :--- |
| **P2.1** | Implement User Registration/Login Flow | Integrate NextAuth.js for both `customer` and `provider` roles. Must handle role-based redirection. | Backend Agent (Architect) | High |
| **P2.2** | Build Review Submission Form UI | Frontend component requiring a logged-in user, profile ID, rating (1-5), and text input. | Frontend Agent (Designer) | Medium |
| **P2.3** | API: Submit & Calculate Reviews | Backend endpoint to save review + enforce the `interaction_proof` check. Must recalculate and update the average rating for the associated profile. | Backend Agent (Architect) | High |
| **P2.4** | Copywriting Review Text/CTA | Write compelling, trust-building language for calls-to-action on both search and profile pages. | Content Agent (Expert) | Low |

### Phase 3 Tickets: Monetization & Scale (Priority: Medium/Low)
*Goal: Introducing revenue streams and advanced features.*

| Ticket ID | Task Description | Details / Acceptance Criteria | Assigned Agent | Effort Estimate |
| :--- | :--- | :--- | :--- | :--- |
| **P3.1** | Stripe Integration & Subscription Model | Backend logic to create/update customer records via Stripe API. Must update `subscriptions` table status (Active, Expired). | Monetization Agent (Financer) | Very High |
| **P3.2** | Advanced Filtering UI Implementation | Frontend component that accepts complex search criteria (e.g., filter by *multiple* specialties AND rate range). | Frontend Agent (Designer) | High |
| **P3.3** | Profile Status Logic Update | Backend logic to check `subscriptions` status when rendering the profile. Must dynamically show premium badge or limit features based on status. | Backend Agent / Monetization Agent | Medium |
| **P3.4** | Global SEO Implementation | Middleware or layout component that dynamically injects unique `<title>` and meta tags for `/profile/{slug}` using profile data. | Content Agent (Expert) | Medium |

---

### 📝 Next Steps Recommendation:

1.  **Review & Approval:** Please review this breakdown to confirm if these tasks accurately cover the original scope.
2.  **Prioritization:** We should tackle **Phase 1 tickets (P1.1 - P1.5)** first, as they form the foundation of the MVP.
3.  **Task Assignment:** Once approved, I am ready to take on implementing the code for a small set of these tasks based on your direction!