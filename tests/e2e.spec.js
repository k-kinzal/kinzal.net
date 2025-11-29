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
        // Wait for the image to be visible - :target works with element ID
        // The ImageViewer has id={img} and data-testid="image-viewer"
        await page.waitForSelector('#img001\\.jpg img', { state: 'visible' });
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

                // Navigation (header element contains nav)
                const header = page.locator('header');
                await expect(header).toBeVisible();
                await expect(header.getByRole('link', { name: 'RakugakiYa' })).toBeVisible();
                await expect(header.getByRole('link', { name: 'Original' })).toBeVisible();
                await expect(header.getByRole('link', { name: 'Scrap' })).toBeVisible();
                await expect(header.getByRole('link', { name: 'About me' })).toBeVisible();

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
            const thumbnail = page.locator('[data-testid="thumbnail-grid"] a').first();
            await thumbnail.click();

            // URL should have hash
            await expect(page).toHaveURL(/#img/);

            // Get the hash from the URL to find the targeted element
            const url = page.url();
            const hash = new URL(url).hash.slice(1); // Remove the '#'

            // The target viewer should be visible (z-index puts it on top)
            // Use CSS.escape equivalent for the ID selector
            const targetViewer = page.locator(`[id="${hash}"][data-testid="image-viewer"]`);
            await expect(targetViewer).toBeVisible();

            // Image inside target viewer should be displayed
            const viewImage = targetViewer.locator('img');
            await expect(viewImage).toBeVisible();
        });

        test('direct navigation to image view', async ({ page }) => {
            await page.goto('/original.html#img001.jpg');

            // The target viewer should be visible
            // Use attribute selector for ID with dots
            const targetViewer = page.locator('[id="img001.jpg"][data-testid="image-viewer"]');
            await expect(targetViewer).toBeVisible();

            // Image should be displayed
            const viewImage = targetViewer.locator('img');
            await expect(viewImage).toBeVisible();
        });

        test('image view on scrap page', async ({ page }) => {
            await page.goto('/scrap.html');

            // Click on a thumbnail
            const thumbnail = page.locator('[data-testid="thumbnail-grid"] a').first();
            await thumbnail.click();

            // URL should have hash
            await expect(page).toHaveURL(/#img/);

            // Get the hash from the URL to find the targeted element
            const url = page.url();
            const hash = new URL(url).hash.slice(1); // Remove the '#'

            // Target viewer should be visible
            const targetViewer = page.locator(`[id="${hash}"][data-testid="image-viewer"]`);
            await expect(targetViewer).toBeVisible();
        });
    });
});
