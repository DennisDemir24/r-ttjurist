# 🧑‍💻 JuristFinder Agent Roles & Responsibilities (Agents.md)

This document outlines the specialized roles (Agents) involved in developing and maintaining LegalConnect/JuristFinder. Each agent has a primary focus area to ensure quality, scalability, and user experience across all project phases.

---

## 🚀 Overall Goal
To translate the functional requirements (PRD) into a working product by managing specific technical layers: Data Handling, Backend Logic, Frontend UI/UX, and Content Strategy.

## 🧑‍💻 Role Overview

### 1. Backend & Database Agent (The Architect)
**Responsibility:** The entire data layer and all business logic not directly visible in the UI.
**Key Tasks:**
*   **Schema Implementation:** Responsible for executing `schema_design.md` and managing migrations (NeonDB).
*   **API Endpoints:** Building robust, scalable API endpoints (Next.js Route Handlers) for CRUD operations (e.g., `/api/v1/profiles/{id}`).
*   **Transaction Handling:** Ensuring atomicity in complex operations like bookings, payment updates, and the review system's integrity.
*   **Authentication/Authorization:** Implementing NextAuth.js flow and strictly controlling access based on user roles (`user_role`).

### 2. Frontend & UI/UX Agent (The Designer)
**Responsibility:** How the application looks, how it feels, and how fast it works. Focus on *Mobile First* design.
**Key Tasks:**
*   **Componentization:** Creating reusable components (`/components`) that are TypeScript-typed and optimized for performance.
*   **Search/Result UI:** Building the search experience (search widget, filtering sidebar) to ensure results load quickly (< 2 seconds).
*   **Interaction Flows:** Implementing flows requiring high user focus (e.g., booking a consultation, leaving a review).
*   **Responsiveness:** Ensuring perfect functionality on mobile devices—the primary tool for seeking legal advice.

### 3. Monetization & Business Logic Agent (The Financer)
**Responsibility:** Implementation of all revenue streams and payment processes.
**Key Tasks:**
*   **Stripe Integration:** Connecting to Stripe/payment gateways for handling subscriptions (`subscriptions` table).
*   **Status Logic:** Managing the transition between profile statuses (Free -> Premium -> Expired) and syncing this with `provider_profiles.is_premium`.
*   **Payment Verification:** Developing the workflow in the admin dashboard to confirm payments and update the profile status.

### 4. Content, SEO & Compliance Agent (The Expert)
**Responsibility:** Ensuring the platform is searchable, legally compliant, and has high conversion potential through its content.
**Key Tasks:**
*   **SEO Optimization:** Ensuring every profile (`/profile/{slug}`) has a unique and optimized `<title>` tag, meta-description, and canonical link.
*   **GDPR & Security (Compliance):** Auditing all data handling to ensure compliance with local data protection laws. Handling encryption/masking of sensitive account information.
*   **Copywriting:** Creating compelling CTAs and descriptions that guide the user from "I need help" to "Book a consultation".

---

## 🔁 Agent Collaboration (Flow Example)

| Function | Primary Agent | Involved Agents |
| :--- | :--- | :--- |
| **Search Results** | Frontend Agent | Backend Agent, Content Agent (for category page meta-tags) |
| **Create/Edit Profile** | Backend Agent | Frontend Agent, Content Agent (for copy) |
| **Leave a Review** | Frontend Agent | Backend Agent (for transaction logic), Compliance Agent (for spam control) |
| **Premium Boost** | Monetization Agent | Backend Agent, Frontend Agent (to display status on the profile) |

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
