# Plan: Mobile Floating Action Bar Implementation

This document details the milestones and implementation plan for adding a floating iOS-style quick action bar to the mobile site view.

## Architecture & Code Layout
- **Target Component**: `components/FloatingActionBar.tsx` (new component)
- **Layout Integration**: `app/layout.tsx` (persistent across pages, excluding `/admin` routes)
- **Duplicate CTAs**:
  - `components/whatsapp-button.tsx` (to be removed from layout/delete)
  - `components/sticky-cta.tsx` (to be removed from layout/delete)
- **Dependencies**: `lucide-react`, `react-icons` (check package.json and install missing)

## Milestones

| Milestone | Name | Description | Status |
|-----------|------|-------------|--------|
| M1 | Package & Setup | Check `package.json` for `lucide-react` and `react-icons` and install whichever is missing. | PLANNED |
| M2 | Component Creation | Create `components/FloatingActionBar.tsx` with iOS pill style layout, home (`/`), packages (`/holidays`), WhatsApp, and Phone links. | PLANNED |
| M3 | Layout Integration | Render `<FloatingActionBar />` in `app/layout.tsx` but exclude on `/admin` routes. | PLANNED |
| M4 | Remove Duplicate CTAs | Remove `StickyCTA` and `WhatsAppButton` from `app/layout.tsx` and delete components. | PLANNED |
| M5 | Verification & Audit | Perform build, check responsiveness, active path state, and run forensic integrity audit. | PLANNED |

## Detailed Checklist

### Milestone 1: Package & Setup
- [ ] Inspect package.json for `lucide-react` and `react-icons`.
- [ ] Install missing packages if any (`npm install <package>`).

### Milestone 2: Create Floating Action Bar Component
- [ ] Define FloatingActionBar component layout and design:
  - Rounded pill style centered at bottom of viewport.
  - Position: fixed, bottom (e.g. `bottom-4` or similar), left/right centered, `z-50`, `md:hidden` (only visible on mobile).
  - Use `env(safe-area-inset-bottom)` to adjust bottom padding for iOS notches/home indicators.
  - Buttons:
    - **Home**: link to `/`, active when route is `/`, color gold (`#e8b84b`) when active.
    - **Packages**: link to `/holidays`, active when route is `/holidays`, color gold (`#e8b84b`) when active.
    - **WhatsApp**: link to `https://wa.me/918826048272?text=...`, styled as an elevated bubble with pulsing ring.
    - **Call**: link to `tel:+918826048272`.
- [ ] Restore missing `<a>` tag structures and fix syntax errors in code layout.

### Milestone 3: Layout Integration & Exclusions
- [ ] Edit `app/layout.tsx` to import and render `<FloatingActionBar />`.
- [ ] Implement conditional rendering or route check in `<FloatingActionBar />` or `app/layout.tsx` so it does not render on routes starting with `/admin`.
  - Use `usePathname()` to check if route starts with `/admin`.

### Milestone 4: Remove Duplicate CTAs
- [ ] Remove `<StickyCTA />` and `<WhatsAppButton />` from `app/layout.tsx`.
- [ ] Delete or keep components but clean imports. Removing is safer to avoid confusion.

### Milestone 5: Verification & Audit
- [ ] Run `npm run build` to verify there are no compilation or TypeScript errors.
- [ ] Run E2E tests (`npm run test:e2e`).
- [ ] Verify using auditor and challenger subagents.
