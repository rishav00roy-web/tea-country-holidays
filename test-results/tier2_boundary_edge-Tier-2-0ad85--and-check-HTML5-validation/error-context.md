# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier2_boundary_edge.spec.ts >> Tier 2: Supabase SSR Auth - Form Boundary & Input Validation >> 1. Auth: Submit Sign Up with empty email and check HTML5 validation
- Location: tests\tier2_boundary_edge.spec.ts:8:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
Call log:
  - navigating to "http://localhost:3000/login", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | // ==========================================
  4   | // TIER 2 BOUNDARY & EDGE CASES (30 TESTS)
  5   | // ==========================================
  6   | 
  7   | test.describe('Tier 2: Supabase SSR Auth - Form Boundary & Input Validation', () => {
  8   |   test('1. Auth: Submit Sign Up with empty email and check HTML5 validation', async ({ page }) => {
> 9   |     await page.goto('/login', { timeout: 60000 });
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
  10  |     const emailInput = page.locator('input[placeholder="you@example.com"]');
  11  |     const submitBtn = page.locator('button.submit-btn');
  12  | 
  13  |     // Email is required
  14  |     const isRequired = await emailInput.getAttribute('required');
  15  |     expect(isRequired).not.toBeNull();
  16  | 
  17  |     // Try submitting empty email
  18  |     await emailInput.fill('');
  19  |     await submitBtn.click();
  20  |     
  21  |     // Check validity state
  22  |     const validity = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valueMissing);
  23  |     expect(validity).toBe(true);
  24  |   });
  25  | 
  26  |   test('2. Auth: Submit Sign Up with invalid email format and check HTML5 validation', async ({ page }) => {
  27  |     await page.goto('/login', { timeout: 60000 });
  28  |     const emailInput = page.locator('input[placeholder="you@example.com"]');
  29  |     const submitBtn = page.locator('button.submit-btn');
  30  | 
  31  |     // Fill invalid email format
  32  |     await emailInput.fill('invalidemail');
  33  |     await submitBtn.click();
  34  | 
  35  |     // Check validity state
  36  |     const validity = await emailInput.evaluate((el: HTMLInputElement) => el.validity.typeMismatch);
  37  |     expect(validity).toBe(true);
  38  |   });
  39  | 
  40  |   test('3. Auth: Submit Sign Up with spaces in email (trimmed/allowed by input but handles gracefully)', async ({ page }) => {
  41  |     await page.goto('/login', { timeout: 60000 });
  42  |     const emailInput = page.locator('input[placeholder="you@example.com"]');
  43  |     await emailInput.fill('  spaces@example.com  ');
  44  |     const val = await emailInput.inputValue();
  45  |     expect(val.trim()).toBe('spaces@example.com');
  46  |   });
  47  | 
  48  |   test('4. Auth: Submit Sign In with empty email and check validation', async ({ page }) => {
  49  |     await page.goto('/login', { timeout: 60000 });
  50  |     const toggleLink = page.locator('p.toggle-link span');
  51  |     await toggleLink.click(); // Switch to Sign In
  52  | 
  53  |     const emailInput = page.locator('input[placeholder="you@example.com"]');
  54  |     const submitBtn = page.locator('button.submit-btn');
  55  | 
  56  |     await emailInput.fill('');
  57  |     await submitBtn.click();
  58  | 
  59  |     const validity = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valueMissing);
  60  |     expect(validity).toBe(true);
  61  |   });
  62  | 
  63  |   test('5. Auth: Submit Sign In with empty password and check validation', async ({ page }) => {
  64  |     await page.goto('/login', { timeout: 60000 });
  65  |     const toggleLink = page.locator('p.toggle-link span');
  66  |     await toggleLink.click(); // Switch to Sign In
  67  | 
  68  |     const emailInput = page.locator('input[placeholder="you@example.com"]');
  69  |     const passwordInput = page.locator('input[placeholder="••••••••"]');
  70  |     const submitBtn = page.locator('button.submit-btn');
  71  | 
  72  |     await emailInput.fill('user@example.com');
  73  |     await passwordInput.fill('');
  74  |     await submitBtn.click();
  75  | 
  76  |     const validity = await passwordInput.evaluate((el: HTMLInputElement) => el.validity.valueMissing);
  77  |     expect(validity).toBe(true);
  78  |   });
  79  | });
  80  | 
  81  | test.describe('Tier 2: Auth Input Lengths & Stressing UI', () => {
  82  |   test('6. Auth: Input extremely long name in Sign Up', async ({ page }) => {
  83  |     await page.goto('/login', { timeout: 60000 });
  84  |     const nameInput = page.locator('input[placeholder="John Doe"]');
  85  |     const longName = 'A'.repeat(500);
  86  |     await nameInput.fill(longName);
  87  |     const val = await nameInput.inputValue();
  88  |     expect(val.length).toBe(500);
  89  |   });
  90  | 
  91  |   test('7. Auth: Input extremely long email in Sign Up', async ({ page }) => {
  92  |     await page.goto('/login', { timeout: 60000 });
  93  |     const emailInput = page.locator('input[placeholder="you@example.com"]');
  94  |     const longEmail = 'a'.repeat(400) + '@example.com';
  95  |     await emailInput.fill(longEmail);
  96  |     const val = await emailInput.inputValue();
  97  |     expect(val.length).toBe(longEmail.length);
  98  |   });
  99  | 
  100 |   test('8. Auth: Input extremely long password in Sign Up', async ({ page }) => {
  101 |     await page.goto('/login', { timeout: 60000 });
  102 |     const passwordInput = page.locator('input[placeholder="••••••••"]');
  103 |     const longPassword = 'P'.repeat(100);
  104 |     await passwordInput.fill(longPassword);
  105 |     const val = await passwordInput.inputValue();
  106 |     expect(val.length).toBe(100);
  107 |   });
  108 | 
  109 |   test('9. Auth: Rapid toggling between Sign In and Sign Up modes', async ({ page }) => {
```