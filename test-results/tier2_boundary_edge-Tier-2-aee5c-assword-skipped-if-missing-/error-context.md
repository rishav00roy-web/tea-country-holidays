# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier2_boundary_edge.spec.ts >> Tier 2: Password Recovery Boundary (Conditional) >> 27. Password Recovery: Submit reset password with short password (skipped if missing)
- Location: tests\tier2_boundary_edge.spec.ts:331:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login/reset-password
Call log:
  - navigating to "http://localhost:3000/login/reset-password", waiting until "load"

```

# Test source

```ts
  232 |       await expect(scrollTopBtn).toBeVisible();
  233 |       await scrollTopBtn.dispatchEvent('click');
  234 |       
  235 |       // Allow scroll animation to finish
  236 |       await page.waitForTimeout(500);
  237 |       const scrollPos = await page.evaluate(() => window.scrollY);
  238 |       expect(scrollPos).toBeLessThan(500);
  239 |     }
  240 |   });
  241 | 
  242 |   test('20. Modals: Double click on Booking Modal button does not duplicate modals', async ({ page }) => {
  243 |     await page.goto('/', { timeout: 60000 });
  244 |     const bookBtn = page.locator('nav a:has-text("Book Now")').first();
  245 |     await bookBtn.dispatchEvent('click');
  246 |     
  247 |     // Ensure modal container exists
  248 |     const modal = page.locator('.fixed.inset-0.z-\\[100\\]');
  249 |     const isModalOpen = await modal.count() > 0 && await modal.isVisible();
  250 |     if (!isModalOpen) {
  251 |       test.skip(true, 'Booking modal integration not yet implemented');
  252 |       return;
  253 |     }
  254 |     await expect(modal).toBeVisible();
  255 |   });
  256 | });
  257 | 
  258 | test.describe('Tier 2: Load Speed & Image Priority Boundary', () => {
  259 |   test('21. Load Speed: All carousel images are using valid paths', async ({ page }) => {
  260 |     await page.goto('/login', { timeout: 60000 });
  261 |     const images = page.locator('.auth-right img');
  262 |     const count = await images.count();
  263 |     
  264 |     for (let i = 0; i < count; i++) {
  265 |       const src = await images.nth(i).getAttribute('src');
  266 |       expect(src).not.toBeNull();
  267 |       expect(src?.length).toBeGreaterThan(0);
  268 |     }
  269 |   });
  270 | 
  271 |   test('22. Load Speed: Inspect first slider image has priority attribute', async ({ page }) => {
  272 |     await page.goto('/login', { timeout: 60000 });
  273 |     // First Image tag in slideshow
  274 |     const firstImg = page.locator('.auth-right img').first();
  275 |     const loading = await firstImg.getAttribute('loading');
  276 |     
  277 |     // It should have either priority or fetchpriority="high" or loading="eager" (or not lazy)
  278 |     expect(loading).not.toBe('lazy');
  279 |   });
  280 | 
  281 |   test('23. Load Speed: Inspect logo image is not lazy-loaded', async ({ page }) => {
  282 |     await page.goto('/', { timeout: 60000 });
  283 |     const logo = page.locator('nav img[alt="Tea Country Holidays"]').first();
  284 |     const loading = await logo.getAttribute('loading');
  285 |     expect(loading).not.toBe('lazy');
  286 |   });
  287 | });
  288 | 
  289 | test.describe('Tier 2: Cookie Consent Banner Boundary (Conditional)', () => {
  290 |   test('24. Cookie Consent: Check banner at 320px viewport (skipped if missing)', async ({ page }) => {
  291 |     await page.setViewportSize({ width: 320, height: 480 });
  292 |     await page.goto('/', { timeout: 60000 });
  293 |     const banner = page.locator('[data-testid="cookie-consent-banner"], .cookie-consent-banner');
  294 |     const exists = await banner.count() > 0;
  295 |     if (!exists) {
  296 |       test.skip(true, 'Cookie Consent Banner is not yet implemented');
  297 |       return;
  298 |     }
  299 |     await expect(banner).toBeVisible();
  300 |   });
  301 | 
  302 |   test('25. Cookie Consent: Rapidly accept/decline banner (skipped if missing)', async ({ page }) => {
  303 |     await page.goto('/', { timeout: 60000 });
  304 |     const banner = page.locator('[data-testid="cookie-consent-banner"], .cookie-consent-banner');
  305 |     const exists = await banner.count() > 0;
  306 |     if (!exists) {
  307 |       test.skip(true, 'Cookie Consent Banner is not yet implemented');
  308 |       return;
  309 |     }
  310 |     const acceptBtn = banner.locator('button:has-text("Accept")');
  311 |     await acceptBtn.click();
  312 |     await expect(banner).not.toBeVisible();
  313 |   });
  314 | 
  315 |   test('26. Cookie Consent: Verify banner layout doesn\'t break page container width (skipped if missing)', async ({ page }) => {
  316 |     await page.setViewportSize({ width: 320, height: 480 });
  317 |     await page.goto('/', { timeout: 60000 });
  318 |     const banner = page.locator('[data-testid="cookie-consent-banner"], .cookie-consent-banner');
  319 |     const exists = await banner.count() > 0;
  320 |     if (!exists) {
  321 |       test.skip(true, 'Cookie Consent Banner is not yet implemented');
  322 |       return;
  323 |     }
  324 |     const width = await page.evaluate(() => document.documentElement.clientWidth);
  325 |     const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  326 |     expect(scrollWidth).toBeLessThanOrEqual(width);
  327 |   });
  328 | });
  329 | 
  330 | test.describe('Tier 2: Password Recovery Boundary (Conditional)', () => {
  331 |   test('27. Password Recovery: Submit reset password with short password (skipped if missing)', async ({ page }) => {
> 332 |     await page.goto('/login/reset-password', { timeout: 60000 });
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login/reset-password
  333 |     const resetForm = page.locator('[data-testid="reset-password-form"], form:has-text("Reset"), form:has-text("Password")');
  334 |     const exists = await resetForm.count() > 0;
  335 |     if (!exists) {
  336 |       test.skip(true, 'Password Recovery page is not yet implemented');
  337 |       return;
  338 |     }
  339 |     const passInput = resetForm.locator('input[type="password"]').first();
  340 |     const submitBtn = resetForm.locator('button[type="submit"]');
  341 |     await passInput.fill('123');
  342 |     await submitBtn.click();
  343 |     // Verify an error is displayed or input has validation issues
  344 |     const validity = await passInput.evaluate((el: HTMLInputElement) => el.validity.tooShort || el.value.length < 6);
  345 |     expect(validity).toBe(true);
  346 |   });
  347 | 
  348 |   test('28. Password Recovery: Submit reset password with mismatched passwords (skipped if missing)', async ({ page }) => {
  349 |     await page.goto('/login/reset-password', { timeout: 60000 });
  350 |     const resetForm = page.locator('[data-testid="reset-password-form"], form:has-text("Reset"), form:has-text("Password")');
  351 |     const exists = await resetForm.count() > 0;
  352 |     if (!exists) {
  353 |       test.skip(true, 'Password Recovery page is not yet implemented');
  354 |       return;
  355 |     }
  356 |     const inputs = resetForm.locator('input[type="password"]');
  357 |     if (await inputs.count() >= 2) {
  358 |       await inputs.nth(0).fill('password123');
  359 |       await inputs.nth(1).fill('password456');
  360 |       const submitBtn = resetForm.locator('button[type="submit"]');
  361 |       await submitBtn.click();
  362 |       // Should show an error message
  363 |       const errorMsg = resetForm.locator('.alert-error, :has-text("match")');
  364 |       await expect(errorMsg).toBeVisible();
  365 |     } else {
  366 |       test.skip(true, 'Only one password field or mismatch logic not detectable');
  367 |     }
  368 |   });
  369 | 
  370 |   test('29. Password Recovery: Verify password reset page with empty token (skipped if missing)', async ({ page }) => {
  371 |     await page.goto('/login/reset-password', { timeout: 60000 });
  372 |     const resetForm = page.locator('[data-testid="reset-password-form"], form:has-text("Reset"), form:has-text("Password")');
  373 |     const exists = await resetForm.count() > 0;
  374 |     if (!exists) {
  375 |       test.skip(true, 'Password Recovery page is not yet implemented');
  376 |       return;
  377 |     }
  378 |     await expect(resetForm).toBeVisible();
  379 |   });
  380 | 
  381 |   test('30. Password Recovery: Submit reset password with invalid token (skipped if missing)', async ({ page }) => {
  382 |     await page.goto('/login/reset-password#error=unauthorized', { timeout: 60000 });
  383 |     const resetForm = page.locator('[data-testid="reset-password-form"], form:has-text("Reset"), form:has-text("Password")');
  384 |     const exists = await resetForm.count() > 0;
  385 |     if (!exists) {
  386 |       test.skip(true, 'Password Recovery page is not yet implemented');
  387 |       return;
  388 |     }
  389 |     // Form should show error or be disabled
  390 |     const errorMsg = page.locator('.alert-error, :has-text("invalid"), :has-text("error")');
  391 |     await expect(errorMsg).toBeVisible();
  392 |   });
  393 | });
  394 | 
```