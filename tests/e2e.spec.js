import { test, expect } from '@playwright/test';

// Disable lazy loading flag - set this before page loads
const disableLazyLoadingScript = `window.__DISABLE_LAZY_LOADING__ = true;`;

// Helper function to wait for images to load
async function waitForImagesInViewport(page, timeout = 30000) {
    // Wait for thumbnail grid to appear
    await page.waitForSelector('[data-testid="thumbnail-grid"]');

    // Wait for at least one image to load (picture element with img inside)
    await page.waitForSelector('[data-testid="thumbnail-grid"] picture img', { timeout });

    // Wait for network idle to ensure images have loaded
    await page.waitForLoadState('networkidle');
}

// Setup test environment - disable lazy loading for consistent E2E tests
test.beforeEach(async ({ context }) => {
    await context.addInitScript(disableLazyLoadingScript);
});

test.describe('Visual Regression Tests', () => {
    test('index page should match snapshot', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('[data-testid="thumbnail-grid"]');
        // Wait for network idle - images may be lazy loaded
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot('index.png', { timeout: 15000 });
    });

    test('original page should match snapshot', async ({ page }) => {
        await page.goto('/original');
        await waitForImagesInViewport(page);
        await expect(page).toHaveScreenshot('original.png', { timeout: 15000 });
    });

    test('scrap page should match snapshot', async ({ page }) => {
        await page.goto('/scrap');
        await waitForImagesInViewport(page);
        await expect(page).toHaveScreenshot('scrap.png', { timeout: 15000 });
    });

    test('image view page should match snapshot', async ({ page }) => {
        await page.goto('/original#img001.jpg');
        // Wait for the specific viewer (identified by id matching the hash) to appear
        await page.waitForSelector('[id="img001.jpg"][data-testid="image-viewer"]');
        // Wait for the image inside the target viewer to be visible (not hidden)
        await page.waitForSelector('[id="img001.jpg"] picture img:not(.hidden)', { timeout: 30000 });
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot('image-view.png', { timeout: 15000 });
    });
});

test.describe('E2E Tests', () => {
    test('debug - check lazy loading flag', async ({ page }) => {
        // Capture console messages
        const consoleMessages = [];
        page.on('console', msg => {
            consoleMessages.push({ type: msg.type(), text: msg.text() });
        });

        await page.goto('/original');

        // Wait for thumbnail grid to appear (React rendering)
        await page.waitForSelector('[data-testid="thumbnail-grid"]');

        // Check if the flag is set
        const flagValue = await page.evaluate(() => window.__DISABLE_LAZY_LOADING__);
        console.log('Flag value:', flagValue);

        // Also check for thumbnail grid
        const gridExists = await page.evaluate(() =>
            document.querySelector('[data-testid="thumbnail-grid"]') !== null
        );
        console.log('Grid exists:', gridExists);

        // Wait longer for async image loading to complete
        await page.waitForTimeout(10000);

        // Count picture elements
        const pictureCount = await page.evaluate(() =>
            document.querySelectorAll('[data-testid="thumbnail-grid"] picture').length
        );
        console.log('Picture count:', pictureCount);

        // Check img elements
        const imgCount = await page.evaluate(() =>
            document.querySelectorAll('[data-testid="thumbnail-grid"] img').length
        );
        console.log('Img count:', imgCount);

        // Check div placeholders (should be there if images not loading)
        const placeholders = await page.evaluate(() =>
            document.querySelectorAll('[data-testid="thumbnail-grid"] > * > a > div').length
        );
        console.log('Placeholder count:', placeholders);

        // Log console messages from the page
        console.log('Console messages:', JSON.stringify(consoleMessages.filter(m => m.type === 'error' || m.type === 'warning'), null, 2));

        expect(pictureCount).toBeGreaterThan(0);
    });

    test.describe('Common Elements', () => {
        ['/', '/original', '/scrap'].forEach((path) => {
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

    test('original page content', async ({ page }) => {
        await page.goto('/original');
        await waitForImagesInViewport(page);

        const images = page.locator('[data-testid="thumbnail-grid"] picture img');
        const count = await images.count();
        expect(count).toBeGreaterThan(0);
    });

    test('scrap page content', async ({ page }) => {
        await page.goto('/scrap');
        await waitForImagesInViewport(page);

        const images = page.locator('[data-testid="thumbnail-grid"] picture img');
        const count = await images.count();
        expect(count).toBeGreaterThan(0);
    });

    test.describe('Image View Page', () => {
        test('navigate to image view via thumbnail click', async ({ page }) => {
            await page.goto('/original');
            await waitForImagesInViewport(page);

            // Click on a thumbnail to navigate to the view
            const thumbnail = page.locator('[data-testid="thumbnail-grid"] a').first();
            await thumbnail.click();

            // URL should have hash
            await expect(page).toHaveURL(/#img/);

            // Get the hash from the URL to find the targeted element
            const url = page.url();
            const hash = new URL(url).hash.slice(1); // Remove the '#'

            // The target viewer should be visible (z-index puts it on top)
            const targetViewer = page.locator(`[id="${hash}"][data-testid="image-viewer"]`);
            await expect(targetViewer).toBeVisible({ timeout: 10000 });

            // Image inside target viewer should be displayed (picture element with img)
            const viewImage = targetViewer.locator('picture img');
            await expect(viewImage).toBeVisible({ timeout: 30000 });
        });

        test('direct navigation to image view', async ({ page }) => {
            await page.goto('/original#img001.jpg');

            // Wait for page to stabilize
            await page.waitForSelector('[data-testid="image-viewer"]');

            // The target viewer should be visible
            const targetViewer = page.locator('[id="img001.jpg"][data-testid="image-viewer"]');
            await expect(targetViewer).toBeVisible({ timeout: 10000 });

            // Image should be displayed (picture element with img)
            const viewImage = targetViewer.locator('picture img');
            await expect(viewImage).toBeVisible({ timeout: 30000 });
        });

        test('image view on scrap page', async ({ page }) => {
            await page.goto('/scrap');
            await waitForImagesInViewport(page);

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
            await expect(targetViewer).toBeVisible({ timeout: 10000 });
        });
    });
});
