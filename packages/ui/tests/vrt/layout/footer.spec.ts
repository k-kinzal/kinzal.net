import { test, expect } from "@playwright/test";

test.describe("Footer", () => {
  test("default footer - light mode", async ({ page }) => {
    await page.goto("/iframe.html?id=feedback-footer--default");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "footer-default-light.png"
    );
  });

  test("default footer - dark mode", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=feedback-footer--default&globals=theme:dark"
    );
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "footer-default-dark.png"
    );
  });

  test("fixed position", async ({ page }) => {
    await page.goto("/iframe.html?id=feedback-footer--fixed");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "footer-fixed.png"
    );
  });
});
