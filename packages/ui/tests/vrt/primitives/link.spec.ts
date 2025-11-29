import { test, expect } from "@playwright/test";

test.describe("Link", () => {
  test("primary variant - light mode", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-link--default");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "link-primary-light.png"
    );
  });

  test("primary variant - dark mode", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=primitives-link--default&globals=theme:dark"
    );
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "link-primary-dark.png"
    );
  });

  test("secondary variant", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-link--muted");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "link-secondary.png"
    );
  });

  test("nav variant", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-link--nav");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "link-nav.png"
    );
  });
});
