import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:3000/products/product-1-premium-nutrition');
  await page.waitForLoadState('networkidle');
  
  const bodyText = await page.locator('body').innerText();
  console.log("Body text:\n", bodyText);
  
  await browser.close();
})();
