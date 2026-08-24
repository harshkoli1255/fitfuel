import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ROUTES_TO_CRAWL = [
  'https://nutristar.in/',
  'https://nutristar.in/collections/all',
  'https://nutristar.in/collections/proteins',
  'https://nutristar.in/products/ripped-up-nutrition-next-gen-protein',
  'https://nutristar.in/pages/about-us',
  'https://nutristar.in/blogs/news',
  'https://nutristar.in/pages/offers'
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  if (!fs.existsSync('reference-audit')) fs.mkdirSync('reference-audit');
  if (!fs.existsSync('reference-audit/screenshots')) fs.mkdirSync('reference-audit/screenshots');

  const mediaInventory = [];
  const animationInventory = [];
  const carouselInventory = [];

  for (const route of ROUTES_TO_CRAWL) {
    console.log(`Crawling: ${route}`);
    const page = await context.newPage();
    try {
      await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 30000 });
      
      // Wait for a bit for images to load
      await page.waitForTimeout(2000);
      
      // Take screenshot
      const urlPath = new URL(route).pathname.replace(/\//g, '_') || 'home';
      await page.screenshot({ path: `reference-audit/screenshots/${urlPath}.png`, fullPage: true });

      const data = await page.evaluate(() => {
        const media = [];
        // Images
        document.querySelectorAll('img').forEach(img => {
          if (img.clientWidth > 50 && img.clientHeight > 50) {
            media.push({
              type: 'image',
              src: img.currentSrc || img.src,
              width: img.clientWidth,
              height: img.clientHeight,
              aspectRatio: (img.clientWidth / img.clientHeight).toFixed(2),
              lazy: img.loading === 'lazy',
              alt: img.alt
            });
          }
        });
        
        // Background images
        document.querySelectorAll('*').forEach(el => {
          const bg = window.getComputedStyle(el).backgroundImage;
          if (bg && bg !== 'none' && bg.includes('url')) {
             if (el.clientWidth > 50 && el.clientHeight > 50) {
                media.push({
                  type: 'css-background',
                  src: bg.replace(/url\(['"]?(.*?)['"]?\)/i, '$1'),
                  width: el.clientWidth,
                  height: el.clientHeight
                });
             }
          }
        });

        // Videos
        document.querySelectorAll('video, iframe').forEach(vid => {
          media.push({
            type: vid.tagName.toLowerCase(),
            src: vid.src,
            width: vid.clientWidth,
            height: vid.clientHeight,
            poster: vid.poster || null,
            autoplay: vid.autoplay || null,
            loop: vid.loop || null
          });
        });

        // Animations (CSS transitions)
        const animations = [];
        document.querySelectorAll('*').forEach(el => {
          const style = window.getComputedStyle(el);
          if (style.transitionDuration && style.transitionDuration !== '0s') {
            if (el.className && typeof el.className === 'string' && el.className.trim() !== '') {
              animations.push({
                selector: el.className,
                transition: style.transitionProperty,
                duration: style.transitionDuration
              });
            }
          }
        });

        // Carousels
        const carousels = [];
        document.querySelectorAll('.slick-slider, .swiper, [class*="carousel"], [class*="slider"]').forEach(el => {
          carousels.push({
            className: el.className,
            slides: el.querySelectorAll('.slick-slide, .swiper-slide, [class*="slide"]').length
          });
        });

        return { media, animations: animations.slice(0, 50), carousels }; // Limit animations to prevent massive JSON
      });

      data.media.forEach(m => mediaInventory.push({ route, ...m }));
      data.animations.forEach(a => animationInventory.push({ route, ...a }));
      data.carousels.forEach(c => carouselInventory.push({ route, ...c }));

    } catch (e) {
      console.error(`Failed on ${route}`, e.message);
    }
    await page.close();
  }

  fs.writeFileSync('reference-audit/media.json', JSON.stringify(mediaInventory, null, 2));
  fs.writeFileSync('reference-audit/animations.json', JSON.stringify(animationInventory, null, 2));
  fs.writeFileSync('reference-audit/carousels.json', JSON.stringify(carouselInventory, null, 2));

  console.log("Crawl complete. JSON inventories generated.");
  await browser.close();
})();
