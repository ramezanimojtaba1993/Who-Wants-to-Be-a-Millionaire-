import { expect, test } from '@playwright/test';

test('test register successfully', async ({ page }) => {
  await page.goto('http://localhost:4200/register');
  await page.locator('[data-test="email"]').click();
  await page.locator('[data-test="email"]').fill('player2@gmail.com');
  await page.locator('[data-test="email"]').press('Tab');
  await page.locator('[data-test="password"]').fill('player2');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('[data-test="register-btn"]').click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(new RegExp('^http://localhost:4200/login'));
});
