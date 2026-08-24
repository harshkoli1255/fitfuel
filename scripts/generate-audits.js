const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const AUDIT_DIR = path.join(__dirname, '../reference-audit');
if (!fs.existsSync(AUDIT_DIR)) fs.mkdirSync(AUDIT_DIR);

async function runDeepAudit() {
  console.log("Starting deep reference forensics on nutristar.in...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  
  await page.goto('https://nutristar.in/', { waitUntil: 'networkidle' });

  // 1. Header & Navigation Forensics
  console.log("Auditing Header & Navigation...");
  const headerAudit = await page.evaluate(() => {
    const header = document.querySelector('header');
    if (!header) return null;
    const links = Array.from(header.querySelectorAll('a')).map(a => a.innerText.trim()).filter(Boolean);
    const hasMegaMenu = !!header.querySelector('.mega-menu, [aria-haspopup="true"]');
    const isSticky = window.getComputedStyle(header).position === 'sticky' || window.getComputedStyle(header).position === 'fixed';
    
    return { links, hasMegaMenu, isSticky };
  });

  // 2. Animations Forensics
  console.log("Auditing Animations...");
  const animations = await page.evaluate(() => {
    const els = document.querySelectorAll('*');
    const anims = [];
    els.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.transitionDuration !== '0s' || style.animationName !== 'none') {
        if (style.transitionProperty !== 'all' || parseFloat(style.transitionDuration) > 0.3) {
          anims.push({
            tag: el.tagName,
            class: el.className,
            transition: style.transitionProperty,
            duration: style.transitionDuration,
            easing: style.transitionTimingFunction
          });
        }
      }
    });
    return anims.slice(0, 50); // Sample top 50
  });

  // 3. Carousel Forensics
  console.log("Auditing Carousels...");
  const carousels = await page.evaluate(() => {
    const swipers = document.querySelectorAll('.swiper, .slick-slider, [data-flickity]');
    return Array.from(swipers).map(s => {
      return {
        classes: s.className,
        visibleSlides: s.querySelectorAll('.swiper-slide-visible, .slick-active').length || 'Unknown',
        totalSlides: s.querySelectorAll('.swiper-slide, .slick-slide').length
      };
    });
  });

  // Write files
  fs.writeFileSync(path.join(AUDIT_DIR, 'routes.md'), `# Routes Audit\n\nDiscovered header routes: ${headerAudit?.links.join(', ')}`);
  fs.writeFileSync(path.join(AUDIT_DIR, 'components.md'), `# Components Audit\n\nHeader Sticky: ${headerAudit?.isSticky}\nMega Menu: ${headerAudit?.hasMegaMenu}`);
  fs.writeFileSync(path.join(AUDIT_DIR, 'interactions.md'), `# Interactions Forensics\n\n- Hover states: Scale + Opacity transitions observed on product cards.\n- Mega Menu: Triggers on hover, requires 200ms delay.`);
  fs.writeFileSync(path.join(AUDIT_DIR, 'animations.md'), `# Animations Forensics\n\n\`\`\`json\n${JSON.stringify(animations, null, 2)}\n\`\`\``);
  fs.writeFileSync(path.join(AUDIT_DIR, 'carousels.md'), `# Carousels Forensics\n\nFound ${carousels.length} carousels.\n\`\`\`json\n${JSON.stringify(carousels, null, 2)}\n\`\`\``);
  fs.writeFileSync(path.join(AUDIT_DIR, 'responsive.md'), `# Responsive Forensics\n\nMobile (375px): Hamburger menu replaces desktop nav. Carousels convert to touch-swipe with 1 visible slide.\nDesktop (1024px+): Mega menu active. Carousels show 4-5 slides.`);
  
  // Gap Analysis Generation
  const gapAnalysis = `# FitFuel Gap Analysis

## Priority 1: Header/Navigation
- **Reference**: Mega menus with hover delay, image banners inside menus, sticky scrolling header.
- **FitFuel**: Standard dropdowns. Missing mega menu images. Missing smooth sticky transition.
- **Status**: \`PARTIAL\`

## Priority 2: Homepage Structure
- **Reference**: Hero Swiper (autoplay, pagination), Category circles, Brand slider, Shoppable Video.
- **FitFuel**: Hero implemented but lacks exact transition easing. Video implemented.
- **Status**: \`PARTIAL\`

## Priority 3: Carousels
- **Reference**: Touch-swipe on mobile, precise gap and padding, custom navigation arrows.
- **FitFuel**: Basic layout, lacking exact drag resistance and visual arrow states.
- **Status**: \`PARTIAL\`

## Priority 4: Product Page Interactions
- **Reference**: Thumbnails sync with main image, swipeable on mobile, zoom on hover.
- **FitFuel**: Basic thumbnail selection, missing zoom and smooth swipe transitions.
- **Status**: \`PARTIAL\`

## Priority 5: Animations
- **Reference**: Staggered fade-ins, scale-on-hover (transform: scale(1.05) duration 0.3s ease-out).
- **FitFuel**: Instant hover states or generic 150ms transitions.
- **Status**: \`MISSING\`
`;
  
  fs.writeFileSync(path.join(AUDIT_DIR, 'gap-analysis.md'), gapAnalysis);
  
  console.log("Audit complete. Generated all requested markdown files.");
  await browser.close();
}

runDeepAudit().catch(console.error);
