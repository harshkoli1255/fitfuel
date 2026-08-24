import { test, expect } from '@playwright/test';

test.describe('FitFuel E-Commerce Journey', () => {
  test('Complete shopping flow', async ({ page }) => {
    // 1. Homepage
    await page.goto('/');
    
    // Check elements exist
    await expect(page.locator('text=Fuel Your Ambition').first()).toBeVisible();
    await expect(page.locator('text=Shop by Category').first()).toBeVisible();

    // 2. Search Autocomplete
    await page.click('button[aria-label="Search"]');
    await page.fill('input[placeholder*="SEARCH"]', 'Whey');
    
    // Wait for dropdown results and click the first product link
    await expect(page.locator('text=/View all results for/i')).toBeVisible();
    await page.click('a[href*="/products/"] >> nth=0');
    
    // 3. Product Details Page (PDP)
    await page.waitForURL('**/products/*');
    await expect(page.locator('button', { hasText: /Add to Cart/i }).first()).toBeVisible();
    
    // 4. Variant Selection (if available)
    // Click a flavor if available
    const flavorBtn = page.locator('button', { hasText: 'Chocolate' }).first();
    if (await flavorBtn.isVisible()) {
      await flavorBtn.click();
    }

    // 5. Add to Cart
    await page.click('text=Add to Cart');
    
    // 6. Cart Drawer opens
    const drawer = page.locator('text=Your Cart');
    await expect(drawer.first()).toBeVisible();

    // Check quantity manipulation
    const plusBtn = page.locator('button[aria-label="Increase quantity"]').first();
    await plusBtn.click();
    await expect(page.locator('text=2').first()).toBeVisible();

    // 7. Checkout Flow
    await page.click('a:has-text("Checkout — ₹")');
    await expect(page).toHaveURL(/.*checkout/);
    
    // Step 1: Contact
    await page.fill('input[type="email"]', 'test@fitfuel.com');
    await page.click('text=Continue to Shipping');
    
    // Step 2: Shipping
    await page.fill('input[placeholder="First Name"]', 'Test');
    await page.fill('input[placeholder="Last Name"]', 'User');
    await page.fill('input[placeholder="Address"]', '123 Test St');
    await page.fill('input[placeholder="City"]', 'Mumbai');
    await page.fill('input[placeholder="Postal Code"]', '400001');
    await page.click('text=Continue to Payment');
    
    // Step 3: Payment
    await expect(page.locator('text=Complete Order').first()).toBeVisible();
    await page.click('text=Complete Order');
    
    // Success page
    await expect(page.locator('text=Order Confirmed!').first()).toBeVisible();
  });
});
