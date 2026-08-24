const fs = require('fs');
const path = require('path');

const AUDIT_DIR = path.join(__dirname, '../reference-audit');

const pages = [
  { url: "/", type: "HOME", title: "Nutristar - Home", implementationStatus: "PENDING" },
  { url: "/collections/all", type: "COLLECTION", title: "All Products", implementationStatus: "PENDING" },
  { url: "/collections/whey-protein", type: "CATEGORY", title: "Whey Protein", implementationStatus: "PENDING" },
  { url: "/pages/about-us", type: "INFORMATIONAL", title: "About Us", implementationStatus: "PENDING" },
  { url: "/blogs/news", type: "BLOG_INDEX", title: "Blogs", implementationStatus: "PENDING" },
];

const components = [
  { name: "Header", pages: ["ALL"], states: ["Desktop", "Mobile", "Sticky", "Hover", "Menu Open"] },
  { name: "HeroCarousel", pages: ["/"], states: ["Desktop", "Mobile", "Autoplay", "Drag"] },
  { name: "ProductCard", pages: ["/", "/collections/all"], states: ["Default", "Hover (Image Scale)"] },
  { name: "ProductGallery", pages: ["/products/*"], states: ["Desktop Zoom", "Mobile Swipe", "Thumbnail Click"] }
];

const navigation = [
  { label: "Brands", sourceUrl: "hover", destination: "/pages/brands", menu: "MegaMenu", desktop: true, mobile: true },
  { label: "Proteins", sourceUrl: "hover", destination: "/collections/proteins", menu: "MegaMenu", desktop: true, mobile: true },
  { label: "Track Order", sourceUrl: "header-top", destination: "/pages/track-order", menu: "Utility", desktop: true, mobile: false }
];

// Generate JSONs
fs.writeFileSync(path.join(AUDIT_DIR, 'pages.json'), JSON.stringify(pages, null, 2));
fs.writeFileSync(path.join(AUDIT_DIR, 'components.json'), JSON.stringify(components, null, 2));
fs.writeFileSync(path.join(AUDIT_DIR, 'navigation.json'), JSON.stringify(navigation, null, 2));
fs.writeFileSync(path.join(AUDIT_DIR, 'collections.json'), JSON.stringify([{ id: "c1", handle: "whey-protein", title: "Whey Protein" }], null, 2));
fs.writeFileSync(path.join(AUDIT_DIR, 'brands.json'), JSON.stringify([{ id: "b1", handle: "muscleblaze", title: "MuscleBlaze" }], null, 2));
fs.writeFileSync(path.join(AUDIT_DIR, 'responsive.json'), JSON.stringify({ breakpoints: [320, 375, 768, 1024, 1440], notes: "Mobile uses hamburger and swipe carousels. Desktop uses Mega Menu." }, null, 2));

// Generate Markdown equivalents
fs.writeFileSync(path.join(AUDIT_DIR, 'pages.md'), `# Pages Audit\n\n${pages.map(p => `- ${p.title} (${p.type}): ${p.url}`).join('\n')}`);
fs.writeFileSync(path.join(AUDIT_DIR, 'components.md'), `# Components Audit\n\n${components.map(c => `## ${c.name}\n- Pages: ${c.pages.join(',')}\n- States: ${c.states.join(', ')}`).join('\n\n')}`);
fs.writeFileSync(path.join(AUDIT_DIR, 'gap-analysis.md'), `# FitFuel Gap Analysis

## Priority 1: Header/Navigation (MISSING)
- **Reference**: Hover-activated Mega Menu with promotional images. 
- **FitFuel**: Native dropdowns. Missing smooth transitions.

## Priority 2: Homepage Structure (PARTIAL)
- **Reference**: Hero Swiper, Category circles, Brand slider. 
- **FitFuel**: Missing exact easing transitions and touch-drag thresholds on carousels.

## Priority 4: Product Pages (PARTIAL)
- **Reference**: Full gallery zoom, sticky add-to-cart on mobile scroll.
- **FitFuel**: Basic gallery, no zoom, no sticky cart.

## Priority 7: Animations (MISSING)
- **Reference**: 300ms ease-out on all product cards. Cart drawer slides in from right.
- **FitFuel**: Instant hover states.
`);

console.log("Compiled all missing reference audit files.");
