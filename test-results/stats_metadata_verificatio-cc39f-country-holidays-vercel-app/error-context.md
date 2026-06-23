# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: stats_metadata_verification.spec.ts >> Stats and Metadata Verification >> 1. Metadata points to tea-country-holidays.vercel.app
- Location: tests\stats_metadata_verification.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Stats and Metadata Verification', () => {
  4  |   test('1. Metadata points to tea-country-holidays.vercel.app', async ({ page }) => {
> 5  |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  6  | 
  7  |     // Check canonical link contains vercel domain
  8  |     const canonical = page.locator('link[rel="canonical"]');
  9  |     await expect(canonical).toBeAttached();
  10 |     const canonicalHref = await canonical.getAttribute('href');
  11 |     expect(canonicalHref).toContain('tea-country-holidays.vercel.app');
  12 | 
  13 |     // Check og:url contains vercel domain
  14 |     const ogUrl = page.locator('meta[property="og:url"]');
  15 |     await expect(ogUrl).toBeAttached();
  16 |     const ogUrlContent = await ogUrl.getAttribute('content');
  17 |     expect(ogUrlContent).toContain('tea-country-holidays.vercel.app');
  18 | 
  19 |     // Check og:image contains relative path /og-image.png
  20 |     const ogImage = page.locator('meta[property="og:image"]');
  21 |     await expect(ogImage).toBeAttached();
  22 |     const ogImageContent = await ogImage.getAttribute('content');
  23 |     expect(ogImageContent).toContain('/og-image.png');
  24 |   });
  25 | 
  26 |   test('2. Unified statistics are correctly rendered', async ({ page }) => {
  27 |     await page.goto('/');
  28 | 
  29 |     // Verify stats exist in the document body
  30 |     const content = await page.textContent('body');
  31 |     
  32 |     // Check Destinations (50+) exists
  33 |     expect(content).toContain('50+ Destinations');
  34 | 
  35 |     // Check Years (10) exists
  36 |     const hasYearsExcellence = content.includes('10 Years of Excellence');
  37 |     const hasYearsTrust = content.includes('10 Years of Trust');
  38 |     const hasYearsExperience = content.includes('10 Years Experience');
  39 |     expect(hasYearsExcellence || hasYearsTrust || hasYearsExperience).toBe(true);
  40 |   });
  41 | });
  42 | 
```