# Fix Tracker

This document tracks the status of identified bugs in the `tea-country-holidays` codebase.

| ID | Description | Component(s) | Status |
|----|-------------|--------------|--------|
| 1  | Early Bird offer never auto-expires (ignores deadline date) | `components/offer-banner.tsx` | Fixed |
| 2  | `createAdminClient()` defined but completely unused | `app/(admin)/admin/*/actions.ts` | Fixed |
| 3  | Hardcoded WhatsApp number duplicated in 5+ places | Multiple files | Open |
| 4  | Side effect during render in FloatingActionBar | `components/FloatingActionBar.tsx` | Open |
| 5  | Duplicated sanitizeSearchTerm() | `glass-search.tsx`, `travel-autocomplete.tsx` | Open |
| 6  | Bot/automation detection changes real production behavior | `components/navbar.tsx` | Open |
| 7  | FAQ answer clipped on narrow viewports due to fixed max-h-60 | `components/home-faq.tsx` | Fixed |
| 8  | Autocomplete dropdown overflows viewport with mobile keyboard open | `components/travel-autocomplete.tsx` | Fixed |
| 9  | Bottom nav action links under 44px min touch target size | `components/FloatingActionBar.tsx` | Fixed |

---

## Detailed Issue Descriptions

### 1. Early Bird offer never auto-expires
The `early_bird_deadline` is formatted and shown as text in the banner, but is never compared to today's date anywhere. The banner is shown as long as `settings.earlyBirdEnabled` is true. If the admin forgets to manually toggle it off after the deadline passes, the expired offer remains visible.
* **Fix**: Check `isDeadlinePassed(deadline)` in the banner component. If expired, render `null`.

### 2. `createAdminClient()` defined but completely unused
All admin actions use `createClient()` from `supabase-server.ts` (anon key) instead of the service-role client, relying solely on RLS policies.
* **Fix**: Wire `createAdminClient()` into the 6 admin server actions and remove `await`.

### 3. Hardcoded WhatsApp number duplicated in 5+ places
The phone/WhatsApp number `918826048272` is duplicated across multiple components instead of importing a central constant.

### 4. Side effect during render in FloatingActionBar
Mutates `document.documentElement` styles inside the render body instead of using a `useEffect` hook.

### 5. Duplicated sanitizeSearchTerm()
Identical copies of `sanitizeSearchTerm()` are copy-pasted in both `glass-search.tsx` and `travel-autocomplete.tsx`.

### 6. Bot/automation detection changes real production behavior
Checking `navigator.webdriver` to swap "Book Now" CTA with login modal blocks genuine users using debugging or accessibility tools.
