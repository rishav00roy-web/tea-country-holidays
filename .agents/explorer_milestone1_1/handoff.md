# E2E Tech Explorer Milestone 1_1 Investigation Report

## 1. Observation

I conducted a thorough, read-only analysis of the `tea-country-holidays` project codebase located at `C:\Users\User\.gemini\antigravity\scratch\tea-country-holidays\`. Below are the direct observations from the project files:

### A. Directory Structure and Pages/Routes
Using the `find_by_name` tool, I mapped out the files in the `app/` directory, revealing the following structure:
*   `/` (Home Page): Configured in `app/page.tsx`.
*   `/login` (Auth Portal / Sign-In & Sign-Up): Configured in `app/login/page.tsx` and `app/login/login-content.tsx`.
*   `/auth/callback` (OAuth & Code Verification Callback Route): Configured in `app/auth/callback/route.ts`.
*   `/holidays` (Holidays Page): Configured in `app/holidays/page.tsx` and `app/holidays/holidays-content.tsx`.
*   `/hotels` (Hotels Page): Configured in `app/hotels/page.tsx` and `app/hotels/hotels-content.tsx`.
*   `/flights` (Flights Page): Configured in `app/flights/page.tsx` and `app/flights/flights-content.tsx`.
*   `/railways` (Railways Page): Configured in `app/railways/page.tsx` and `app/railways/railways-content.tsx`.
*   `/events` (Events Page): Configured in `app/events/page.tsx` and `app/events/events-content.tsx`.
*   `/blog/[slug]` (Dynamic Blog Post Details Page): Configured in `app/blog/[slug]/page.tsx`.

### B. Project Dependencies (`package.json`)
The dependencies configured in `package.json` (lines 11-30) are:
```json
  "dependencies": {
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "@supabase/supabase-js": "^2.108.1",
    "@tailwindcss/typography": "^0.5.20",
    "lucide-react": "^1.17.0",
    "next": "16.2.9",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-fast-marquee": "^1.6.5"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.9",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
```
*   **Observation**: No testing libraries (Jest, Cypress, Playwright, Vitest) are currently listed under `dependencies` or `devDependencies`.
*   **Environment**: Node version is `v24.16.0` and npm version is `11.13.0`.

### C. Authentication Handling
Authentication is currently implemented using the deprecated `@supabase/auth-helpers-nextjs` package:
1.  **Client Components**: `app/login/login-content.tsx` imports and instantiates the client client:
    *   Line 7: `import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";`
    *   Line 64: `const supabase = createClientComponentClient();`
2.  **Auth Gate Hook**: `hooks/use-auth-gate.ts` redirects unauthenticated users seeking quotes:
    *   Line 2: `import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"`
    *   Line 7: `const supabase = createClientComponentClient()`
    *   Lines 11-15:
        ```typescript
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          const redirect = redirectPath || (typeof window !== "undefined" ? window.location.pathname : "/")
          router.push(`/login?redirect=${encodeURIComponent(redirect)}&reason=quote`)
          return
        }
        ```
3.  **Callback Route**: `app/auth/callback/route.ts` exchanges auth codes:
    *   Line 1: `import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";`
    *   Line 10-11:
        ```typescript
        const supabase = createRouteHandlerClient({ cookies });
        await supabase.auth.exchangeCodeForSession(code);
        ```

### D. Element Inspection and Selectors
By inspecting key layout files, I identified selectors for testing page interactions and navigation:
1.  **Login / Registration Page (`app/login/login-content.tsx`)**:
    *   Title: `h2.form-title` (line 452: `"Trusted by Travellers Across India."` or `"Welcome Back"` depending on mode).
    *   Mode toggle: `p.toggle-link span` (lines 530-538).
    *   Full Name field (Sign Up mode only): `input[placeholder="John Doe"]` or `label:has-text("Full Name") + div input` (line 470).
    *   Email input: `input[type="email"]` or `input[placeholder="you@example.com"]` (line 486).
    *   Password input: `input[type="password"]` or `input[placeholder="••••••••"]` (line 501).
    *   Submit Button: `button[type="submit"]` or `.submit-btn` (line 512).
    *   Google Login Button: `button.google-btn` (line 519).
    *   Success message: `div.alert-success` (line 462).
    *   Error message: `div.alert-error` (line 461).
2.  **Navigation and Mobile Layout (`components/navbar.tsx`)**:
    *   Logo: `Link[href="/"] img[alt="Tea Country Holidays"]` (lines 58-62).
    *   Desktop Links: `.hidden.md\\:flex a` (line 76-98).
    *   Desktop Login Button: `Link[href="/login"]` containing text "Login" (lines 131-146).
    *   Desktop Book Now Button: `Link` with text "Book Now" (line 148-151).
    *   Dark Mode Toggle: `input#darkToggle` (line 105).
    *   Mobile Hamburger Menu Button: `button[aria-label="Toggle menu"]` (line 155).
    *   Mobile Drawer Container: `div` containing class `md:hidden` and toggling class `translate-x-0` (open) vs `translate-x-full` (closed) (lines 165-167).
    *   Mobile Links: `a` tags inside the mobile drawer (lines 179-184).
    *   Mobile Login Button: `Link[href="/login"].user-profile` (line 192).
    *   Mobile Dark Mode Toggle: `input#darkToggleMobile` (line 204).
3.  **Planned / Unimplemented Features (`PROJECT.md`)**:
    *   **Password Recovery**: Milestone 2: `"Password Recovery | Implement Forgot Password trigger, Supabase recovery email trigger, and /login/reset-password page. | 1 | PLANNED"` (line 27). No elements or routes currently exist in the codebase.
    *   **Cookie Consent Banner**: Milestone 4: `"Speed & Banner | Optimize above-the-fold Next.js Image component priorities and implement themed Cookie Consent Banner. | None | PLANNED"` (line 29). No cookie elements currently exist.

---

## 2. Logic Chain

1.  **Routes and Page Identification**: Based on the directories inside `app/` containing `page.tsx` or `route.ts` (Observation A), I deduced that the application has standard routes `/`, `/login`, `/auth/callback`, `/holidays`, `/hotels`, `/flights`, `/railways`, `/events`, and `/blog/[slug]`.
2.  **Authentication Implementation Status**: Based on the imports of `@supabase/auth-helpers-nextjs` in `app/login/login-content.tsx`, `hooks/use-auth-gate.ts`, and `app/auth/callback/route.ts` (Observation C), authentication is currently handled using legacy Supabase Next.js helpers. The project's milestones in `PROJECT.md` indicate a planned migration to the modern `@supabase/ssr` package.
3.  **E2E Testing Framework Comparison**:
    *   **Jest**: Excluded because it runs in JSDOM (Node environment) and cannot test real browser behaviors, layouts, visual viewports, or cross-domain redirects (such as Google OAuth flow).
    *   **Cypress**: Excluded because it runs inside the browser sandbox, which complicates multi-domain navigation and makes testing OAuth callback redirects (like Google to Supabase callbacks) flaky and slow.
    *   **Custom Node.js Runner**: Excluded because it would require building a custom browser automation, assertion, and reporting layer from scratch, adding unnecessary overhead.
    *   **Playwright**: Selected as the best testing framework. Next.js natively recommends Playwright for E2E testing. It runs out-of-process, has robust multi-tab and multi-origin redirect handling, automatically waits for elements (reducing flakiness), offers native mobile viewport emulation (touch events), and integrates cleanly with Node.js and TypeScript.
4.  **Selecting Elements for Tests**: Based on the HTML markup in `login-content.tsx` and `navbar.tsx` (Observation D), E2E selectors can be derived directly from unique classes, HTML input attributes (`type="email"`, `type="password"`), and ARIA labels.
5.  **Handling Unimplemented Features (Forgot Password, Cookie Consent)**: Since these features are planned but do not yet exist in the codebase (Observation D3), the E2E tests cannot select active elements. To ensure tests are resilient and developers can easily build them, I recommend establishing a strict contract using specific `data-testid` attributes.

---

## 3. Caveats

*   **Under-Development States**: The "Forgot Password" recovery flow (Milestone 2) and the "Cookie Consent Banner" (Milestone 4) are marked as `PLANNED` and are not yet written. Thus, selectors for these features are recommended specifications for future implementation rather than existing selectors.
*   **Network Isolation**: In `CODE_ONLY` network mode, the test suite and dependencies cannot be downloaded or initialized live. The recommended setup instructions must be executed on a machine with internet access.

---

## 4. Conclusion

### A. Recommended E2E Testing Framework
**Playwright** is recommended as the E2E testing framework. It is modern, stable, has built-in typescript support, and seamlessly handles the Supabase/Google authentication callback redirects across different origins.

### B. Suggested Selectors Map

| Component / Target | Recommended Playwright Selector | Notes |
|---|---|---|
| **Login Input: Email** | `locator('input[type="email"]')` | Targets the login/register email field |
| **Login Input: Password** | `locator('input[type="password"]')` | Targets the login/register password field |
| **Login Input: Full Name** | `locator('input[placeholder="John Doe"]')` | Visible only in Sign Up mode |
| **Login Submit Button** | `locator('button[type="submit"]')` | Performs sign-in or sign-up action |
| **Google Login Button** | `locator('button.google-btn')` | Initiates OAuth flow |
| **Auth Toggle Link** | `locator('p.toggle-link span')` | Switches between Sign-In and Sign-Up modes |
| **Auth Success Message** | `locator('div.alert-success')` | Displays successful registration/redirect messages |
| **Auth Error Message** | `locator('div.alert-error')` | Displays login or registration errors |
| **Desktop Login Link** | `locator('nav a[href="/login"]').first()` | Navigation bar login trigger |
| **Mobile Menu Button** | `locator('button[aria-label="Toggle menu"]')` | Toggles the mobile navigation drawer |
| **Mobile Drawer Container**| `locator('div.fixed.inset-0.z-40')` | Container for mobile menu navigation links |
| **Mobile Login Link** | `locator('a[href="/login"].user-profile')` | Login trigger inside the mobile drawer |
| **Mobile Theme Toggle** | `locator('input#darkToggleMobile')` | Toggles dark mode inside the mobile drawer |
| **Forgot Password Link*** | `locator('[data-testid="forgot-password-link"]')` | *Recommended contract selector for Milestone 2* |
| **Reset Password Input*** | `locator('input[name="new-password"]')` | *Recommended contract selector for `/login/reset-password`* |
| **Cookie Banner Container***| `locator('[data-testid="cookie-consent-banner"]')` | *Recommended contract selector for Milestone 4* |
| **Cookie Accept Button*** | `locator('[data-testid="cookie-accept-btn"]')` | *Recommended contract selector for Cookie Banner* |

### C. Recommended Installation and Setup Steps

1.  **Initialize Playwright in the project**:
    ```bash
    npm init playwright@latest -- --yes --typescript --hooks --dir=tests
    ```
    This initializes TypeScript configuration and creates the `tests/` folder at the project root.

2.  **Add Test Commands to `package.json`**:
    Under the `"scripts"` block in `package.json`, add:
    ```json
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
    ```

3.  **Write `playwright.config.ts` in the project root**:
    ```typescript
    import { defineConfig, devices } from '@playwright/test';

    export default defineConfig({
      testDir: './tests',
      fullyParallel: true,
      forbidOnly: !!process.env.CI,
      retries: process.env.CI ? 2 : 0,
      workers: process.env.CI ? 1 : undefined,
      reporter: 'html',
      use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
      },
      projects: [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] },
        },
        {
          name: 'webkit',
          use: { ...devices['Desktop Safari'] },
        },
        {
          name: 'Mobile Chrome',
          use: { ...devices['Pixel 5'] },
        },
        {
          name: 'Mobile Safari',
          use: { ...devices['iPhone 12'] },
        },
      ],
      webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        stdout: 'ignore',
        stderr: 'pipe',
      },
    });
    ```

4.  **Create Boilerplate E2E Test (`tests/auth.spec.ts`)**:
    ```typescript
    import { test, expect } from '@playwright/test';

    test.describe('Authentication and Navigation Flows', () => {
      test('should render home page and navigate to login', async ({ page }) => {
        await page.goto('/');
        
        // Assert title and brand
        await expect(page).toHaveTitle(/TeaCountryHolidays/);
        
        // Navigate to login
        const loginLink = page.locator('nav a[href="/login"]').first();
        await expect(loginLink).toBeVisible();
        await loginLink.click();
        
        // Assert login page URL and components
        await expect(page).toHaveURL(/\/login/);
        await expect(page.locator('h2.form-title')).toBeVisible();
      });

      test('should toggle between login and signup modes', async ({ page }) => {
        await page.goto('/login');
        
        // Toggle to Sign In (defaults to signup mode)
        const toggleLink = page.locator('p.toggle-link span');
        await toggleLink.click();
        await expect(page.locator('h2.form-title')).toContainText('Welcome Back');
        
        // Toggle back to Sign Up
        await toggleLink.click();
        await expect(page.locator('h2.form-title')).toContainText('Trusted by Travellers');
      });

      test('should display errors for invalid login submissions', async ({ page }) => {
        await page.goto('/login');
        
        // Toggle to Sign In mode
        await page.locator('p.toggle-link span').click();
        
        // Fill form
        await page.locator('input[type="email"]').fill('nonexistent@user.com');
        await page.locator('input[type="password"]').fill('invalidpassword');
        
        // Submit
        await page.locator('button[type="submit"]').click();
        
        // Wait for error notice (mock or live)
        const errorAlert = page.locator('div.alert-error');
        await expect(errorAlert).toBeVisible();
      });
      
      test('should emulate mobile menu and display navigation items', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'This test is only relevant for mobile viewports');
        
        await page.goto('/');
        
        // Hamburger menu button should be visible
        const hamburgerBtn = page.locator('button[aria-label="Toggle menu"]');
        await expect(hamburgerBtn).toBeVisible();
        
        // Open drawer
        await hamburgerBtn.click();
        
        // Verify mobile login link is visible in mobile drawer
        const mobileLogin = page.locator('a[href="/login"].user-profile');
        await expect(mobileLogin).toBeVisible();
      });
    });
    ```

---

## 5. Verification Method

To independently verify the test infrastructure:

1.  **Install Playwright packages**:
    ```bash
    npm install --save-dev @playwright/test
    npx playwright install chromium
    ```
2.  **Execute the E2E suite**:
    Start the local Next.js server first or rely on the Playwright WebServer integration, then run:
    ```bash
    npx playwright test
    ```
3.  **Invalidation conditions**:
    *   If Cypress or Jest dependencies are committed to `package.json` under E2E testing targets, this invalidates the Playwright recommendation.
    *   If element selectors on the login component are changed (e.g. changing `.form-input` or `.submit-btn` class names) without updating the test cases, the E2E tests will fail.
