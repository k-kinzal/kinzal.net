import { test, expect } from "@playwright/test";

test.describe("IconButton", () => {
  test("primary variant - light mode", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-iconbutton--primary");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "icon-button-primary-light.png"
    );
  });

  test("primary variant - dark mode", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=primitives-iconbutton--primary&globals=theme:dark"
    );
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "icon-button-primary-dark.png"
    );
  });

  test("secondary variant", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-iconbutton--secondary");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "icon-button-secondary.png"
    );
  });

  test("ghost variant", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-iconbutton--ghost");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "icon-button-ghost.png"
    );
  });

  test("all sizes", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-iconbutton--all-sizes");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "icon-button-all-sizes.png"
    );
  });
});
