import { test, expect } from "@playwright/test";

test.describe("NavLink", () => {
  test("default navlink", async ({ page }) => {
    await page.goto("/iframe.html?id=navigation-navlink--default");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "navlink-default.png"
    );
  });

  test("active navlink", async ({ page }) => {
    await page.goto("/iframe.html?id=navigation-navlink--active");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "navlink-active.png"
    );
  });

  test("multiple links", async ({ page }) => {
    await page.goto("/iframe.html?id=navigation-navlink--multiple-links");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "navlink-multiple.png"
    );
  });
});
