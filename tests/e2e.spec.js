import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
    test('index.html should match snapshot', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveScreenshot('index.png');
    });

    test('original.html should match snapshot', async ({ page }) => {
        await page.goto('/original.html');
        await expect(page).toHaveScreenshot('original.png');
    });

    test('scrap.html should match snapshot', async ({ page }) => {
        await page.goto('/scrap.html');
        await expect(page).toHaveScreenshot('scrap.png');
    });

    test('image view page should match snapshot', async ({ page }) => {
        await page.goto('/original.html#img001.jpg');
        // Wait for the image to be visible
        await page.waitForSelector('.row:target img');
        await expect(page).toHaveScreenshot('image-view.png');
    });
});

test.describe('E2E Tests', () => {
    test.describe('Common Elements', () => {
        ['/', '/original.html', '/scrap.html'].forEach((path) => {
            test(`Header and Footer on ${path}`, async ({ page }) => {
                await page.goto(path);

                // Title
                await expect(page).toHaveTitle(/RakugakiYa/);

                // Navigation
                const nav = page.locator('.navbar'); // Assuming bootstrap navbar
                await expect(nav).toBeVisible();
                await expect(nav.getByRole('link', { name: 'RakugakiYa' })).toBeVisible();
                await expect(nav.getByRole('link', { name: 'Original' })).toBeVisible();
                await expect(nav.getByRole('link', { name: 'Scrap' })).toBeVisible();
                await expect(nav.getByRole('link', { name: 'About me' })).toBeVisible();

                // Footer
                const footer = page.locator('footer');
                await expect(footer).toBeVisible();
                await expect(footer).toContainText('2005-2025, kinzal.net');
            });
        });
    });

    test('original.html content', async ({ page }) => {
        await page.goto('/original.html');

        // Check for images
        // The images are likely in a grid
        const images = page.locator('img');
        const count = await images.count();
        expect(count).toBeGreaterThan(0);

        // Check first image is visible (or at least attached if lazy loaded)
        await expect(images.first()).toBeAttached();
    });

    test('scrap.html content', async ({ page }) => {
        await page.goto('/scrap.html');

        const images = page.locator('img');
        const count = await images.count();
        expect(count).toBeGreaterThan(0);

        await expect(images.first()).toBeAttached();
    });

    test.describe('Image View Page', () => {
        test('navigate to image view via thumbnail click', async ({ page }) => {
            await page.goto('/original.html');

            // Click on a thumbnail to navigate to the view
            const thumbnail = page.locator('.thumbnail').first();
            await thumbnail.click();

            // URL should have hash
            await expect(page).toHaveURL(/#img/);

            // The target row should be visible (z-index puts it on top)
            const targetRow = page.locator('.row:target');
            await expect(targetRow).toBeVisible();

            // Image inside target row should be displayed
            const viewImage = targetRow.locator('img');
            await expect(viewImage).toBeVisible();
        });

        test('direct navigation to image view', async ({ page }) => {
            await page.goto('/original.html#img001.jpg');

            // The target row should be visible
            const targetRow = page.locator('.row:target');
            await expect(targetRow).toBeVisible();

            // Image should be displayed
            const viewImage = targetRow.locator('img');
            await expect(viewImage).toBeVisible();
        });

        test('image view on scrap page', async ({ page }) => {
            await page.goto('/scrap.html');

            // Click on a thumbnail
            const thumbnail = page.locator('.thumbnail').first();
            await thumbnail.click();

            // URL should have hash
            await expect(page).toHaveURL(/#img/);

            // Target row should be visible
            const targetRow = page.locator('.row:target');
            await expect(targetRow).toBeVisible();
        });
    });
});
