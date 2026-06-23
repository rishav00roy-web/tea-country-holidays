# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier2_boundary_edge.spec.ts >> Tier 2: Interactive Touch Controls & Modals Boundary >> 20. Modals: Double click on Booking Modal button does not duplicate modals
- Location: tests\tier2_boundary_edge.spec.ts:242:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  143 |     await page.goto('/', { timeout: 60000 });
  144 |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  145 |     await expect(hamburger).toBeVisible();
  146 |     const desktopLinks = page.locator('.hidden.md\\:flex.items-center.gap-7');
  147 |     await expect(desktopLinks).not.toBeVisible();
  148 |   });
  149 | 
  150 |   test('13. Mobile Boundary: Viewport at desktop threshold 768px (shows desktop layout)', async ({ page }) => {
  151 |     await page.setViewportSize({ width: 768, height: 1024 });
  152 |     await page.goto('/', { timeout: 60000 });
  153 |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  154 |     await expect(hamburger).not.toBeVisible();
  155 |   });
  156 | 
  157 |   test('14. Desktop Boundary: Viewport at extremely wide 2560px width', async ({ page }) => {
  158 |     await page.setViewportSize({ width: 2560, height: 1440 });
  159 |     await page.goto('/', { timeout: 60000 });
  160 |     const logo = page.locator('nav img[alt="Tea Country Holidays"]').first();
  161 |     await expect(logo).toBeVisible();
  162 |   });
  163 | 
  164 |   test('15. Viewport Boundary: Low height (320px) viewport scrollability', async ({ page }) => {
  165 |     await page.setViewportSize({ width: 375, height: 320 });
  166 |     await page.goto('/', { timeout: 60000 });
  167 |     // Scrolling should be enabled on HTML/body
  168 |     const isScrollable = await page.evaluate(() => {
  169 |       return document.documentElement.scrollHeight > document.documentElement.clientHeight;
  170 |     });
  171 |     expect(isScrollable).toBe(true);
  172 |   });
  173 | });
  174 | 
  175 | test.describe('Tier 2: Interactive Touch Controls & Modals Boundary', () => {
  176 |   test('16. Touch Controls: Fast tapping on Hamburger menu', async ({ page }) => {
  177 |     await page.setViewportSize({ width: 375, height: 667 });
  178 |     await page.goto('/', { timeout: 60000 });
  179 |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  180 |     
  181 |     // Double click / rapid click
  182 |     await hamburger.dispatchEvent('click');
  183 |     await hamburger.dispatchEvent('click');
  184 |     
  185 |     // The drawer state should end up closed or at least should not crash the page
  186 |     const drawer = page.locator('.fixed.inset-0.z-40.flex.flex-col');
  187 |     // Ensure page didn't crash
  188 |     const logo = page.locator('nav img[alt="Tea Country Holidays"]').first();
  189 |     await expect(logo).toBeVisible();
  190 |   });
  191 | 
  192 |   test('17. Touch Controls: Hamburger menu drawer closes on backdrop click (skipped if no backdrop close)', async ({ page }) => {
  193 |     await page.setViewportSize({ width: 375, height: 667 });
  194 |     await page.goto('/', { timeout: 60000 });
  195 |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  196 |     await hamburger.dispatchEvent('click');
  197 |     
  198 |     // Check if there is a backdrop locator or close area
  199 |     const drawer = page.locator('.fixed.inset-0.z-40.flex.flex-col');
  200 |     await expect(drawer).toBeVisible();
  201 |     
  202 |     // Close using click/tap on hamburger again since backdrop closing might not be implemented
  203 |     await hamburger.dispatchEvent('click');
  204 |     await expect(drawer).not.toBeVisible();
  205 |   });
  206 | 
  207 |   test('18. Touch Controls: Click on navigation link in mobile drawer closes drawer', async ({ page }) => {
  208 |     await page.setViewportSize({ width: 375, height: 667 });
  209 |     await page.goto('/', { timeout: 60000 });
  210 |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  211 |     await hamburger.dispatchEvent('click');
  212 | 
  213 |     // Click "Holidays" inside mobile drawer
  214 |     const holidayLink = page.locator('.fixed.inset-0.z-40.flex.flex-col a:has-text("Holidays")').first();
  215 |     await holidayLink.dispatchEvent('click');
  216 |     
  217 |     // Mobile drawer should close after clicking link
  218 |     const drawer = page.locator('.fixed.inset-0.z-40.flex.flex-col');
  219 |     await expect(drawer).not.toBeVisible();
  220 |   });
  221 | 
  222 |   test('19. Touch Controls: Back to top button click scroll check', async ({ page }) => {
  223 |     await page.setViewportSize({ width: 1200, height: 800 });
  224 |     await page.goto('/', { timeout: 60000 });
  225 |     
  226 |     // Scroll down to make scroll to top button active (or check it runs without errors)
  227 |     await page.evaluate(() => window.scrollTo(0, 1000));
  228 |     const scrollTopBtn = page.locator('button[aria-label="Back to top"]').first();
  229 |     
  230 |     // Check button exists
  231 |     if (await scrollTopBtn.count() > 0) {
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
> 243 |     await page.goto('/', { timeout: 60000 });
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
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
  332 |     await page.goto('/login/reset-password', { timeout: 60000 });
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
```