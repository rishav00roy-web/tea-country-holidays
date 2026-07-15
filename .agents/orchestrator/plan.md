# Plan: Performance Optimization and Hero Marquee Bug Fix

This plan details the steps to optimize the Tea Country Holidays Next.js site performance for mobile and desktop, and fix the lagging hero reviews marquee component.

## Milestones

| Milestone | Name | Description | Status |
|-----------|------|-------------|--------|
| M1 | Performance Analysis & Codebase Exploration | Analyze bundle sizes, image assets, rendering performance, and locate marquee lagging/exposure causes. | PLANNED |
| M2 | Marquee Bug Fix | Update reviews marquee to utilize performant CSS (transform, will-change) and prevent green background exposure. | PLANNED |
| M3 | Performance Optimization Implementation | Implement image scaling, lazy loading, font optimization, and eliminate hydration/rendering bottlenecks. | PLANNED |
| M4 | Verification & Audit | Execute Lighthouse Audits for mobile/desktop to verify Performance score >= 90. Run Forensic Auditor checks. | PLANNED |

## Detailed Checklist

### Milestone 1: Performance Analysis & Codebase Exploration
- [ ] Investigate Next.js bundle sizes and chunking using next/bundle-analyzer or webpack configurations.
- [ ] Identify large above-the-fold or card images that lack priority/sizes attributes.
- [ ] Locate the reviews marquee component rendering, its CSS styles, and structural layout.
- [ ] Run a baseline Lighthouse performance audit to measure existing mobile and desktop scores.

### Milestone 2: Marquee Bug Fix
- [ ] Enhance reviews marquee (`components/reviews-marquee.tsx`) animation performance using CSS `transform` and `will-change: transform`.
- [ ] Restructure the marquee container and track to ensure it loops seamlessly without exposing the parent green background (`#013220`).
- [ ] Alternatively, integrate `react-fast-marquee` (already in package.json) for optimal performance and gap-free looping.
- [ ] Verify the fix visually and test for smoothness on touch viewports.

### Milestone 3: Performance Optimization Implementation
- [ ] Optimize images: check that `<Image>` components have correct `sizes` and `quality` props.
- [ ] Fix hydration/rendering bottlenecks in dynamic client components (e.g., dynamic imports with `ssr: false` for client-only components).
- [ ] Ensure CSS animations and transitions are optimized and don't trigger layout thrashing.
- [ ] Verify production build completes successfully (`npm run build`).

### Milestone 4: Verification & Audit
- [ ] Run a Lighthouse performance audit on the built application for both Mobile and Desktop viewports.
- [ ] Confirm Lighthouse Performance score is >= 90 on both viewports.
- [ ] Run Forensic Auditor to guarantee code integrity (no hardcoded metrics, no dummy/facade implementations).
