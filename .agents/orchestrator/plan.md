# Plan: Batch 3 Final Polish Pass

This document details the milestones and implementation plan for Batch 3 final polish pass.

## Architecture & Code Layout
- **Routes**: `app/holidays/`, `app/hotels/`, `app/events/`, `app/flights/`, `app/railways/`, `app/blog/`, `app/login/`, `app/`
- **Components**: `components/Navbar.tsx`, `components/Footer.tsx`, card components using `<Image>` (destinations, packages, testimonials, blog cards)

## Milestones

| Milestone | Name | Description | Status |
|-----------|------|-------------|--------|
| M1 | Route Loading Skeletons | Create `app/holidays/loading.tsx` and identify/create skeletons for other Supabase-connected routes. | PLANNED |
| M2 | Image Optimizations | Scan card components using `<Image>` and add `sizes` (2-column/3-column/100vw). Set quality to 65 for card images. | PLANNED |
| M3 | Navbar Active Link | Detect route via `usePathname()`, apply visual active styling to active links (excluding CTA). | PLANNED |
| M4 | Footer Dead Links | Update Terms & Conditions, Privacy Policy links, remove "Pay Now", wire/remove dead '#' links. | PLANNED |
| M5 | Verification & Audit | Run all E2E tests, execute Forensic Auditor checks, verify layout and compliance. | PLANNED |

## Detailed Checklist

### Milestone 1: Route Loading Skeletons
- [ ] Inspect pages (`app/hotels/page.tsx`, `app/events/page.tsx`, `app/flights/page.tsx`, `app/railways/page.tsx`, `app/page.tsx`, etc.) to see if they fetch from Supabase.
- [ ] Create `app/holidays/loading.tsx` if missing or ensure it has correct skeleton UI.
- [ ] For each route fetching data from Supabase, create a corresponding `loading.tsx` skeleton.

### Milestone 2: Responsive Image Sizing & Quality Optimizations
- [ ] Identify all cards using Next.js `<Image>` (e.g., packages, destinations, blogs, testimonials).
- [ ] Add `sizes` prop to cards:
  - 3-column grid cards: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`
  - 2-column grid cards: `sizes="(max-width: 640px) 100vw, 50vw"`
  - Full-width images: `sizes="100vw"`
- [ ] Set `quality={65}` for card images (do not modify hero or blog post header quality).

### Milestone 3: Active Navbar Link
- [ ] Edit the navbar component (likely `components/Navbar.tsx` or similar).
- [ ] Retrieve current path using `usePathname()` from `next/navigation`.
- [ ] Style active links with active class (e.g., `border-b-2 border-[#1B4332] text-[#1B4332] font-semibold`).
- [ ] Do not apply active styling to CTA buttons.

### Milestone 4: Footer Dead Links
- [ ] Update Terms & Conditions footer link to `/terms`.
- [ ] Update Privacy Policy footer link to `/privacy`.
- [ ] Remove "Pay Now" link completely.
- [ ] Remove or wire any other `#` footer links.

### Milestone 5: Verification & Audit
- [ ] Run `npm run test:e2e` to verify E2E test suite passes.
- [ ] Run forensic audit verification checks.
