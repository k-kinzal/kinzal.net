import { test, expect } from "@playwright/test";

test.describe("Container", () => {
  test("default container", async ({ page }) => {
    await page.goto("/iframe.html?id=layout-container--default");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "container-default.png"
    );
  });

  test("fluid container", async ({ page }) => {
    await page.goto("/iframe.html?id=layout-container--fluid");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "container-fluid.png"
    );
  });
});
