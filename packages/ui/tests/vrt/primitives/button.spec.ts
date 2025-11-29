import { test, expect } from "@playwright/test";

test.describe("Button", () => {
  test("primary variant - light mode", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-button--primary");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "button-primary-light.png"
    );
  });

  test("primary variant - dark mode", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=primitives-button--primary&globals=theme:dark"
    );
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "button-primary-dark.png"
    );
  });

  test("secondary variant", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-button--secondary");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "button-secondary.png"
    );
  });

  test("ghost variant", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-button--ghost");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "button-ghost.png"
    );
  });

  test("outline variant", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-button--outline");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "button-outline.png"
    );
  });

  test("all variants", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-button--all-variants");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "button-all-variants.png"
    );
  });

  test("all sizes", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-button--all-sizes");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "button-all-sizes.png"
    );
  });

  test("disabled state", async ({ page }) => {
    await page.goto("/iframe.html?id=primitives-button--disabled");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "button-disabled.png"
    );
  });
});
