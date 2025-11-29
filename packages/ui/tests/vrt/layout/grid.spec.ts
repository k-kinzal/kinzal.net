import { test, expect } from "@playwright/test";

test.describe("Grid", () => {
  test("default grid", async ({ page }) => {
    await page.goto("/iframe.html?id=layout-grid--default");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "grid-default.png"
    );
  });

  test("two columns", async ({ page }) => {
    await page.goto("/iframe.html?id=layout-grid--two-columns");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "grid-two-columns.png"
    );
  });

  test("three columns", async ({ page }) => {
    await page.goto("/iframe.html?id=layout-grid--three-columns");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "grid-three-columns.png"
    );
  });

  test("four columns", async ({ page }) => {
    await page.goto("/iframe.html?id=layout-grid--four-columns");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "grid-four-columns.png"
    );
  });
});
