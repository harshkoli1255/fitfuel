import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  console.log("Starting crawler...");
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  await page.goto('https://nutristar.in/', { waitUntil: 'domcontentloaded' });
  console.log("Homepage loaded.");
  
  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    return [...new Set(anchors.map(a => a.href).filter(href => href.startsWith('https://nutristar.in')))];
  });
  
  console.log(`Found ${links.length} unique links on homepage.`);
  
  fs.writeFileSync('reference-audit/raw-links.json', JSON.stringify(links, null, 2));
  
  await browser.close();
})();
