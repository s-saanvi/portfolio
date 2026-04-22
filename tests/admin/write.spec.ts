import { test, expect } from '@playwright/test';

test.describe('Blog Post Writing Form', () => {
  test('should fill out form, mock publish post and redirect to blog', async ({ page }) => {
    // Navigate to the write form page
    await page.goto('/admin/write');

    // Wait for the form to be visible
    await page.waitForSelector('#write-form');

    // Fill in the post title
    await page.fill('#title', 'E2E Test Post Title');

    // Fill in the short summary
    await page.fill('#summary', 'This is a test summary for the E2E test post.');

    // Fill in the content
    await page.fill('#content', 'This is the **markdown** content of the test post.');

    // Setup an event listener/handler to catch the mock success alert
    let alertHandled = false;
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Post successfully published! (Mock behavior)');
      await dialog.accept();
      alertHandled = true;
    });

    // Click the "Publish Post" button
    await page.click('button[type="submit"]');

    // Ensure the alert was handled
    expect(alertHandled).toBeTruthy();

    // The page should redirect to the /blog page
    // Using `waitForURL` instead of a hard match as Astro adds trailing slashes in some environments
    await page.waitForURL(/\/blog\/?$/);

    // Assert we're on the right page
    expect(page.url()).toMatch(/\/blog\/?$/);
  });
});
