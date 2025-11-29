import { test, expect } from "@playwright/test";

test.describe("Stack", () => {
  test("vertical stack", async ({ page }) => {
    await page.goto("/iframe.html?id=layout-stack--vertical");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "stack-vertical.png"
    );
  });

  test("horizontal stack", async ({ page }) => {
    await page.goto("/iframe.html?id=layout-stack--horizontal");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "stack-horizontal.png"
    );
  });

  test("centered stack", async ({ page }) => {
    await page.goto("/iframe.html?id=layout-stack--centered");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "stack-centered.png"
    );
  });

  test("space between", async ({ page }) => {
    await page.goto("/iframe.html?id=layout-stack--space-between");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "stack-space-between.png"
    );
  });
});
