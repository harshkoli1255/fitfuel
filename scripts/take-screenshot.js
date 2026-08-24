const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function capture() {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1080 }
  });

  const page = await context.newPage();
  const outDir = path.join(__dirname, '..', 'reference-audit');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  try {
    console.log('Navigating to authenticity...');
    await page.goto('https://nutristar.in/pages/authenticity', { waitUntil: 'domcontentloaded' });
    // wait 2 seconds for JS to run
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(outDir, 'authenticity.png'), fullPage: true });

    console.log('Navigating to blog index...');
    await page.goto('https://nutristar.in/blogs/blog', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(outDir, 'blog.png'), fullPage: true });

  } catch (error) {
    console.error('Error during capture:', error);
  }

  await browser.close();
  console.log('Done.');
}

capture();
