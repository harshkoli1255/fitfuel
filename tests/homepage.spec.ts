import { test, expect } from '@playwright/test';

test.describe('FitFuel Homepage Navigation and Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Mega menu interaction', async ({ page }) => {
    // Only test on desktop layout
    if (page.viewportSize()?.width && page.viewportSize()!.width >= 1024) {
      const shopLink = page.locator('text=Shop All');
      await expect(shopLink).toBeVisible();
      
      // Hover to open mega menu
      await shopLink.hover();
      
      // Check if Categories and Brands become visible inside the mega menu
      const megaMenu = page.locator('nav').locator('text=Categories').first();
      await expect(megaMenu).toBeVisible();
      await expect(page.locator('text=Featured Brands').first()).toBeVisible();
      await expect(page.locator('text=New Arrivals').last()).toBeVisible();
    }
  });

  test('Hero carousel interaction', async ({ page }) => {
    const heroSection = page.locator('.touch-pan-y').first();
    await expect(heroSection).toBeVisible();
    
    // Check for arrows
    const nextBtn = page.locator('button .lucide-chevron-right').first();
    await expect(nextBtn).toBeVisible();
    await nextBtn.click({ force: true });
  });

  test('Category carousel visibility', async ({ page }) => {
    await expect(page.locator('h2:has-text("Shop by Category")')).toBeVisible();
    const catImages = page.locator('a[href*="/categories/"] img').first();
    await expect(catImages).toBeVisible();
  });

  test('Brand carousel visibility', async ({ page }) => {
    const brandSection = page.locator('section:has(h2:has-text("Popular Brands"))');
    await expect(brandSection).toBeVisible();
    
    // Check links specifically inside the carousel section
    const brandLinks = brandSection.locator('a[href*="/brands/"]').first();
    await expect(brandLinks).toBeVisible();
  });

  test('Shoppable Video functionality', async ({ page }) => {
    await expect(page.locator('h2:has-text("FitFuel TV")')).toBeVisible();
    const video = page.locator('video').first();
    await expect(video).toBeVisible();
    
    // Check overlay
    await expect(page.locator('text=Form Check').first()).toBeVisible();
  });

  test('Blog section visibility', async ({ page }) => {
    await expect(page.locator('h2:has-text("FitFuel Knowledge")')).toBeVisible();
    await expect(page.locator('text=Featured Article').first()).toBeVisible();
    const blogLink = page.locator('a[href*="/blogs/"]').first();
    await expect(blogLink).toBeVisible();
  });
});
