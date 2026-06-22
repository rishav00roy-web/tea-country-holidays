import { test, expect } from '@playwright/test';

test('callback handler redirects to homepage on invalid code without crashing', async ({ page }) => {
  // Go to callback route with an invalid code
  const response = await page.goto('/auth/callback?code=invalid-test-code');
  
  // Verify it redirects back to the home page (origin)
  await expect(page).toHaveURL('/');
});

test('login page loads and displays form components', async ({ page }) => {
  // Go to login page
  await page.goto('/login');
  
  // Verify title/form elements exist
  await expect(page).toHaveTitle(/Join Tea Country Holidays | Login & Register/i);
  await expect(page.locator('input[type="email"]')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toBeVisible();
  
  // By default, it should be in signup mode, so Full Name (John Doe) is visible
  await expect(page.locator('input[placeholder="John Doe"]')).toBeVisible();
  
  // Toggle to sign in mode
  const toggleLink = page.locator('.toggle-link span');
  await expect(toggleLink).toBeVisible();
  await toggleLink.click();
  
  // Verify the Full Name field is now hidden (signin mode)
  await expect(page.locator('input[placeholder="John Doe"]')).toBeHidden();
});
