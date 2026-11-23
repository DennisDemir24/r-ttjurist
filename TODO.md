# 🚀 JuristFinder Project Plan - To Do List

*Date: 2026-11-12*
*Responsible Team: Senior Development Team*
*Tech Stack: Next.js (TS), Tailwind CSS, NeonDB*

## 🎯 Overall Goal
To build a scalable marketplace for lawyers where users can easily find the right expert based on their needs, and where firms can monetize their visibility through premium profiles.

---

## PHASE 1: MVP - Core Structure (Priority High)
*Goal: Functional search feature and basic profile data.*

- [ ] **[Backend] Schema Design:** Define NeonDB schema for `users`, `profiles`, and `services`. (Key: How to link a user to a professional profile?).
- [ ] **[Backend] API Endpoint:** Create fundamental API endpoints to fetch profiles based on categories/keywords.
- [ ] **[Frontend] Basic Structure:** Build layouts for the homepage (`/`) and search results page (`/search`). (UX Designer: Focus on Mobile First).
- [ ] **[Frontend] Profile View v1:** Create a static profile component showing name, description, and listed services.

## PHASE 2: Community & Trust - Interaction Layer (Priority Medium)
*Goal: Enable login and build trust through reviews.*

- [ ] **[Backend] Authentication:** Implement user registration/login.
- [ ] **[Backend] Review System:** API to submit, fetch, and count reviews per profile. (Must be linked to an authenticated user).
- [ ] **[Frontend] Interaction:** Add "Leave a review" form on the profile page.
- [ ] **[UX/Content] Copywriting:** Create persuasive copy for CTAs that drive conversion (e.g., from search result -> profile).

## PHASE 3: Monetization & Scale - Advanced Features (Priority Medium/Low)

- [ ] Before production launch, simplify approved-provider onboarding so an administrator can invite a verified practitioner without switching to the Neon console. Preserve invite-only registration and scope provisioning credentials to the minimum required access.
*Goal: Revenue generation and optimization.*

- [ ] **[Backend] Payment Services:** Integrate payment handling for "Boosted Listing" status.
- [ ] **[Frontend] Filtering Engine:** Implement advanced filters (e.g., specialty, price range).
- [ ] **[SEO/Content] Metadata:** Ensure unique `<title>` and meta description for all profiles and category pages.
- [ ] **[Admin] Dashboard v1:** Create an interface to monitor payments, verifications, and inactive accounts.

---

### 🛠️ Checklist/Checkpoints (For Agents)
*   ✅ Schema is clear and approved.
*   ✅ MVP search works correctly in a test environment.
*   ✅ Profile component is reusable and strongly typed (TypeScript).
