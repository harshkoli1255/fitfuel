const { chromium } = require('@playwright/test');

async function extract() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('https://nutristar.in/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000); // Wait for Quinn
  
  const videos = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('video')).map(v => v.src || v.querySelector('source')?.src).filter(Boolean);
  });
  
  console.log("VIDEOS:", JSON.stringify(videos, null, 2));
  await browser.close();
}
extract().catch(console.error);
