# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier1_feature_coverage.spec.ts >> Tier 1: Supabase SSR Auth - Sign Up / Sign In UI >> 6. Auth: Email Address input is visible in Sign Up mode
- Location: tests\tier1_feature_coverage.spec.ts:40:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
Call log:
  - navigating to "http://localhost:3000/login", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | // ==========================================
  4   | // TIER 1 FEATURE COVERAGE (30 TESTS)
  5   | // ==========================================
  6   | 
  7   | test.describe('Tier 1: Supabase SSR Auth - Sign Up / Sign In UI', () => {
  8   |   test('1. Login page has correct title pattern', async ({ page }) => {
  9   |     await page.goto('/login', { timeout: 60000 });
  10  |     await expect(page).toHaveTitle(/Tea/i);
  11  |   });
  12  | 
  13  |   test('2. Login page has back-to-home link', async ({ page }) => {
  14  |     await page.goto('/login', { timeout: 60000 });
  15  |     const backLink = page.locator('a.brand-link');
  16  |     await expect(backLink).toBeVisible();
  17  |     await expect(backLink).toHaveText(/Back to Tea Country Holidays/i);
  18  |   });
  19  | 
  20  |   test('3. Auth: Sign up form title exists', async ({ page }) => {
  21  |     await page.goto('/login', { timeout: 60000 });
  22  |     const title = page.locator('h2.form-title');
  23  |     await expect(title).toBeVisible();
  24  |     await expect(title).toHaveText(/Trusted by Travellers/i);
  25  |   });
  26  | 
  27  |   test('4. Auth: Sign up form description exists', async ({ page }) => {
  28  |     await page.goto('/login', { timeout: 60000 });
  29  |     const desc = page.locator('p.form-subtitle');
  30  |     await expect(desc).toBeVisible();
  31  |     await expect(desc).toHaveText(/Create a free account/i);
  32  |   });
  33  | 
  34  |   test('5. Auth: Full Name input is visible in Sign Up mode', async ({ page }) => {
  35  |     await page.goto('/login', { timeout: 60000 });
  36  |     const nameInput = page.locator('input[placeholder="John Doe"]');
  37  |     await expect(nameInput).toBeVisible();
  38  |   });
  39  | 
  40  |   test('6. Auth: Email Address input is visible in Sign Up mode', async ({ page }) => {
> 41  |     await page.goto('/login', { timeout: 60000 });
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
  42  |     const emailInput = page.locator('input[placeholder="you@example.com"]');
  43  |     await expect(emailInput).toBeVisible();
  44  |   });
  45  | 
  46  |   test('7. Auth: Password input is visible in Sign Up mode', async ({ page }) => {
  47  |     await page.goto('/login', { timeout: 60000 });
  48  |     const passwordInput = page.locator('input[placeholder="••••••••"]');
  49  |     await expect(passwordInput).toBeVisible();
  50  |   });
  51  | 
  52  |   test('8. Auth: Sign Up submit button exists', async ({ page }) => {
  53  |     await page.goto('/login', { timeout: 60000 });
  54  |     const submitBtn = page.locator('button.submit-btn');
  55  |     await expect(submitBtn).toBeVisible();
  56  |     await expect(submitBtn).toHaveText(/Sign Up/i);
  57  |   });
  58  | 
  59  |   test('9. Auth: Google OAuth button exists', async ({ page }) => {
  60  |     await page.goto('/login', { timeout: 60000 });
  61  |     const googleBtn = page.locator('button.google-btn');
  62  |     await expect(googleBtn).toBeVisible();
  63  |     await expect(googleBtn).toContainText(/Continue with Google/i);
  64  |   });
  65  | 
  66  |   test('10. Auth: Switch to Sign In toggle text exists', async ({ page }) => {
  67  |     await page.goto('/login', { timeout: 60000 });
  68  |     const toggleLink = page.locator('p.toggle-link span');
  69  |     await expect(toggleLink).toBeVisible();
  70  |     await expect(toggleLink).toHaveText(/Already have an account\? Sign in/i);
  71  |   });
  72  | 
  73  |   test('11. Auth: Toggling to Sign In hides Full Name input', async ({ page }) => {
  74  |     await page.goto('/login', { timeout: 60000 });
  75  |     const toggleLink = page.locator('p.toggle-link span');
  76  |     await toggleLink.click();
  77  |     const nameInput = page.locator('input[placeholder="John Doe"]');
  78  |     await expect(nameInput).not.toBeVisible();
  79  |   });
  80  | 
  81  |   test('12. Auth: Toggling to Sign In updates submit button text', async ({ page }) => {
  82  |     await page.goto('/login', { timeout: 60000 });
  83  |     const toggleLink = page.locator('p.toggle-link span');
  84  |     await toggleLink.click();
  85  |     const submitBtn = page.locator('button.submit-btn');
  86  |     await expect(submitBtn).toHaveText(/Sign In/i);
  87  |   });
  88  | 
  89  |   test('13. Auth: Toggling back to Sign Up shows Full Name input again', async ({ page }) => {
  90  |     await page.goto('/login', { timeout: 60000 });
  91  |     const toggleLink = page.locator('p.toggle-link span');
  92  |     // Go to sign in
  93  |     await toggleLink.click();
  94  |     // Go back to sign up
  95  |     await toggleLink.click();
  96  |     const nameInput = page.locator('input[placeholder="John Doe"]');
  97  |     await expect(nameInput).toBeVisible();
  98  |   });
  99  | });
  100 | 
  101 | test.describe('Tier 1: Mobile Responsiveness & Layout', () => {
  102 |   test('14. Mobile: Main navbar links are hidden on small viewport', async ({ page }) => {
  103 |     await page.setViewportSize({ width: 375, height: 667 });
  104 |     await page.goto('/', { timeout: 60000 });
  105 |     const desktopLinks = page.locator('.hidden.md\\:flex.items-center.gap-7');
  106 |     await expect(desktopLinks).not.toBeVisible();
  107 |   });
  108 | 
  109 |   test('15. Mobile: Hamburger button is visible on small viewport', async ({ page }) => {
  110 |     await page.setViewportSize({ width: 375, height: 667 });
  111 |     await page.goto('/', { timeout: 60000 });
  112 |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  113 |     await expect(hamburger).toBeVisible();
  114 |   });
  115 | 
  116 |   test('16. Desktop: Main navbar links are visible on large viewport', async ({ page }) => {
  117 |     await page.setViewportSize({ width: 1200, height: 800 });
  118 |     await page.goto('/', { timeout: 60000 });
  119 |     // Ensure at least one navbar link is visible
  120 |     const firstLink = page.locator('nav a:has-text("Holidays")').first();
  121 |     await expect(firstLink).toBeVisible();
  122 |   });
  123 | 
  124 |   test('17. Desktop: Hamburger button is hidden on large viewport', async ({ page }) => {
  125 |     await page.setViewportSize({ width: 1200, height: 800 });
  126 |     await page.goto('/', { timeout: 60000 });
  127 |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  128 |     await expect(hamburger).not.toBeVisible();
  129 |   });
  130 | 
  131 |   test('18. Mobile: Sticky CTA is visible on mobile viewport', async ({ page }) => {
  132 |     await page.setViewportSize({ width: 375, height: 667 });
  133 |     await page.goto('/', { timeout: 60000 });
  134 |     const stickyCta = page.locator('div.fixed.bottom-0.left-0.right-0.md\\:hidden');
  135 |     await expect(stickyCta).toBeVisible();
  136 |   });
  137 | 
  138 |   test('19. Desktop: Sticky CTA is hidden on desktop viewport', async ({ page }) => {
  139 |     await page.setViewportSize({ width: 1200, height: 800 });
  140 |     await page.goto('/', { timeout: 60000 });
  141 |     const stickyCta = page.locator('div.fixed.bottom-0.left-0.right-0.md\\:hidden');
```