import { test, expect } from "@playwright/test";

test.describe("Image", () => {
  test("cover fit", async ({ page }) => {
    await page.goto("/iframe.html?id=media-image--cover");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "image-cover.png"
    );
  });

  test("contain fit", async ({ page }) => {
    await page.goto("/iframe.html?id=media-image--contain");
    await expect(page.locator("#storybook-root")).toHaveScreenshot(
      "image-contain.png"
    );
  });
});

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
});
