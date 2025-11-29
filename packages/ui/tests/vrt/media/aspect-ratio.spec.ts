import { test, expect } from "@playwright/test";

test.describe("AspectRatio", () => {
  test("square ratio", async ({ page }) => {
    await page.goto("/iframe.html?id=media-aspectratio--square");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "aspect-ratio-square.png"
    );
  });

  test("video ratio", async ({ page }) => {
    await page.goto("/iframe.html?id=media-aspectratio--video");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "aspect-ratio-video.png"
    );
  });

  test("portrait ratio", async ({ page }) => {
    await page.goto("/iframe.html?id=media-aspectratio--portrait");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "aspect-ratio-portrait.png"
    );
  });

  test("wide ratio", async ({ page }) => {
    await page.goto("/iframe.html?id=media-aspectratio--wide");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "aspect-ratio-wide.png"
    );
  });
});
