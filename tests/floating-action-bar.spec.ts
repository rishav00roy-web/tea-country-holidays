import { test, expect } from '@playwright/test';

test.describe('Mobile Floating Action Bar', () => {
  test.beforeEach(async ({ page }) => {
    // Simulate a mobile device viewport
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('1. Check path visibility - visible on / and /holidays, hidden on /admin and /login routes', async ({ page }) => {
    // Visible on Home (/)
    await page.goto('/', { timeout: 60000 });
    const barHome = page.locator('#floating-action-bar');
    await expect(barHome).toBeVisible();

    // Visible on Holidays (/holidays)
    await page.goto('/holidays', { timeout: 60000 });
    const barHolidays = page.locator('#floating-action-bar');
    await expect(barHolidays).toBeVisible();

    // Hidden on /admin
    await page.goto('/admin', { timeout: 60000 });
    const barAdmin = page.locator('#floating-action-bar');
    await expect(barAdmin).not.toBeVisible();

    // Hidden on /admin/packages
    await page.goto('/admin/packages', { timeout: 60000 });
    const barAdminPackages = page.locator('#floating-action-bar');
    await expect(barAdminPackages).not.toBeVisible();

    // Hidden on /login
    await page.goto('/login', { timeout: 60000 });
    const barLogin = page.locator('#floating-action-bar');
    await expect(barLogin).not.toBeVisible();

    // Hidden on /login/reset-password
    await page.goto('/login/reset-password', { timeout: 60000 });
    const barResetPassword = page.locator('#floating-action-bar');
    await expect(barResetPassword).not.toBeVisible();
  });

  test('2. Verify active state highlighting of links', async ({ page }) => {
    // On / route, Home should be active (gold #e8b84b) and Packages should not
    await page.goto('/', { timeout: 60000 });
    const homeLink = page.locator('#floating-action-bar a, #floating-action-bar Link').filter({ hasText: 'Home' }).first();
    const packagesLink = page.locator('#floating-action-bar a, #floating-action-bar Link').filter({ hasText: 'Packages' }).first();

    await expect(homeLink).toHaveClass(/text-\[#e8b84b\]/);
    await expect(packagesLink).not.toHaveClass(/text-\[#e8b84b\]/);

    // On /holidays route, Packages should be active (gold #e8b84b) and Home should not
    await page.goto('/holidays', { timeout: 60000 });
    await expect(packagesLink).toHaveClass(/text-\[#e8b84b\]/);
    await expect(homeLink).not.toHaveClass(/text-\[#e8b84b\]/);
  });

  test('3. Verify safe area bottom padding is implemented', async ({ page }) => {
    await page.goto('/', { timeout: 60000 });
    const bar = page.locator('#floating-action-bar');
    const paddingBottom = await bar.evaluate(el => el.style.paddingBottom);
    expect(paddingBottom).toBe('env(safe-area-inset-bottom)');
  });

  test('4. Verify WhatsApp link points to the correct URL format', async ({ page }) => {
    await page.goto('/', { timeout: 60000 });
    const waLink = page.locator('#floating-action-bar a[href*="wa.me"]').first();
    await expect(waLink).toBeVisible();
    const href = await waLink.getAttribute('href');
    
    // Check it points to wa.me with correct number and text parameter
    expect(href).not.toBeNull();
    expect(href).toMatch(/^https:\/\/wa\.me\/918826048272\?text=/);
  });

  test('5. Verify Phone link points to tel:+918826048272', async ({ page }) => {
    await page.goto('/', { timeout: 60000 });
    const phoneLink = page.locator('#floating-action-bar a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();
    const href = await phoneLink.getAttribute('href');
    expect(href).toBe('tel:+918826048272');
  });

  test('6. Verify WhatsApp bubble has pulsing ring animation', async ({ page }) => {
    await page.goto('/', { timeout: 60000 });
    const waLink = page.locator('#floating-action-bar a[href*="wa.me"]').first();
    const pulsingRing = waLink.locator('span.animate-ping');
    await expect(pulsingRing).toBeVisible();
    await expect(pulsingRing).toHaveClass(/bg-\[#25D366\]/);
  });
});
