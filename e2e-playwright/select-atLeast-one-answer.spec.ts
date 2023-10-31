import { test, expect } from '@playwright/test';

test('test click on at least one answer', async ({ page }) => {
  await page.goto('http://localhost:4200/game-page');
  await page.goto('http://localhost:4200/login');
  await page.locator('[data-test="email"]').click();
  await page.locator('[data-test="email"]').fill('admin@gmail.com');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('admin');
  await page.locator('[data-test="login-btn"]').click();
  await page.locator('[data-test="start-btn"]').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByTestId('atLeastOneAnswerMessage')).toHaveText('At least select 1 answer');
});
