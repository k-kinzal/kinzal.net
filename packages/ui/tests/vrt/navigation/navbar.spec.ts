import { test, expect } from "@playwright/test";

test.describe("Navbar", () => {
  test("default - light mode", async ({ page }) => {
    await page.goto("/iframe.html?id=navigation-navbar--default");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "navbar-default-light.png"
    );
  });

  test("default - dark mode", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=navigation-navbar--default&globals=theme:dark"
    );
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "navbar-default-dark.png"
    );
  });

  test("fixed position", async ({ page }) => {
    await page.goto("/iframe.html?id=navigation-navbar--fixed");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "navbar-fixed.png"
    );
  });

  test("sticky position", async ({ page }) => {
    await page.goto("/iframe.html?id=navigation-navbar--sticky");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "navbar-sticky.png"
    );
  });
});
