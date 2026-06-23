# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth-flow.spec.ts >> login page loads and displays form components
- Location: tests\auth-flow.spec.ts:11:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
Call log:
  - navigating to "http://localhost:3000/login", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('callback handler redirects to homepage on invalid code without crashing', async ({ page }) => {
  4  |   // Go to callback route with an invalid code
  5  |   const response = await page.goto('/auth/callback?code=invalid-test-code');
  6  |   
  7  |   // Verify it redirects back to the home page (origin)
  8  |   await expect(page).toHaveURL('/');
  9  | });
  10 | 
  11 | test('login page loads and displays form components', async ({ page }) => {
  12 |   // Go to login page
> 13 |   await page.goto('/login');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
  14 |   
  15 |   // Verify title/form elements exist
  16 |   await expect(page).toHaveTitle(/Join Tea Country Holidays | Login & Register/i);
  17 |   await expect(page.locator('input[type="email"]')).toBeVisible();
  18 |   await expect(page.locator('input[type="password"]')).toBeVisible();
  19 |   
  20 |   // By default, it should be in signup mode, so Full Name (John Doe) is visible
  21 |   await expect(page.locator('input[placeholder="John Doe"]')).toBeVisible();
  22 |   
  23 |   // Toggle to sign in mode
  24 |   const toggleLink = page.locator('.toggle-link span');
  25 |   await expect(toggleLink).toBeVisible();
  26 |   await toggleLink.click();
  27 |   
  28 |   // Verify the Full Name field is now hidden (signin mode)
  29 |   await expect(page.locator('input[placeholder="John Doe"]')).toBeHidden();
  30 | });
  31 | 
```