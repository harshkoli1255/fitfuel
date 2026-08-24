# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual-coverage.spec.ts >> Full 42 Route Coverage >> Verify Route: /collections/vitamins
- Location: tests/visual-coverage.spec.ts:13:9

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import fs from 'fs';
  3  | import path from 'path';
  4  | 
  5  | // Load routes from the verification matrix
  6  | const routesPath = path.join(__dirname, '../reference-audit/route-verification.json');
  7  | const routesData = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
  8  | 
  9  | test.describe('Full 42 Route Coverage', () => {
  10 |   const coverageReport = [];
  11 |   
  12 |   for (const route of routesData) {
  13 |     test(`Verify Route: ${route.url}`, async ({ page }) => {
  14 |       console.log(`Navigating to ${route.url}...`);
  15 |       
  16 |       const response = await page.goto(`http://localhost:3000${route.url}`, {
  17 |         waitUntil: 'domcontentloaded',
  18 |       });
  19 |       
  20 |       // Basic checks
  21 |       expect(response?.status()).toBe(200);
  22 |       
  23 |       const hasMain = await page.locator('main, div, h1').first().isVisible();
> 24 |       expect(hasMain).toBeTruthy();
     |                       ^ Error: expect(received).toBeTruthy()
  25 |       
  26 |       // Update coverage array
  27 |       coverageReport.push({
  28 |         url: route.url,
  29 |         status: 200,
  30 |         verified: true,
  31 |         timestamp: new Date().toISOString()
  32 |       });
  33 |     });
  34 |   }
  35 |   
  36 |   test.afterAll(() => {
  37 |     fs.writeFileSync(
  38 |       path.join(__dirname, '../reference-audit/test-coverage.json'),
  39 |       JSON.stringify(coverageReport, null, 2)
  40 |     );
  41 |   });
  42 | });
  43 | 
```