# Project: tea-country-holidays

## Architecture
- **Framework**: Next.js (version 16.2.9) with App Router.
- **Frontend library**: React (version 19.2.4), TailwindCSS (version 4).
- **Authentication & Backend**: Supabase (via `@supabase/ssr` library, migrating from `@supabase/auth-helpers-nextjs`).
- **State and Client logic**: Supabase auth state, client component hooks (`useAuthGate`), custom pages/routes.
- **Mobile responsiveness**: Tailwind fluid grid, responsive breakpoints down to 320px.
- **Performance**: Next.js optimized Image components, priority loading for above-the-fold content.

## Code Layout
- `app/` - Next.js App Router routes.
  - `app/auth/callback/route.ts` - OAuth callback route.
  - `app/login/` - Login interface and custom reset-password page.
  - `app/layout.tsx`, `app/page.tsx` - App layout and main page.
  - `app/holidays/`, `app/hotels/`, `app/events/`, `app/flights/`, `app/railways/` - Sub-pages.
- `components/` - Shared UI components (Sticky CTA, booking modal, banners, etc.).
- `hooks/` - Client React hooks.
- `lib/` - Utility libraries (Supabase client initialisation, WhatsApp utils, etc.).
- `tests/` - Playwright or custom NodeJS E2E test suite (constructed by E2E Testing Track).

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Design test harness, invent features, implement Tier 1-4 tests, publish `TEST_READY.md` | None | IN_PROGRESS (bebd4e49-7af2-4756-8db6-2035b60d30df) |
| 1 | Auth Migration | Migrate helper library from `@supabase/auth-helpers-nextjs` to `@supabase/ssr` in package.json and route handlers/client hooks. Ensure callback works. | None | IN_PROGRESS (Final Validation: 3d7d8a30, b9744ce7, 59791e5c) |
| 2 | Password Recovery | Implement Forgot Password trigger, Supabase recovery email trigger, and `/login/reset-password` page. | 1 | PLANNED |
| 3 | Mobile Responsiveness | Fix mobile viewports down to 320px for all pages. Fix interactive component touch interactions. | None | PLANNED |
| 4 | Speed & Banner | Optimize above-the-fold Next.js Image component priorities and implement themed Cookie Consent Banner. | None | PLANNED |
| 5 | Integration & Hardening | Pass 100% of E2E tests (Tier 1-4) and complete Adversarial Coverage Hardening (Tier 5). | E2E, 2, 3, 4 | PLANNED |

## Interface Contracts
### Supabase SSR Client initialization (lib/supabase.ts or app-router SSR helper)
- Should export unified helper to create supabase client using `@supabase/ssr`.
- For route handler / Server Components: `createClient` utilizing cookies configuration.
- For client components: `createBrowserClient`.

### Password Reset Session callback
- URL: `/login/reset-password` (accepts token hash or session from redirect).
