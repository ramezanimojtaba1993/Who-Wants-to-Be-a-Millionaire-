import { test, expect } from '@playwright/test';

test('test login and play the game and answer all questions correctly', async ({ page }) => {
  await page.goto('http://localhost:4200/login');
  await page.locator('[data-test="email"]').click();
  await page.locator('[data-test="email"]').fill('admin@gmail.com');
  await page.locator('[data-test="email"]').press('Tab');
  await page.locator('[data-test="password"]').fill('admin');
  await page.locator('[data-test="login-btn"]').click();
  await page.locator('[data-test="start-btn"]').click();
  await page.getByRole('button', { name: 'HyperText Markup Language' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'JavaScript' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Subversion' }).click();
  await page.getByRole('button', { name: 'Git' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Styling and formatting web content' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Application Programming Interface' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByTestId('done')).toHaveText('Done!');
});
