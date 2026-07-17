import { test, expect } from '@playwright/test';

test('callback handler redirects to homepage on invalid code without crashing', async ({ page }) => {
  // Go to callback route with an invalid code
  await page.goto('/auth/callback?code=invalid-test-code');
  
  // Verify it redirects back to the home page (origin)
  await expect(page).toHaveURL('/');
});

test('login page loads and displays form components', async ({ page }) => {
  // Go to login page
  await page.goto('/login');
  
  // Verify title/form elements exist
  await expect(page).toHaveTitle(/Join Tea Country Holidays | Login & Register/i);
  await expect(page.locator('input[type="email"]')).toBeVisible();
  
  // On Step 1, password and name inputs are NOT visible
  await expect(page.locator('input[type="password"]')).toBeHidden();
  await expect(page.locator('input[placeholder="John Doe"]')).toBeHidden();

  // Fill email and click Continue to go to Step 2
  await page.locator('input[type="email"]').fill('test@example.com');
  await page.locator('button.submit-btn').click();

  // Now password and name inputs are visible
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await expect(page.locator('input[placeholder="John Doe"]')).toBeVisible();

  // Go back to Step 1 to test toggle mode
  await page.locator('text=Edit').click();

  // Toggle to sign in mode
  const toggleLink = page.locator('.toggle-link span');
  await expect(toggleLink).toBeVisible();
  await toggleLink.click();

  // Go to Step 2 in signin mode
  await page.locator('button.submit-btn').click();

  // Verify the Full Name field is now hidden (signin mode)
  await expect(page.locator('input[placeholder="John Doe"]')).toBeHidden();
  await expect(page.locator('input[type="password"]')).toBeVisible();
});
