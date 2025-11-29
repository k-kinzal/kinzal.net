import { test, expect } from "@playwright/test";

test.describe("NavBrand", () => {
  test("default navbrand", async ({ page }) => {
    await page.goto("/iframe.html?id=navigation-navbrand--default");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "navbrand-default.png"
    );
  });

  test("with border", async ({ page }) => {
    await page.goto("/iframe.html?id=navigation-navbrand--with-border");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "navbrand-with-border.png"
    );
  });

  test("with logo", async ({ page }) => {
    await page.goto("/iframe.html?id=navigation-navbrand--with-logo");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "navbrand-with-logo.png"
    );
  });
});
