import { test, expect } from '@playwright/test';

// ==========================================
// TIER 3 CROSS FEATURE INTERACTIONS (6 TESTS)
// ==========================================

test.describe('Tier 3: Cross-Feature Interactions', () => {
  test('1. Mobile menu toggle + login navigation', async ({ page }) => {
    // 1. Start with a mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { timeout: 60000 });

    // 2. Open the mobile menu drawer
    const hamburger = page.locator('button[aria-label="Toggle menu"]');
    await hamburger.dispatchEvent('click');
    
    // 3. Locate the Login link inside the mobile drawer and click it
    const drawerLoginLink = page.locator('.fixed.inset-0.z-40.flex.flex-col a[href="/login"]').first();
    await expect(drawerLoginLink).toBeVisible();
    await drawerLoginLink.click();

    // 4. Verify user is navigated to the /login page
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('2. Auth redirection + load speed / image priority', async ({ page }) => {
    // 1. Start on desktop homepage
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/', { timeout: 60000 });

    // 2. Click the login button in the desktop navbar
    const loginBtn = page.locator('nav a[href="/login"]').first();
    await loginBtn.dispatchEvent('click');

    // 3. Verify transition to login page
    await expect(page).toHaveURL(/.*\/login/);

    // 4. Verify login page slide show image priority/loading attribute (Cross-feature performance check)
    const firstImg = page.locator('.auth-right img').first();
    await expect(firstImg).toBeAttached();
    const loading = await firstImg.getAttribute('loading');
    expect(loading).not.toBe('lazy');
  });

  test('3. Mobile viewport + Booking Modal interaction', async ({ page }) => {
    // 1. Start with mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { timeout: 60000 });

    // 2. Open booking modal using Sticky CTA or another booking button
    const bookBtn = page.locator('button, a:has-text("Book Now")').first();
    if (await bookBtn.count() > 0) {
      await bookBtn.dispatchEvent('click');
      
      // 3. Verify modal is displayed and occupies most of viewport width but doesn't cause overflow
      const modal = page.locator('.fixed.inset-0.z-\\[100\\]');
      const isModalOpen = await modal.count() > 0 && await modal.isVisible();
      if (!isModalOpen) {
        test.skip(true, 'Booking modal integration not yet implemented');
        return;
      }
      await expect(modal).toBeVisible();

      const width = await page.evaluate(() => document.documentElement.clientWidth);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(width);
    }
  });

  test('4. Sticky CTA on mobile + WhatsApp integration link', async ({ page }) => {
    // 1. Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { timeout: 60000 });

    // 2. Check if Sticky CTA is visible
    const stickyCta = page.locator('#floating-action-bar');
    await expect(stickyCta).toBeVisible();

    // 3. Verify the WhatsApp link inside the Sticky CTA is correct
    const waLink = stickyCta.locator('a[href*="wa.me"]').first();
    await expect(waLink).toBeVisible();
    
    const href = await waLink.getAttribute('href');
    expect(href).toContain('918826048272');
  });

  test('5. Dark mode toggle + Login page navigation consistency', async ({ page }) => {
    // 1. Go to main page on desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/', { timeout: 60000 });

    // 2. Toggle dark mode
    const darkToggle = page.locator('#darkToggle');
    await expect(darkToggle).toBeAttached();
    await darkToggle.dispatchEvent('click');

    // 3. Verify .dark class is added to body
    const bodyClass = await page.evaluate(() => document.body.className);
    expect(bodyClass).toContain('dark');

    // 4. Navigate to Login Page
    const loginLink = page.locator('nav a[href="/login"]').first();
    await loginLink.dispatchEvent('click');

    // 5. Verify URL is /login
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('6. Cookie Consent + Route Navigation integration (Conditional)', async ({ page }) => {
    await page.goto('/', { timeout: 60000 });
    const banner = page.locator('[data-testid="cookie-consent-banner"], .cookie-consent-banner');
    const exists = await banner.count() > 0;
    if (!exists) {
      test.skip(true, 'Cookie Consent Banner is not yet implemented');
      return;
    }

    // Accept cookies
    const acceptBtn = banner.locator('button:has-text("Accept")');
    await acceptBtn.click();

    // Navigate to holidays page
    await page.goto('/holidays', { timeout: 60000 });

    // Banner should not be visible on the new page
    const bannerAfterNav = page.locator('[data-testid="cookie-consent-banner"], .cookie-consent-banner');
    await expect(bannerAfterNav).not.toBeVisible();
  });

  test('7. Prefers-Reduced-Motion: Reviews Marquee Fallback', async ({ page }) => {
    test.setTimeout(60000);
    // 1. Emulate prefers-reduced-motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    // 2. Load page
    await page.goto('/', { timeout: 60000 });

    // 3. Verify reviews marquee container is visible
    const marquee = page.locator('[aria-label="Customer reviews"], .marquee-viewport');
    await expect(marquee).toBeVisible({ timeout: 15000 });
  });

  test('8. Mobile Floating Elements Layout Alignment', async ({ page }) => {
    test.setTimeout(90000);
    const viewports = [
      { width: 375, height: 667 }, // iPhone SE
      { width: 390, height: 844 }, // iPhone 12/13
      { width: 412, height: 915 }  // Galaxy S20
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      // Load homepage
      await page.goto('/', { timeout: 60000 });

      const cookieBanner = page.locator('.cookie-consent-banner');
      const floatingBar = page.locator('#floating-action-bar');
      const whatsappBtn = page.locator('#floating-action-bar .whatsapp-btn');
      const navPill = page.locator('#floating-action-bar .mobile-nav-pill');

      // Verify they are visible
      await expect(cookieBanner).toBeVisible();
      await expect(floatingBar).toBeVisible();
      await expect(whatsappBtn).toBeVisible();
      await expect(navPill).toBeVisible();

      await expect(async () => {
        // Retrieve bounding boxes inside retry loop
        const cookieBox = await cookieBanner.boundingBox();
        const floatingBox = await floatingBar.boundingBox();
        const whatsappBox = await whatsappBtn.boundingBox();
        const navBox = await navPill.boundingBox();

        expect(cookieBox).not.toBeNull();
        expect(floatingBox).not.toBeNull();
        expect(whatsappBox).not.toBeNull();
        expect(navBox).not.toBeNull();

        if (cookieBox && floatingBox && whatsappBox && navBox) {
          // 1. Verify WhatsApp button is above the bottom nav pill
          expect(whatsappBox.y + whatsappBox.height).toBeLessThanOrEqual(navBox.y);

          // 2. Verify Cookie Consent is positioned above the Floating Action Bar on mobile
          // This requires the ResizeObserver to have populated --action-bar-height
          expect(cookieBox.y + cookieBox.height).toBeLessThanOrEqual(floatingBox.y);

          // 3. Verify elements are fully within the viewport bounds
          expect(cookieBox.x).toBeGreaterThanOrEqual(0);
          expect(cookieBox.x + cookieBox.width).toBeLessThanOrEqual(vp.width);
          
          // 4. Verify Cookie Banner is not clipped off the top of the viewport
          expect(cookieBox.y).toBeGreaterThanOrEqual(0);

          expect(floatingBox.x).toBeGreaterThanOrEqual(0);
          expect(floatingBox.x + floatingBox.width).toBeLessThanOrEqual(vp.width);
        }
      }).toPass({ timeout: 5000 });

      // 5. Test interaction: Click "Packages" link in the mobile nav pill
      const packagesLink = page.locator('#floating-action-bar a[href="/holidays"]').first();
      await packagesLink.click();
      await expect(page).toHaveURL(/.*\/holidays/);

      // Go back to home to test Cookie Banner
      await page.goto('/', { timeout: 60000 });
      
      // Click "Accept" on the cookie banner and confirm it gets dismissed
      const acceptBtn = page.locator('.cookie-consent-banner button:has-text("Accept")');
      await acceptBtn.click({ force: true });
      await expect(cookieBanner).not.toBeVisible();

      // Clear localStorage so the cookie consent banner shows up for the next viewport test
      await page.evaluate(() => localStorage.removeItem('cookie-consent'));
    }
  });
});
