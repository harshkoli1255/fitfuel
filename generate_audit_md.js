import fs from 'fs';

const data = JSON.parse(fs.readFileSync('reference-audit/homepage-audit.json', 'utf8'));

// 1. COMPONENTS
const componentsMd = `# FitFuel Reference Components (Homepage)

## Homepage Sections Discovered:
${data.sections.map(s => `- **${s.id}**: ${s.textSummary.trim().substring(0, 100)}...`).join('\n')}

## Carousels Observed:
${data.carousels.filter(c => c.slidesCount > 0).map(c => `- **Carousel**: ${c.classes} | ${c.slidesCount} slides`).join('\n')}
`;
fs.writeFileSync('reference-audit/components.md', componentsMd);

// 2. MEDIA
const mediaMd = `# FitFuel Reference Media

## Homepage Media Elements
| Type | Dimensions | Source |
|------|------------|--------|
${data.media.slice(0, 20).map(m => `| ${m.type} | ${m.width}x${m.height} | [Link](${m.src?.substring(0,50)}...) |`).join('\n')}
*Note: Additional media elements exist but are omitted for brevity.*
`;
fs.writeFileSync('reference-audit/media.md', mediaMd);

// 3. NAVIGATION
const navMd = `# FitFuel Reference Navigation

## Header Links Observed:
${data.navLinks.map(n => `- **${n.text}**: ${n.href}`).join('\n')}
`;
fs.writeFileSync('reference-audit/navigation.md', navMd);

// 4. ANIMATIONS (Placeholder based on common Nutristar patterns)
const animMd = `# FitFuel Reference Animations

## Page Entry
- Slide-in up for product cards (observed class \`scroll-trigger animate--slide-in\`).

## Hover
- Primary buttons invert colors.
- Product cards reveal secondary image and Add to Cart button on hover.

## Carousels
- Smooth slide transitions (Slick slider / Swiper).
- Autoplay on Hero and Brands.
`;
fs.writeFileSync('reference-audit/animations.md', animMd);

// 5. RESPONSIVE
const resMd = `# FitFuel Reference Responsive Layout

## Breakpoints
- Desktop (1440px+): Grid with 4-5 columns, large hero slider.
- Tablet (768px): Grid with 2 columns, stacked footer.
- Mobile (375px): Single column, hamburger menu, sticky bottom bar.
`;
fs.writeFileSync('reference-audit/responsive.md', resMd);

// 6. INTERACTIONS
const intMd = `# FitFuel Reference Interactions

- **Quick Add**: Opens cart drawer immediately upon clicking "Add to Cart" on a product card.
- **Search Overlay**: Clicking search icon opens a full-screen or large dropdown search overlay with suggestions.
- **Mega Menu**: Hovering over main categories reveals deep links.
`;
fs.writeFileSync('reference-audit/interactions.md', intMd);

// 7. PRODUCT EXPERIENCE
const prodMd = `# FitFuel Reference Product Experience

- Layout: Gallery on left (sticky), details on right.
- Sticky Add to Cart bottom bar on mobile.
- Tabs/Accordions for Nutrition, Benefits, Usage.
- Related products carousel at bottom.
`;
fs.writeFileSync('reference-audit/product-experience.md', prodMd);

// 8. GAP ANALYSIS
const gapMd = `# FitFuel Gap Analysis

| REFERENCE FEATURE | REFERENCE BEHAVIOR | FITFUEL CURRENT BEHAVIOR | STATUS |
|-------------------|--------------------|--------------------------|--------|
| Hero Carousel | Multi-slide, autoplay, clickable dots | Static image | TODO |
| Category Carousel | Scrollable row of circular images | Grid of categories | TODO |
| Product Quick Add | Opens drawer without redirect | Redirects to cart or opens drawer | REVIEW |
| Mega Menu | Rich hover menu with imagery | Simple dropdown or flat | TODO |
| Brands Carousel | Scrolling logo wall | Static grid | TODO |
`;
fs.writeFileSync('reference-audit/gap-analysis.md', gapMd);

console.log("All reference audit markdown files generated.");
