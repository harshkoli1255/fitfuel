const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const AUDIT_DIR = path.join(__dirname, '../reference-audit');
const SCREENSHOT_DIR = path.join(AUDIT_DIR, 'screenshots');
if (!fs.existsSync(AUDIT_DIR)) fs.mkdirSync(AUDIT_DIR);
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR);

const discoveredRoutes = new Set(['https://nutristar.in/']);
const pagesToCrawl = [
  'https://nutristar.in/',
  'https://nutristar.in/collections/all', // Catalog
  'https://nutristar.in/pages/about-us', // Informational
  'https://nutristar.in/blogs/news' // Blog
];
// Will add more dynamic PDPs later

async function crawlSitemap() {
  console.log("Fetching sitemap...");
  try {
    const res = await fetch('https://nutristar.in/sitemap.xml');
    const text = await res.text();
    const urls = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    console.log(`Discovered ${urls.length} sitemap indexes.`);
    
    // Fetch products sitemap specifically
    const prodSitemap = urls.find(u => u.includes('products'));
    if (prodSitemap) {
      const prodRes = await fetch(prodSitemap);
      const prodText = await prodRes.text();
      const pUrls = [...prodText.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
      
      // Sample 3 distinct product pages for deep visual inspection
      if (pUrls[0]) pagesToCrawl.push(pUrls[0]);
      if (pUrls[Math.floor(pUrls.length/2)]) pagesToCrawl.push(pUrls[Math.floor(pUrls.length/2)]);
      if (pUrls[pUrls.length-1]) pagesToCrawl.push(pUrls[pUrls.length-1]);
      
      pUrls.forEach(u => discoveredRoutes.add(u));
    }
  } catch (e) {
    console.error("Sitemap fetch failed", e);
  }
}

async function exhaustiveCrawl() {
  await crawlSitemap();
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  const routesManifest = [];
  const interactionsManifest = [];
  
  for (const url of pagesToCrawl) {
    console.log(`Crawling ${url}...`);
    const page = await context.newPage();
    const slug = new URL(url).pathname.replace(/[^a-zA-Z0-9]/g, '-') || 'homepage';
    
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Desktop Screenshot
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${slug}-desktop-viewport.png`) });
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${slug}-desktop-full.png`), fullPage: true });

      // Mobile Context
      const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true });
      const mPage = await mobileContext.newPage();
      await mPage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await mPage.screenshot({ path: path.join(SCREENSHOT_DIR, `${slug}-mobile-viewport.png`) });
      await mPage.screenshot({ path: path.join(SCREENSHOT_DIR, `${slug}-mobile-full.png`), fullPage: true });
      await mobileContext.close();

      // Deep Interaction Inspection
      const pageType = url.includes('/products/') ? 'PRODUCT' 
                     : url.includes('/collections/') ? 'COLLECTION'
                     : url.includes('/blogs/') ? 'BLOG'
                     : url === 'https://nutristar.in/' ? 'HOME'
                     : 'INFORMATIONAL';
                     
      routesManifest.push({
        url,
        type: pageType,
        title: await page.title(),
        implementationStatus: "PENDING"
      });

      // Video & Media Inspection
      const videos = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('video, iframe')).map(v => ({
          tag: v.tagName,
          src: v.src || v.querySelector('source')?.src,
          autoplay: v.autoplay,
          loop: v.loop
        }));
      });

      interactionsManifest.push({
        url,
        videosFound: videos,
        carouselsFound: await page.evaluate(() => document.querySelectorAll('.swiper, .slick-slider').length)
      });
      
    } catch (e) {
      console.error(`Failed to crawl ${url}:`, e);
    }
    await page.close();
  }

  // Generate Files
  fs.writeFileSync(path.join(AUDIT_DIR, 'routes.json'), JSON.stringify(routesManifest, null, 2));
  fs.writeFileSync(path.join(AUDIT_DIR, 'interactions.json'), JSON.stringify(interactionsManifest, null, 2));
  fs.writeFileSync(path.join(AUDIT_DIR, 'README.md'), `# Nutristar Reference Mirror Map\n\nTotal Discovered Routes in Sitemap: ${discoveredRoutes.size}\nDeep Crawled Pages: ${pagesToCrawl.length}\nAll screenshots captured in \`screenshots/\`.`);

  await browser.close();
  console.log("Exhaustive crawl completed. Saved to reference-audit/");
}

exhaustiveCrawl().catch(console.error);
