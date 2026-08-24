const fs = require('fs');
const path = require('path');

const routes = [
  { url: "/", type: "HOME" },
  { url: "/shop", type: "SHOP" },
  { url: "/collections/whey-proteins", type: "COLLECTION" },
  { url: "/collections/creatine", type: "COLLECTION" },
  { url: "/collections/mass-gainers", type: "COLLECTION" },
  { url: "/collections/pre-workouts", type: "COLLECTION" },
  { url: "/collections/bcaa", type: "COLLECTION" },
  { url: "/collections/fat-burners", type: "COLLECTION" },
  { url: "/collections/vitamins", type: "COLLECTION" },
  { url: "/collections/accessories", type: "COLLECTION" },
  { url: "/categories/protein", type: "CATEGORY" },
  { url: "/categories/creatine", type: "CATEGORY" },
  { url: "/categories/pre-workout", type: "CATEGORY" },
  { url: "/categories/recovery", type: "CATEGORY" },
  { url: "/brands/optimum-nutrition", type: "BRAND" },
  { url: "/brands/muscleblaze", type: "BRAND" },
  { url: "/brands/dymatize", type: "BRAND" },
  { url: "/brands/myprotein", type: "BRAND" },
  { url: "/brands/muscletech", type: "BRAND" },
  { url: "/products/on-gold-standard-100-whey-protein", type: "PRODUCT" },
  { url: "/products/muscleblaze-biozyme-performance-whey", type: "PRODUCT" },
  { url: "/products/dymatize-iso-100", type: "PRODUCT" },
  { url: "/products/muscletech-nitrotech-whey-protein", type: "PRODUCT" },
  { url: "/products/rc-pro-antium", type: "PRODUCT" },
  { url: "/products/on-micronized-creatine-powder", type: "PRODUCT" },
  { url: "/products/muscleblaze-creapro", type: "PRODUCT" },
  { url: "/products/cellucor-c4-original", type: "PRODUCT" },
  { url: "/products/xtend-bcaa", type: "PRODUCT" },
  { url: "/products/opti-men-multivitamin", type: "PRODUCT" },
  { url: "/search", type: "SEARCH" },
  { url: "/cart", type: "CART" },
  { url: "/checkout", type: "CHECKOUT" },
  { url: "/blogs", type: "BLOG_INDEX" },
  { url: "/blogs/the-ultimate-guide-to-maximize-your-gains", type: "BLOG_ARTICLE" },
  { url: "/blogs/understanding-creatine", type: "BLOG_ARTICLE" },
  { url: "/blogs/whey-vs-isolate", type: "BLOG_ARTICLE" },
  { url: "/about", type: "INFO" },
  { url: "/authenticity", type: "INFO" },
  { url: "/faq", type: "INFO" },
  { url: "/contact", type: "INFO" },
  { url: "/store-locator", type: "INFO" },
  { url: "/offers", type: "INFO" }
];

// Ensure we have exactly 42
console.log(`Generating matrix for ${routes.length} routes.`);

const matrix = routes.map(r => ({
  url: r.url,
  discovered: true,
  browserInspected: false,
  screenshotCaptured: false,
  sectionsInspected: false,
  interactionsInspected: false,
  animationsInspected: false,
  responsiveInspected: false,
  fitfuelImplemented: false,
  fitfuelVerified: false,
  visualCompared: false,
  status: "PENDING"
}));

const outDir = path.join(__dirname, '..', 'reference-audit');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'route-verification.json'), JSON.stringify(matrix, null, 2));
console.log('Verification matrix generated successfully at reference-audit/route-verification.json');
