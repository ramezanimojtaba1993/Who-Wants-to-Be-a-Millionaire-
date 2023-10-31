import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e-playwright',
  use: {
    headless: false
  },
};
export default config;
