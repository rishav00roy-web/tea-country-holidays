# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier4_real_world.spec.ts >> Tier 4: Real-World User Journeys >> 4. Desktop Booking Funnel and Testimonial Review
- Location: tests\tier4_real_world.spec.ts:93:7

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
  4   | // TIER 4 REAL WORLD JOURNEYS (5 TESTS)
  5   | // ==========================================
  6   | 
  7   | test.describe('Tier 4: Real-World User Journeys', () => {
  8   |   test('1. User Registration Journey (Sign Up)', async ({ page }) => {
  9   |     // 1. User lands on homepage
  10  |     await page.goto('/');
  11  |     
  12  |     // 2. Navigates to Login/Signup page
  13  |     const loginBtn = page.locator('nav a[href="/login"]').first();
  14  |     await loginBtn.click();
  15  |     await expect(page).toHaveURL(/.*\/login/);
  16  | 
  17  |     // 3. User is in Sign Up mode by default. Fills registration details.
  18  |     const nameInput = page.locator('input[placeholder="John Doe"]');
  19  |     const emailInput = page.locator('input[placeholder="you@example.com"]');
  20  |     const passwordInput = page.locator('input[placeholder="••••••••"]');
  21  |     const submitBtn = page.locator('button.submit-btn');
  22  | 
  23  |     const uniqueEmail = `testuser_${Date.now()}@example.com`;
  24  |     await nameInput.fill('Jane Tester');
  25  |     await emailInput.fill(uniqueEmail);
  26  |     await passwordInput.fill('ValidPassword123');
  27  | 
  28  |     // 4. Submit form
  29  |     await submitBtn.click();
  30  | 
  31  |     // 5. Verify outcome: either a success message or an error message (from real Supabase backend if offline/unconfigured)
  32  |     // Both are acceptable E2E validation states as they prove the code path was fully executed.
  33  |     const alert = page.locator('.alert-message');
  34  |     await expect(alert).toBeVisible();
  35  |     const text = await alert.innerText();
  36  |     expect(text.length).toBeGreaterThan(0);
  37  |   });
  38  | 
  39  |   test('2. User Login Journey with Invalid Credentials', async ({ page }) => {
  40  |     // 1. Go to Login page
  41  |     await page.goto('/login');
  42  | 
  43  |     // 2. Toggle to Sign In mode
  44  |     const toggleLink = page.locator('p.toggle-link span');
  45  |     await toggleLink.click();
  46  | 
  47  |     // 3. Enter wrong login credentials
  48  |     const emailInput = page.locator('input[placeholder="you@example.com"]');
  49  |     const passwordInput = page.locator('input[placeholder="••••••••"]');
  50  |     const submitBtn = page.locator('button.submit-btn');
  51  | 
  52  |     await emailInput.fill('nonexistent_user_12345@example.com');
  53  |     await passwordInput.fill('wrongpassword123');
  54  | 
  55  |     // 4. Submit form
  56  |     await submitBtn.click();
  57  | 
  58  |     // 5. Expect an error alert to show up (e.g. invalid login credentials)
  59  |     const alertError = page.locator('.alert-error');
  60  |     await expect(alertError).toBeVisible();
  61  |     const text = await alertError.innerText();
  62  |     expect(text).toMatch(/(invalid|error|credentials|failed)/i);
  63  |   });
  64  | 
  65  |   test('3. Mobile Exploration and WhatsApp Redirect Journey', async ({ page }) => {
  66  |     // 1. Mobile viewport simulation
  67  |     await page.setViewportSize({ width: 360, height: 740 });
  68  |     await page.goto('/');
  69  | 
  70  |     // 2. Verify page logo is visible and navbar links are hidden
  71  |     const logo = page.locator('nav img[alt="Tea Country Holidays"]').first();
  72  |     await expect(logo).toBeVisible();
  73  | 
  74  |     // 3. Open mobile drawer and navigate to Holidays
  75  |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  76  |     await hamburger.click({ force: true });
  77  |     
  78  |     const holidayLink = page.locator('.fixed.inset-0.z-40.flex.flex-col a[href="/holidays"]').first();
  79  |     await holidayLink.click();
  80  |     await expect(page).toHaveURL(/.*\/holidays/);
  81  | 
  82  |     // 4. Check if Sticky CTA is present on the Holidays subpage
  83  |     const stickyCta = page.locator('div.fixed.bottom-0.left-0.right-0.md\\:hidden');
  84  |     await expect(stickyCta).toBeVisible();
  85  | 
  86  |     // 5. Verify the WhatsApp link exists and contains correct number
  87  |     const waLink = stickyCta.locator('a[href*="wa.me"]').first();
  88  |     await expect(waLink).toBeVisible();
  89  |     const href = await waLink.getAttribute('href');
  90  |     expect(href).toContain('918826048272');
  91  |   });
  92  | 
  93  |   test('4. Desktop Booking Funnel and Testimonial Review', async ({ page }) => {
  94  |     // 1. Desktop viewport simulation
  95  |     await page.setViewportSize({ width: 1280, height: 800 });
> 96  |     await page.goto('/');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  97  | 
  98  |     // 2. Click Booking CTA on desktop navbar
  99  |     const bookBtn = page.locator('nav a:has-text("Book Now")').first();
  100 |     await bookBtn.click();
  101 | 
  102 |     // 3. Verify modal appears
  103 |     const modal = page.locator('.fixed.inset-0.z-\\[100\\]');
  104 |     await expect(modal).toBeVisible();
  105 | 
  106 |     // 4. Close the modal
  107 |     const closeBtn = modal.locator('button').first();
  108 |     await closeBtn.click();
  109 |     await expect(modal).not.toBeVisible();
  110 | 
  111 |     // 5. Scroll to review/testimonial section and check its presence
  112 |     const reviews = page.locator('section, div:has-text("Testimonials"), div:has-text("Reviews")').first();
  113 |     await expect(reviews).toBeAttached();
  114 |   });
  115 | 
  116 |   test('5. Session Cookie and Recovery Flow (Conditional)', async ({ page }) => {
  117 |     // 1. Visit reset password page path directly
  118 |     await page.goto('/login/reset-password');
  119 |     
  120 |     // 2. Check if reset password elements exist. If not, skip.
  121 |     const resetForm = page.locator('[data-testid="reset-password-form"], form:has-text("Reset"), form:has-text("Password")');
  122 |     const exists = await resetForm.count() > 0;
  123 |     if (!exists) {
  124 |       test.skip(true, 'Password Recovery page is not yet implemented');
  125 |       return;
  126 |     }
  127 | 
  128 |     // 3. Attempt reset password submission
  129 |     const passInput = resetForm.locator('input[type="password"]').first();
  130 |     const submitBtn = resetForm.locator('button[type="submit"]');
  131 |     
  132 |     await passInput.fill('newsecurepassword123');
  133 |     await submitBtn.click();
  134 | 
  135 |     // 4. Verify outcome (e.g. redirect to login or error banner due to missing token)
  136 |     const alert = page.locator('.alert-message');
  137 |     await expect(alert).toBeVisible();
  138 |   });
  139 | });
  140 | 
```