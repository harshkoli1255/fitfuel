const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/products/weider-premium-performance-stack-180-capsules');
  await page.waitForLoadState('networkidle');
  
  // Hover over 'Shop All'
  await page.hover('text=Shop All');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mega_menu_top.png' });
  
  await browser.close();
})();
