import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/vrt",
  snapshotDir: "./tests/vrt/snapshots",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:6007",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run storybook -- --ci",
    url: "http://localhost:6007",
    reuseExistingServer: !process.env.CI,
  },
});
