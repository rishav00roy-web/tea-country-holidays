import { test, expect } from '@playwright/test';

test.describe('Stats and Metadata Verification', () => {
  test('1. Metadata points to tea-country-holidays.vercel.app', async ({ page }) => {
    await page.goto('/');

    // Check canonical link contains vercel domain
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toBeAttached();
    const canonicalHref = await canonical.getAttribute('href');
    expect(canonicalHref).toContain('tea-country-holidays.vercel.app');

    // Check og:url contains vercel domain
    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toBeAttached();
    const ogUrlContent = await ogUrl.getAttribute('content');
    expect(ogUrlContent).toContain('tea-country-holidays.vercel.app');

    // Check og:image contains relative path /og-image.png
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toBeAttached();
    const ogImageContent = await ogImage.getAttribute('content');
    expect(ogImageContent).toContain('/og-image.png');
  });

  test('2. Unified statistics are correctly rendered', async ({ page }) => {
    await page.goto('/');

    // Verify stats exist in the document body
    const content = await page.textContent('body');
    
    // Check Destinations (50+) exists
    expect(content).toContain('50+ Destinations');

    // Check Years (10) exists
    const hasYearsExcellence = content.includes('10 Years of Excellence');
    const hasYearsTrust = content.includes('10 Years of Trust');
    const hasYearsExperience = content.includes('10 Years Experience');
    expect(hasYearsExcellence || hasYearsTrust || hasYearsExperience).toBe(true);
  });
});
