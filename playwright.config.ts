import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './automation/playwright/tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI if needed, locally use default */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'automation/reports/playwright', open: 'never' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` or `request.get('/api')`. */
    baseURL: process.env.BASE_URL || 'https://localhost:7089',

    /* Ignore HTTPS certificate errors (essential for localhost development certificates) */
    ignoreHTTPSErrors: true,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Capture screenshot on failure */
    screenshot: 'only-on-failure',

    /* Record video on retry or failure */
    video: 'retain-on-failure',

    /* Custom headers for API requests */
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },

  /* Configure projects for major browsers & dedicated API project */
  projects: [
    {
      name: 'api',
      testMatch: /.*\/api\/.*\.spec\.ts/,
      use: {
        // API tests do not need browser windows
      }
    },
    {
      name: 'chromium',
      testMatch: /.*\/ui\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'automation/reports/artifacts'
});
