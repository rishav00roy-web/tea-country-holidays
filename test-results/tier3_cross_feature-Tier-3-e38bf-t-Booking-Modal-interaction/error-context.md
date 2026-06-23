# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier3_cross_feature.spec.ts >> Tier 3: Cross-Feature Interactions >> 3. Mobile viewport + Booking Modal interaction
- Location: tests\tier3_cross_feature.spec.ts:45:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | // ==========================================
  4   | // TIER 3 CROSS FEATURE INTERACTIONS (6 TESTS)
  5   | // ==========================================
  6   | 
  7   | test.describe('Tier 3: Cross-Feature Interactions', () => {
  8   |   test('1. Mobile menu toggle + login navigation', async ({ page }) => {
  9   |     // 1. Start with a mobile viewport
  10  |     await page.setViewportSize({ width: 375, height: 667 });
  11  |     await page.goto('/', { timeout: 60000 });
  12  | 
  13  |     // 2. Open the mobile menu drawer
  14  |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  15  |     await hamburger.dispatchEvent('click');
  16  |     
  17  |     // 3. Locate the Login link inside the mobile drawer and click it
  18  |     const drawerLoginLink = page.locator('.fixed.inset-0.z-40.flex.flex-col a[href="/login"]').first();
  19  |     await expect(drawerLoginLink).toBeVisible();
  20  |     await drawerLoginLink.click();
  21  | 
  22  |     // 4. Verify user is navigated to the /login page
  23  |     await expect(page).toHaveURL(/.*\/login/);
  24  |   });
  25  | 
  26  |   test('2. Auth redirection + load speed / image priority', async ({ page }) => {
  27  |     // 1. Start on desktop homepage
  28  |     await page.setViewportSize({ width: 1200, height: 800 });
  29  |     await page.goto('/', { timeout: 60000 });
  30  | 
  31  |     // 2. Click the login button in the desktop navbar
  32  |     const loginBtn = page.locator('nav a[href="/login"]').first();
  33  |     await loginBtn.dispatchEvent('click');
  34  | 
  35  |     // 3. Verify transition to login page
  36  |     await expect(page).toHaveURL(/.*\/login/);
  37  | 
  38  |     // 4. Verify login page slide show image priority/loading attribute (Cross-feature performance check)
  39  |     const firstImg = page.locator('.auth-right img').first();
  40  |     await expect(firstImg).toBeAttached();
  41  |     const loading = await firstImg.getAttribute('loading');
  42  |     expect(loading).not.toBe('lazy');
  43  |   });
  44  | 
  45  |   test('3. Mobile viewport + Booking Modal interaction', async ({ page }) => {
  46  |     // 1. Start with mobile viewport
  47  |     await page.setViewportSize({ width: 375, height: 667 });
> 48  |     await page.goto('/', { timeout: 60000 });
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  49  | 
  50  |     // 2. Open booking modal using Sticky CTA or another booking button
  51  |     const bookBtn = page.locator('button, a:has-text("Book Now")').first();
  52  |     if (await bookBtn.count() > 0) {
  53  |       await bookBtn.dispatchEvent('click');
  54  |       
  55  |       // 3. Verify modal is displayed and occupies most of viewport width but doesn't cause overflow
  56  |       const modal = page.locator('.fixed.inset-0.z-\\[100\\]');
  57  |       const isModalOpen = await modal.count() > 0 && await modal.isVisible();
  58  |       if (!isModalOpen) {
  59  |         test.skip(true, 'Booking modal integration not yet implemented');
  60  |         return;
  61  |       }
  62  |       await expect(modal).toBeVisible();
  63  | 
  64  |       const width = await page.evaluate(() => document.documentElement.clientWidth);
  65  |       const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  66  |       expect(scrollWidth).toBeLessThanOrEqual(width);
  67  |     }
  68  |   });
  69  | 
  70  |   test('4. Sticky CTA on mobile + WhatsApp integration link', async ({ page }) => {
  71  |     // 1. Mobile viewport
  72  |     await page.setViewportSize({ width: 375, height: 667 });
  73  |     await page.goto('/', { timeout: 60000 });
  74  | 
  75  |     // 2. Check if Sticky CTA is visible
  76  |     const stickyCta = page.locator('div.fixed.bottom-0.left-0.right-0.md\\:hidden');
  77  |     await expect(stickyCta).toBeVisible();
  78  | 
  79  |     // 3. Verify the WhatsApp link inside the Sticky CTA is correct
  80  |     const waLink = stickyCta.locator('a[href*="wa.me"]').first();
  81  |     await expect(waLink).toBeVisible();
  82  |     
  83  |     const href = await waLink.getAttribute('href');
  84  |     expect(href).toContain('918826048272');
  85  |   });
  86  | 
  87  |   test('5. Dark mode toggle + Login page navigation consistency', async ({ page }) => {
  88  |     // 1. Go to main page on desktop
  89  |     await page.setViewportSize({ width: 1200, height: 800 });
  90  |     await page.goto('/', { timeout: 60000 });
  91  | 
  92  |     // 2. Toggle dark mode
  93  |     const darkToggle = page.locator('#darkToggle');
  94  |     await expect(darkToggle).toBeAttached();
  95  |     await darkToggle.dispatchEvent('click');
  96  | 
  97  |     // 3. Verify .dark class is added to body
  98  |     const bodyClass = await page.evaluate(() => document.body.className);
  99  |     expect(bodyClass).toContain('dark');
  100 | 
  101 |     // 4. Navigate to Login Page
  102 |     const loginLink = page.locator('nav a[href="/login"]').first();
  103 |     await loginLink.dispatchEvent('click');
  104 | 
  105 |     // 5. Verify URL is /login
  106 |     await expect(page).toHaveURL(/.*\/login/);
  107 |   });
  108 | 
  109 |   test('6. Cookie Consent + Route Navigation integration (Conditional)', async ({ page }) => {
  110 |     await page.goto('/', { timeout: 60000 });
  111 |     const banner = page.locator('[data-testid="cookie-consent-banner"], .cookie-consent-banner');
  112 |     const exists = await banner.count() > 0;
  113 |     if (!exists) {
  114 |       test.skip(true, 'Cookie Consent Banner is not yet implemented');
  115 |       return;
  116 |     }
  117 | 
  118 |     // Accept cookies
  119 |     const acceptBtn = banner.locator('button:has-text("Accept")');
  120 |     await acceptBtn.click();
  121 | 
  122 |     // Navigate to holidays page
  123 |     await page.goto('/holidays', { timeout: 60000 });
  124 | 
  125 |     // Banner should not be visible on the new page
  126 |     const bannerAfterNav = page.locator('[data-testid="cookie-consent-banner"], .cookie-consent-banner');
  127 |     await expect(bannerAfterNav).not.toBeVisible();
  128 |   });
  129 | });
  130 | 
```