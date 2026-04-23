import { test, expect } from '@playwright/test';

test.describe('Admin Login', () => {
  test('should login successfully with correct credentials', async ({ page }) => {
    await page.goto('/admin/login');

    // Fill the login form
    await page.fill('#username', 'admin');
    await page.fill('#password', 'password');

    // Submit the form
    await page.click('button[type="submit"]');

    // Check if it redirected to /admin/write
    await expect(page).toHaveURL(/\/admin\/write$/);
  });

  test('should show error message with incorrect credentials', async ({ page }) => {
    await page.goto('/admin/login');

    // Fill the login form with wrong credentials
    await page.fill('#username', 'admin');
    await page.fill('#password', 'wrongpassword');

    // Submit the form
    await page.click('button[type="submit"]');

    // Check if error message is visible (doesn't have 'hidden' class)
    const errorMessage = page.locator('#error-message');
    await expect(errorMessage).not.toHaveClass(/hidden/);
    await expect(errorMessage).toBeVisible();
  });
});
