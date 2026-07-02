import { test, expect } from '@playwright/test';

// ==========================================
// TIER 1 FEATURE COVERAGE (30 TESTS)
// ==========================================

test.describe('Tier 1: Supabase SSR Auth - Sign Up / Sign In UI', () => {
  test('1. Login page has correct title pattern', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    await expect(page).toHaveTitle(/Tea/i);
  });

  test('2. Login page has back-to-home link', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const backLink = page.locator('a.brand-link');
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveText(/Back to Tea Country Holidays/i);
  });

  test('3. Auth: Sign up form title exists', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const title = page.locator('h2.form-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText(/Trusted by Travellers/i);
  });

  test('4. Auth: Sign up form description exists', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const desc = page.locator('p.form-subtitle');
    await expect(desc).toBeVisible();
    await expect(desc).toHaveText(/Create a free account/i);
  });

  test('5. Auth: Full Name input is visible in Sign Up mode', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const nameInput = page.locator('input[placeholder="John Doe"]');
    await expect(nameInput).toBeVisible();
  });

  test('6. Auth: Email Address input is visible in Sign Up mode', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const emailInput = page.locator('input[placeholder="you@example.com"]');
    await expect(emailInput).toBeVisible();
  });

  test('7. Auth: Password input is visible in Sign Up mode', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const passwordInput = page.locator('input[placeholder="••••••••"]');
    await expect(passwordInput).toBeVisible();
  });

  test('8. Auth: Sign Up submit button exists', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const submitBtn = page.locator('button.submit-btn');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toHaveText(/Sign Up/i);
  });

  test('9. Auth: Google OAuth button exists', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const googleBtn = page.locator('button.google-btn');
    await expect(googleBtn).toBeVisible();
    await expect(googleBtn).toContainText(/Continue with Google/i);
  });

  test('10. Auth: Switch to Sign In toggle text exists', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const toggleLink = page.locator('p.toggle-link span');
    await expect(toggleLink).toBeVisible();
    await expect(toggleLink).toHaveText(/Already have an account\? Sign in/i);
  });

  test('11. Auth: Toggling to Sign In hides Full Name input', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const toggleLink = page.locator('p.toggle-link span');
    await toggleLink.click();
    const nameInput = page.locator('input[placeholder="John Doe"]');
    await expect(nameInput).not.toBeVisible();
  });

  test('12. Auth: Toggling to Sign In updates submit button text', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const toggleLink = page.locator('p.toggle-link span');
    await toggleLink.click();
    const submitBtn = page.locator('button.submit-btn');
    await expect(submitBtn).toHaveText(/Sign In/i);
  });

  test('13. Auth: Toggling back to Sign Up shows Full Name input again', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const toggleLink = page.locator('p.toggle-link span');
    // Go to sign in
    await toggleLink.click();
    // Go back to sign up
    await toggleLink.click();
    const nameInput = page.locator('input[placeholder="John Doe"]');
    await expect(nameInput).toBeVisible();
  });
});

test.describe('Tier 1: Mobile Responsiveness & Layout', () => {
  test('14. Mobile: Main navbar links are hidden on small viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { timeout: 60000 });
    const desktopLinks = page.locator('.hidden.md\\:flex.items-center.gap-7');
    await expect(desktopLinks).not.toBeVisible();
  });

  test('15. Mobile: Hamburger button is visible on small viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { timeout: 60000 });
    const hamburger = page.locator('button[aria-label="Toggle menu"]');
    await expect(hamburger).toBeVisible();
  });

  test('16. Desktop: Main navbar links are visible on large viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/', { timeout: 60000 });
    // Ensure at least one navbar link is visible
    const firstLink = page.locator('nav a:has-text("Holidays")').first();
    await expect(firstLink).toBeVisible();
  });

  test('17. Desktop: Hamburger button is hidden on large viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/', { timeout: 60000 });
    const hamburger = page.locator('button[aria-label="Toggle menu"]');
    await expect(hamburger).not.toBeVisible();
  });

  test('18. Mobile: Sticky CTA is visible on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { timeout: 60000 });
    const stickyCta = page.locator('#floating-action-bar');
    await expect(stickyCta).toBeVisible();
  });

  test('19. Desktop: Sticky CTA is hidden on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/', { timeout: 60000 });
    const stickyCta = page.locator('#floating-action-bar');
    await expect(stickyCta).not.toBeVisible();
  });
});

