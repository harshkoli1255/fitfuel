import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  
  await page.goto('https://nutristar.in/', { waitUntil: 'domcontentloaded' });
  
  const data = await page.evaluate(() => {
    // 1. Header Navigation
    const navLinks = Array.from(document.querySelectorAll('header nav a, .header a')).map(a => ({
      text: a.innerText.trim(),
      href: a.href
    })).filter(a => a.text);

    // 2. Main Sections
    const sections = Array.from(document.querySelectorAll('main > section, main > div')).map((sec, i) => {
      return {
        index: i,
        id: sec.id || '',
        classes: sec.className || '',
        textSummary: sec.innerText.substring(0, 50).replace(/\n/g, ' ')
      };
    }).filter(s => s.textSummary || s.classes);

    // 3. Carousels
    const carousels = Array.from(document.querySelectorAll('.slick-slider, .swiper, [class*="carousel"], [class*="slider"]')).map(el => {
      return {
        classes: el.className,
        slidesCount: el.querySelectorAll('.slick-slide, .swiper-slide, [class*="slide"]').length
      };
    });

    // 4. Media (Images and Videos)
    const media = Array.from(document.querySelectorAll('img, video')).map(m => {
      return {
        type: m.tagName,
        src: m.src || m.getAttribute('data-src'),
        width: m.clientWidth,
        height: m.clientHeight
      };
    }).filter(m => m.width > 50 && m.height > 50);

    return { navLinks, sections, carousels, media };
  });

  fs.writeFileSync('reference-audit/homepage-audit.json', JSON.stringify(data, null, 2));
  
  await browser.close();
})();
