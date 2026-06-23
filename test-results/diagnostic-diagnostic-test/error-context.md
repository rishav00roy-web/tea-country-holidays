# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: diagnostic.spec.ts >> diagnostic test
- Location: tests\diagnostic.spec.ts:3:5

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
  3  | test('diagnostic test', async ({ page }) => {
  4  |   await page.setViewportSize({ width: 375, height: 667 });
> 5  |   await page.goto('/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  6  |   
  7  |   const htmlBox = await page.locator('html').boundingBox();
  8  |   const bodyBox = await page.locator('body').boundingBox();
  9  |   const navBox = await page.locator('nav').first().boundingBox();
  10 |   const desktopLinks = page.locator('.hidden.md\\:flex.items-center.gap-7').first();
  11 |   const desktopLinksBox = await desktopLinks.boundingBox();
  12 |   const desktopLinksDisplay = await desktopLinks.evaluate((el: HTMLElement) => window.getComputedStyle(el).display);
  13 |   
  14 |   console.log('DESKTOP LINKS BOX:', desktopLinksBox);
  15 |   console.log('DESKTOP LINKS DISPLAY:', desktopLinksDisplay);
  16 |   
  17 |   const rightControls = page.locator('.navbar-right').first();
  18 |   const rightControlsBox = await rightControls.boundingBox();
  19 |   const rightControlsDisplay = await rightControls.evaluate((el: HTMLElement) => window.getComputedStyle(el).display);
  20 |   
  21 |   console.log('RIGHT CONTROLS BOX:', rightControlsBox);
  22 |   console.log('RIGHT CONTROLS DISPLAY:', rightControlsDisplay);
  23 | });
  24 | 
```