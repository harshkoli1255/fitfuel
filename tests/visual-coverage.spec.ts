import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Load routes from the verification matrix
const routesPath = path.join(__dirname, '../reference-audit/route-verification.json');
const routesData = JSON.parse(fs.readFileSync(routesPath, 'utf8'));

test.describe('Full 42 Route Coverage', () => {
  const coverageReport = [];
  
  for (const route of routesData) {
    test(`Verify Route: ${route.url}`, async ({ page }) => {
      console.log(`Navigating to ${route.url}...`);
      
      const response = await page.goto(`http://localhost:3000${route.url}`, {
        waitUntil: 'domcontentloaded',
      });
      
      // Basic checks
      expect(response?.status()).toBe(200);
      
      const hasMain = await page.locator('main, div, h1').first().isVisible();
      expect(hasMain).toBeTruthy();
      
      // Update coverage array
      coverageReport.push({
        url: route.url,
        status: 200,
        verified: true,
        timestamp: new Date().toISOString()
      });
    });
  }
  
  test.afterAll(() => {
    fs.writeFileSync(
      path.join(__dirname, '../reference-audit/test-coverage.json'),
      JSON.stringify(coverageReport, null, 2)
    );
  });
});