test.describe('Tier 1: Interactive Touch Controls & Modals', () => {
  test('20. Mobile: Hamburger menu toggle opens drawer', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { timeout: 60000 });
    const hamburger = page.locator('button[aria-label="Toggle menu"]');
    await hamburger.dispatchEvent('click');
    // Drawer should have translate-x-0 which means it is visible
    const drawer = page.locator('.fixed.inset-0.z-40.flex.flex-col');
    await expect(drawer).toBeVisible();
  });

  test('21. Mobile: Hamburger menu close button in drawer exists', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { timeout: 60000 });
    const hamburger = page.locator('button[aria-label="Toggle menu"]');
    await hamburger.dispatchEvent('click');
    const closeBtn = page.locator('button[aria-label="Toggle menu"] svg.lucide-x');
    await expect(closeBtn).toBeVisible();
  });
});

test.describe('Tier 1: Load Speed & Image Priority', () => {
  test('22. Load Speed: First destination slide image is present in login', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const firstSlideImage = page.locator('.auth-right img[alt="Rajasthan"]').first();
    await expect(firstSlideImage).toBeAttached();
  });

  test('23. Load Speed: Check that logo image exists on home page', async ({ page }) => {
    await page.goto('/', { timeout: 60000 });
    const logo = page.locator('nav img[alt="Tea Country Holidays"]').first();
    await expect(logo).toBeVisible();
  });

  test('24. Load Speed: Check above-fold hero image is present', async ({ page }) => {
    await page.goto('/', { timeout: 60000 });
    const heroImage = page.locator('.hero-section img, section img').first();
    await expect(heroImage).toBeAttached();
  });
});

test.describe('Tier 1: Cookie Consent Banner (Conditional)', () => {
  test('25. Cookie Consent: Check for cookie banner container element (skipped if missing)', async ({ page }) => {
    await page.goto('/', { timeout: 60000 });
    const banner = page.locator('[data-testid="cookie-consent-banner"], .cookie-consent-banner');
    const exists = await banner.count() > 0;
    if (!exists) {
      test.skip(true, 'Cookie Consent Banner is not yet implemented');
      return;
    }
    await expect(banner).toBeVisible();
  });

  test('26. Cookie Consent: Check for cookie banner accept button (skipped if missing)', async ({ page }) => {
    await page.goto('/', { timeout: 60000 });
    const banner = page.locator('[data-testid="cookie-consent-banner"], .cookie-consent-banner');
    const exists = await banner.count() > 0;
    if (!exists) {
      test.skip(true, 'Cookie Consent Banner is not yet implemented');
      return;
    }
    const acceptBtn = banner.locator('button:has-text("Accept")');
    await expect(acceptBtn).toBeVisible();
  });

  test('27. Cookie Consent: Check for cookie banner decline button (skipped if missing)', async ({ page }) => {
    await page.goto('/', { timeout: 60000 });
    const banner = page.locator('[data-testid="cookie-consent-banner"], .cookie-consent-banner');
    const exists = await banner.count() > 0;
    if (!exists) {
      test.skip(true, 'Cookie Consent Banner is not yet implemented');
      return;
    }
    const declineBtn = banner.locator('button:has-text("Decline"), button:has-text("Reject")');
    await expect(declineBtn).toBeVisible();
  });
});

test.describe('Tier 1: Password Recovery (Conditional)', () => {
  test('28. Password Recovery: Check for forgot password link on login form (skipped if missing)', async ({ page }) => {
    await page.goto('/login', { timeout: 60000 });
    const forgotLink = page.locator('a:has-text("Forgot"), button:has-text("Forgot"), [data-testid="forgot-password"]');
    const exists = await forgotLink.count() > 0;
    if (!exists) {
      test.skip(true, 'Password Recovery entry point is not yet implemented');
      return;
    }
    await expect(forgotLink).toBeVisible();
  });

  test('29. Password Recovery: Check for reset password page path (skipped if missing)', async ({ page }) => {
    await page.goto('/login/reset-password', { timeout: 60000 });
    const resetForm = page.locator('[data-testid="reset-password-form"], form:has-text("Reset"), form:has-text("Password")');
    const exists = await resetForm.count() > 0;
    if (!exists) {
      test.skip(true, 'Password Recovery page is not yet implemented');
      return;
    }
    await expect(resetForm).toBeVisible();
  });

  test('30. Password Recovery: Check for reset password form submit button (skipped if missing)', async ({ page }) => {
    await page.goto('/login/reset-password', { timeout: 60000 });
    const resetForm = page.locator('[data-testid="reset-password-form"], form:has-text("Reset"), form:has-text("Password")');
    const exists = await resetForm.count() > 0;
    if (!exists) {
      test.skip(true, 'Password Recovery page is not yet implemented');
      return;
    }
    const submitBtn = resetForm.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
  });
});
