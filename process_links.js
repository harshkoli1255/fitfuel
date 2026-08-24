import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('reference-audit/raw-links.json', 'utf8'));

// Filter out internal non-page links
const filtered = raw.filter(link => {
  if (link.includes('facebook.com')) return false;
  if (link.includes('instagram.com')) return false;
  if (link.includes('twitter.com')) return false;
  if (link.includes('youtube.com')) return false;
  if (link.includes('.jpg') || link.includes('.png') || link.includes('.webp')) return false;
  if (link.includes('?')) return false; // Ignore query params for base route counting
  return true;
});

const uniquePaths = [...new Set(filtered.map(l => new URL(l).pathname))].sort();

let markdown = `# Nutristar Reference Routes Inventory

## Route Discovery
Total unique base routes discovered from homepage navigation: ${uniquePaths.length}

| Route Path | Categorization | Status |
|------------|----------------|--------|
`;

for (const p of uniquePaths) {
  let category = "OTHER";
  if (p === "/" || p === "") category = "HOME";
  else if (p.startsWith("/collections/all")) category = "CATALOG";
  else if (p.startsWith("/collections/")) category = "COLLECTION";
  else if (p.startsWith("/products/")) category = "PRODUCT";
  else if (p.startsWith("/pages/")) {
    const page = p.replace("/pages/", "");
    if (["about-us", "contact-us", "faq", "authenticity", "return-policy", "shipping-policy"].includes(page)) category = "INFORMATIONAL";
    else if (page.includes("offer") || page.includes("sale")) category = "PROMOTIONAL";
    else category = "INFORMATIONAL";
  }
  else if (p.startsWith("/blogs/")) category = "BLOG";
  else if (p.startsWith("/account")) category = "ACCOUNT";
  else if (p.startsWith("/search")) category = "SEARCH";
  else if (p.startsWith("/cart") || p.startsWith("/checkout")) category = "CART/CHECKOUT";
  
  markdown += `| ${p} | ${category} | Discovered |\n`;
}

fs.writeFileSync('reference-audit/routes.md', markdown);
console.log(`Generated routes.md with ${uniquePaths.length} routes.`);
