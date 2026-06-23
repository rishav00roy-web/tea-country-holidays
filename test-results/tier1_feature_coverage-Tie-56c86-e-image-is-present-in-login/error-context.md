# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier1_feature_coverage.spec.ts >> Tier 1: Load Speed & Image Priority >> 22. Load Speed: First destination slide image is present in login
- Location: tests\tier1_feature_coverage.spec.ts:168:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
Call log:
  - navigating to "http://localhost:3000/login", waiting until "load"

```

# Test source

```ts
  69  |     await expect(toggleLink).toBeVisible();
  70  |     await expect(toggleLink).toHaveText(/Already have an account\? Sign in/i);
  71  |   });
  72  | 
  73  |   test('11. Auth: Toggling to Sign In hides Full Name input', async ({ page }) => {
  74  |     await page.goto('/login', { timeout: 60000 });
  75  |     const toggleLink = page.locator('p.toggle-link span');
  76  |     await toggleLink.click();
  77  |     const nameInput = page.locator('input[placeholder="John Doe"]');
  78  |     await expect(nameInput).not.toBeVisible();
  79  |   });
  80  | 
  81  |   test('12. Auth: Toggling to Sign In updates submit button text', async ({ page }) => {
  82  |     await page.goto('/login', { timeout: 60000 });
  83  |     const toggleLink = page.locator('p.toggle-link span');
  84  |     await toggleLink.click();
  85  |     const submitBtn = page.locator('button.submit-btn');
  86  |     await expect(submitBtn).toHaveText(/Sign In/i);
  87  |   });
  88  | 
  89  |   test('13. Auth: Toggling back to Sign Up shows Full Name input again', async ({ page }) => {
  90  |     await page.goto('/login', { timeout: 60000 });
  91  |     const toggleLink = page.locator('p.toggle-link span');
  92  |     // Go to sign in
  93  |     await toggleLink.click();
  94  |     // Go back to sign up
  95  |     await toggleLink.click();
  96  |     const nameInput = page.locator('input[placeholder="John Doe"]');
  97  |     await expect(nameInput).toBeVisible();
  98  |   });
  99  | });
  100 | 
  101 | test.describe('Tier 1: Mobile Responsiveness & Layout', () => {
  102 |   test('14. Mobile: Main navbar links are hidden on small viewport', async ({ page }) => {
  103 |     await page.setViewportSize({ width: 375, height: 667 });
  104 |     await page.goto('/', { timeout: 60000 });
  105 |     const desktopLinks = page.locator('.hidden.md\\:flex.items-center.gap-7');
  106 |     await expect(desktopLinks).not.toBeVisible();
  107 |   });
  108 | 
  109 |   test('15. Mobile: Hamburger button is visible on small viewport', async ({ page }) => {
  110 |     await page.setViewportSize({ width: 375, height: 667 });
  111 |     await page.goto('/', { timeout: 60000 });
  112 |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  113 |     await expect(hamburger).toBeVisible();
  114 |   });
  115 | 
  116 |   test('16. Desktop: Main navbar links are visible on large viewport', async ({ page }) => {
  117 |     await page.setViewportSize({ width: 1200, height: 800 });
  118 |     await page.goto('/', { timeout: 60000 });
  119 |     // Ensure at least one navbar link is visible
  120 |     const firstLink = page.locator('nav a:has-text("Holidays")').first();
  121 |     await expect(firstLink).toBeVisible();
  122 |   });
  123 | 
  124 |   test('17. Desktop: Hamburger button is hidden on large viewport', async ({ page }) => {
  125 |     await page.setViewportSize({ width: 1200, height: 800 });
  126 |     await page.goto('/', { timeout: 60000 });
  127 |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  128 |     await expect(hamburger).not.toBeVisible();
  129 |   });
  130 | 
  131 |   test('18. Mobile: Sticky CTA is visible on mobile viewport', async ({ page }) => {
  132 |     await page.setViewportSize({ width: 375, height: 667 });
  133 |     await page.goto('/', { timeout: 60000 });
  134 |     const stickyCta = page.locator('div.fixed.bottom-0.left-0.right-0.md\\:hidden');
  135 |     await expect(stickyCta).toBeVisible();
  136 |   });
  137 | 
  138 |   test('19. Desktop: Sticky CTA is hidden on desktop viewport', async ({ page }) => {
  139 |     await page.setViewportSize({ width: 1200, height: 800 });
  140 |     await page.goto('/', { timeout: 60000 });
  141 |     const stickyCta = page.locator('div.fixed.bottom-0.left-0.right-0.md\\:hidden');
  142 |     await expect(stickyCta).not.toBeVisible();
  143 |   });
  144 | });
  145 | 
  146 | test.describe('Tier 1: Interactive Touch Controls & Modals', () => {
  147 |   test('20. Mobile: Hamburger menu toggle opens drawer', async ({ page }) => {
  148 |     await page.setViewportSize({ width: 375, height: 667 });
  149 |     await page.goto('/', { timeout: 60000 });
  150 |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  151 |     await hamburger.dispatchEvent('click');
  152 |     // Drawer should have translate-x-0 which means it is visible
  153 |     const drawer = page.locator('.fixed.inset-0.z-40.flex.flex-col');
  154 |     await expect(drawer).toBeVisible();
  155 |   });
  156 | 
  157 |   test('21. Mobile: Hamburger menu close button in drawer exists', async ({ page }) => {
  158 |     await page.setViewportSize({ width: 375, height: 667 });
  159 |     await page.goto('/', { timeout: 60000 });
  160 |     const hamburger = page.locator('button[aria-label="Toggle menu"]');
  161 |     await hamburger.dispatchEvent('click');
  162 |     const closeBtn = page.locator('button[aria-label="Toggle menu"] svg.lucide-x');
  163 |     await expect(closeBtn).toBeVisible();
  164 |   });
  165 | });
  166 | 
  167 | test.describe('Tier 1: Load Speed & Image Priority', () => {
  168 |   test('22. Load Speed: First destination slide image is present in login', async ({ page }) => {
> 169 |     await page.goto('/login', { timeout: 60000 });
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
  170 |     const firstSlideImage = page.locator('.auth-right img[alt="Rajasthan"]').first();
  171 |     await expect(firstSlideImage).toBeAttached();
  172 |   });
  173 | 
  174 |   test('23. Load Speed: Check that logo image exists on home page', async ({ page }) => {
  175 |     await page.goto('/', { timeout: 60000 });
  176 |     const logo = page.locator('nav img[alt="Tea Country Holidays"]').first();
  177 |     await expect(logo).toBeVisible();
  178 |   });
  179 | 
  180 |   test('24. Load Speed: Check above-fold hero image is present', async ({ page }) => {
  181 |     await page.goto('/', { timeout: 60000 });
  182 |     const heroImage = page.locator('.hero-section img, section img').first();
  183 |     await expect(heroImage).toBeAttached();
  184 |   });
  185 | });
  186 | 
  187 | test.describe('Tier 1: Cookie Consent Banner (Conditional)', () => {
  188 |   test('25. Cookie Consent: Check for cookie banner container element (skipped if missing)', async ({ page }) => {
  189 |     await page.goto('/', { timeout: 60000 });
  190 |     const banner = page.locator('[data-testid="cookie-consent-banner"], .cookie-consent-banner');
  191 |     const exists = await banner.count() > 0;
  192 |     if (!exists) {
  193 |       test.skip(true, 'Cookie Consent Banner is not yet implemented');
  194 |       return;
  195 |     }
  196 |     await expect(banner).toBeVisible();
  197 |   });
  198 | 
  199 |   test('26. Cookie Consent: Check for cookie banner accept button (skipped if missing)', async ({ page }) => {
  200 |     await page.goto('/', { timeout: 60000 });
  201 |     const banner = page.locator('[data-testid="cookie-consent-banner"], .cookie-consent-banner');
  202 |     const exists = await banner.count() > 0;
  203 |     if (!exists) {
  204 |       test.skip(true, 'Cookie Consent Banner is not yet implemented');
  205 |       return;
  206 |     }
  207 |     const acceptBtn = banner.locator('button:has-text("Accept")');
  208 |     await expect(acceptBtn).toBeVisible();
  209 |   });
  210 | 
  211 |   test('27. Cookie Consent: Check for cookie banner decline button (skipped if missing)', async ({ page }) => {
  212 |     await page.goto('/', { timeout: 60000 });
  213 |     const banner = page.locator('[data-testid="cookie-consent-banner"], .cookie-consent-banner');
  214 |     const exists = await banner.count() > 0;
  215 |     if (!exists) {
  216 |       test.skip(true, 'Cookie Consent Banner is not yet implemented');
  217 |       return;
  218 |     }
  219 |     const declineBtn = banner.locator('button:has-text("Decline"), button:has-text("Reject")');
  220 |     await expect(declineBtn).toBeVisible();
  221 |   });
  222 | });
  223 | 
  224 | test.describe('Tier 1: Password Recovery (Conditional)', () => {
  225 |   test('28. Password Recovery: Check for forgot password link on login form (skipped if missing)', async ({ page }) => {
  226 |     await page.goto('/login', { timeout: 60000 });
  227 |     const forgotLink = page.locator('a:has-text("Forgot"), button:has-text("Forgot"), [data-testid="forgot-password"]');
  228 |     const exists = await forgotLink.count() > 0;
  229 |     if (!exists) {
  230 |       test.skip(true, 'Password Recovery entry point is not yet implemented');
  231 |       return;
  232 |     }
  233 |     await expect(forgotLink).toBeVisible();
  234 |   });
  235 | 
  236 |   test('29. Password Recovery: Check for reset password page path (skipped if missing)', async ({ page }) => {
  237 |     await page.goto('/login/reset-password', { timeout: 60000 });
  238 |     const resetForm = page.locator('[data-testid="reset-password-form"], form:has-text("Reset"), form:has-text("Password")');
  239 |     const exists = await resetForm.count() > 0;
  240 |     if (!exists) {
  241 |       test.skip(true, 'Password Recovery page is not yet implemented');
  242 |       return;
  243 |     }
  244 |     await expect(resetForm).toBeVisible();
  245 |   });
  246 | 
  247 |   test('30. Password Recovery: Check for reset password form submit button (skipped if missing)', async ({ page }) => {
  248 |     await page.goto('/login/reset-password', { timeout: 60000 });
  249 |     const resetForm = page.locator('[data-testid="reset-password-form"], form:has-text("Reset"), form:has-text("Password")');
  250 |     const exists = await resetForm.count() > 0;
  251 |     if (!exists) {
  252 |       test.skip(true, 'Password Recovery page is not yet implemented');
  253 |       return;
  254 |     }
  255 |     const submitBtn = resetForm.locator('button[type="submit"]');
  256 |     await expect(submitBtn).toBeVisible();
  257 |   });
  258 | });
  259 | 
```