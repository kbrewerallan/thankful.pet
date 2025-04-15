import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000, // Set default timeout for expect assertions to 5 seconds
  },
  reporter: [["list"], ["html"]],
  use: {
    baseURL: "https://www.metoffice.gov.uk/",
    // trace: 'on-first-retry',
    testIdAttribute: "id",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});
