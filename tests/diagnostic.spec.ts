import { test, expect } from '@playwright/test';

test('diagnostic test', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  
  const htmlBox = await page.locator('html').boundingBox();
  const bodyBox = await page.locator('body').boundingBox();
  const navBox = await page.locator('nav').first().boundingBox();
  const desktopLinks = page.locator('.hidden.md\\:flex.items-center.gap-7').first();
  const desktopLinksBox = await desktopLinks.boundingBox();
  const desktopLinksDisplay = await desktopLinks.evaluate((el: HTMLElement) => window.getComputedStyle(el).display);
  
  console.log('DESKTOP LINKS BOX:', desktopLinksBox);
  console.log('DESKTOP LINKS DISPLAY:', desktopLinksDisplay);
  
  const rightControls = page.locator('.navbar-right').first();
  const rightControlsBox = await rightControls.boundingBox();
  const rightControlsDisplay = await rightControls.evaluate((el: HTMLElement) => window.getComputedStyle(el).display);
  
  console.log('RIGHT CONTROLS BOX:', rightControlsBox);
  console.log('RIGHT CONTROLS DISPLAY:', rightControlsDisplay);
});
