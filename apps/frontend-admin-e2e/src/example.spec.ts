// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('/');

//   // Expect h1 to contain a substring.
//   expect(await page.locator('h1').innerText()).toContain('Welcome');
// });


import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Admin/i);
});

test('has header', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Admin Dashboard/i);
});