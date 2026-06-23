# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier2_boundary_edge.spec.ts >> Tier 2: Mobile Viewport Boundaries >> 13. Mobile Boundary: Viewport at desktop threshold 768px (shows desktop layout)
- Location: tests\tier2_boundary_edge.spec.ts:150:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
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
  110 |     await page.goto('/login', { timeout: 60000 });
  111 |     const toggleLink = page.locator('p.toggle-link span');
  112 |     const nameInput = page.locator('input[placeholder="John Doe"]');
  113 |     
  114 |     // Toggle 6 times rapidly
  115 |     for (let i = 0; i < 6; i++) {
  116 |       await toggleLink.click();
  117 |     }
  118 |     
  119 |     // After even number of toggles, we should be back to original (Sign Up) mode
  120 |     await expect(nameInput).toBeVisible();
  121 |   });
  122 | 
  123 |   test('10. Auth: Special characters in email', async ({ page }) => {
  124 |     await page.goto('/login', { timeout: 60000 });
  125 |     const emailInput = page.locator('input[placeholder="you@example.com"]');
  126 |     const specialEmail = 'test+alias!#$%&\'*+-/=?^_`{|}~@example.com';
  127 |     await emailInput.fill(specialEmail);
  128 |     const val = await emailInput.inputValue();
  129 |     expect(val).toBe(specialEmail);
  130 |   });
  131 | });
  132 | 
  133 | test.describe('Tier 2: Mobile Viewport Boundaries', () => {
  134 |   test('11. Mobile Boundary: Viewport at minimum 320px width - layout remains intact', async ({ page }) => {
  135 |     await page.setViewportSize({ width: 320, height: 480 });
  136 |     await page.goto('/', { timeout: 60000 });
  137 |     const logo = page.locator('nav img[alt="Tea Country Holidays"]').first();
  138 |     await expect(logo).toBeVisible();
  139 |   });
  140 | 
  141 |   test('12. Mobile Boundary: Viewport at tablet threshold 767px (shows mobile layout)', async ({ page }) => {
  142 |     await page.setViewportSize({ width: 767, height: 1024 });
  143 |     await page.goto('/', { timeout: 60000 });
  144 |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  145 |     await expect(hamburger).toBeVisible();
  146 |     const desktopLinks = page.locator('.hidden.md\\:flex.items-center.gap-7');
  147 |     await expect(desktopLinks).not.toBeVisible();
  148 |   });
  149 | 
  150 |   test('13. Mobile Boundary: Viewport at desktop threshold 768px (shows desktop layout)', async ({ page }) => {
  151 |     await page.setViewportSize({ width: 768, height: 1024 });
> 152 |     await page.goto('/', { timeout: 60000 });
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
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
```