import { test, expect } from '@playwright/test';

test('test redirect to login successfully', async ({ page }) => {
  await page.goto('http://localhost:4200/game-page');
  await expect(page).toHaveURL(new RegExp('^http://localhost:4200/login'));
});
