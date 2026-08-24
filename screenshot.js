const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/products/weider-premium-performance-stack-180-capsules');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'product_top.png' });
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'product_scrolled.png' });
  await browser.close();
})();
