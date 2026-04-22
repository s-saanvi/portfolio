import { test, expect } from '@playwright/test';

test('Contact form submission should not reload the page', async ({ page }) => {
  await page.goto('http://localhost:4321/contact');

  // Fill the form
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="message"]', 'This is a test message.');

  // Set up a listener to catch if a navigation/reload happens
  let reloaded = false;
  page.on('framenavigated', () => {
    reloaded = true;
  });

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for a short time to see if reload happens
  await page.waitForTimeout(1000);

  // Assert that the page did not reload
  expect(reloaded).toBe(false);

  // Verify that the fields still have their values (since it's a preventDefault and we don't clear them in the current logic)
  await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
});
