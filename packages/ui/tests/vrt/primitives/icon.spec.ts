import { test, expect } from "@playwright/test";

test.describe("Icon", () => {
  test("default icon", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-icon--default");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "icon-default.png"
    );
  });

  test("all sizes", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-icon--all-sizes");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "icon-all-sizes.png"
    );
  });

  test("colored icons", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-icon--colored");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "icon-colored.png"
    );
  });
});
