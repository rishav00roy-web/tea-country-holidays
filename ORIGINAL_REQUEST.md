# Original User Request

## Initial Request — 2026-06-21T21:57:16+05:30

<USER_REQUEST>
Fix the Google OAuth authentication flow, add a "Forgot Password" recovery flow to the login interface, resolve mobile responsiveness issues to make the site fully mobile-friendly, optimize load speed, and add a cookie consent prompt.

Working directory: `C:\Users\User\.gemini\antigravity\scratch\tea-country-holidays`
Integrity mode: development

## Requirements

### R1. Fix Google Sign-In via Migration
Migrate the project's authentication helper from the legacy `@supabase/auth-helpers-nextjs` library to the modern `@supabase/ssr` library to ensure compatibility with Next.js 15/16's asynchronous `cookies()` API. Ensure that the Google OAuth code-exchange callback works properly.

### R2. Implement Forgot Password Recovery Flow
1. Add a "Forgot Password" trigger in the login screen.
2. Implement a flow where users can enter their email to receive a password reset link using Supabase Auth.
3. Create a custom Reset Password page (e.g., at `/login/reset-password`) that accepts the session/token from the redirect, allowing users to enter and save their new password.

### R3. Mobile Responsiveness and Compatibility
Ensure that all pages (Home, Blog, Login, holidays, hotels, events, flights, railways) are fully responsive and look professional on mobile viewports (down to 320px width). Ensure all interactive React components (such as modals, tickers, and sticky buttons) function correctly on touch devices.

### R4. Optimize Load Speed
Analyze and optimize the application's page load speed. This includes optimizing large assets/images, implementing proper Next.js `Image` component scaling/priority, and resolving any render-blocking elements.

### R5. Cookie Consent Banner
Implement a smooth, non-intrusive cookie consent banner that prompts users to allow cookies when they first visit the site, styled consistently with the website's dark/light green theme.

---

## Acceptance Criteria

### Build & Dependencies
- [ ] `@supabase/auth-helpers-nextjs` is removed and `@supabase/ssr` is added to the dependencies in `package.json`.
- [ ] `npm run build` succeeds without any TypeScript, ESLint, or compilation errors.

### Authentication & Recovery
- [ ] The Google Sign-In button calls `@supabase/ssr`'s OAuth sign-in flow.
- [ ] The OAuth callback route in `app/auth/callback/route.ts` is updated to use `@supabase/ssr` client with awaited cookies.
- [ ] A "Forgot Password" link is visible in the login form when in Sign In mode.
- [ ] The password reset flow successfully sends the recovery email and allows resetting the password on the `/login/reset-password` page.

### Mobile & UX
- [ ] No elements cause horizontal page overflow or scrolling on mobile viewports (320px to 480px width).
- [ ] All interactive elements (e.g., `BookingModal`, `StickyCTA`, dropdowns) are usable and performant on mobile screen sizes.

### Performance & Consent
- [ ] Large above-the-fold images use the `priority` attribute in Next.js `Image` components.
- [ ] A functional, styled cookie consent banner appears on first load and can be accepted/dismissed, storing consent in localStorage.
</USER_REQUEST>

## Follow-up — 2026-06-23T13:25:38+05:30

<USER_REQUEST>
# Teamwork Project Prompt — Draft

Implement the Batch 3 final polish pass for the `tea-country-holidays` Next.js application, including route loading skeletons, responsive image sizing/quality optimization, navbar active link indicators, and footer link updates.

Working directory: C:\Users\User\.gemini\antigravity\scratch\tea-country-holidays
Integrity mode: development

## Requirements

### R1. Loading Skeletons for Routes
- Create `app/holidays/loading.tsx` with the specified loading skeleton component.
- Check other routes. If any other route fetches data from Supabase, create a corresponding `loading.tsx` skeleton. Do not create skeletons for routes that do not fetch data from Supabase.

### R2. Image Sizing & Quality Optimizations
- Scan all card components using Next.js `<Image>` (e.g., packages, destinations, blogs, testimonials) and add the appropriate `sizes` property if missing.
- Use `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` for 3-column grid cards.
- Use `sizes="(max-width: 640px) 100vw, 50vw"` for 2-column grid cards.
- Use `sizes="100vw"` for full-width images (e.g., hero, blog post header).
- Lower the quality prop from `80` to `65` on all card images (do not modify hero or blog post header image quality).

### R3. Active Navbar Link
- Use the Next.js `usePathname()` hook in the navbar to get the current route.
- If a nav link matches the current path, apply a visual active state (e.g., `border-b-2 border-[#1B4332] text-[#1B4332] font-semibold` or matching the existing layout style).
- Do not apply active styling to the "Book Now" / CTA button.

### R4. Footer Dead Links
- Update footer links:
  - "Terms & Conditions" should link to `/terms`
  - "Privacy Policy" should link to `/privacy`
  - Remove the "Pay Now" link completely if there is no payment page.
  - Wire or remove any other footer links pointing to `#`.

## Acceptance Criteria

### Build and Compilation
- [ ] The Next.js application compiles and builds successfully via `npm run build`.
- [ ] The application starts and runs cleanly.

### Route Skeletons
- [ ] Visiting `/holidays` triggers the loading skeleton route behavior during data fetching.

### Navbar and Footer
- [ ] Clicking nav links successfully marks them as active (except CTA).
- [ ] Dead footer links are either fixed or removed.

### Image Optimization
- [ ] Card images have `sizes` and `quality={65}` props correctly specified.

### Verification
- [ ] Run and pass all existing E2E tests (`npm run test:e2e`).
</USER_REQUEST>
