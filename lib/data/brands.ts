import { Brand } from "@/types";

// Brand IDs MUST match the brandId values in generated-products.json
// Actual brandIds found: "bfs","nutristar","atn-imported","ripped-up-nutrition","global-impex",
// "yourhappylife","protein-kart","himalayan-organics","gayor-essentials","simply-herbal",
// "khandelwal-enterprises","proteinxpres","ace-blend","trunativ","swisse"
// Plus legacy slugs from older entries:
// "muscleblaze","optimum-nutrition","as-it-is","myprotein","gnc","scivation","isopure","dymatize","fastandup","yogabar"

export const BRANDS: Brand[] = [
  { id: "nutristar", slug: "nutristar", name: "Nutristar", logo: "https://ui-avatars.com/api/?name=Nutristar&background=FF6B00&color=fff", productCount: 50, description: "India's leading sports nutrition platform with authentic supplements." },
  { id: "muscleblaze", slug: "muscleblaze", name: "MuscleBlaze", logo: "https://ui-avatars.com/api/?name=MuscleBlaze&background=1a1a1a&color=fff", productCount: 45, description: "India's top sports nutrition brand trusted by millions." },
  { id: "optimum-nutrition", slug: "optimum-nutrition", name: "Optimum Nutrition", logo: "https://ui-avatars.com/api/?name=Optimum+Nutrition&background=0057A8&color=fff", productCount: 32, description: "The gold standard in sports nutrition since 1986." },
  { id: "as-it-is", slug: "as-it-is", name: "AS-IT-IS Nutrition", logo: "https://ui-avatars.com/api/?name=As+It+Is&background=2D6A4F&color=fff", productCount: 28, description: "Pure, unflavoured nutrition with no proprietary blends." },
  { id: "myprotein", slug: "myprotein", name: "MyProtein", logo: "https://ui-avatars.com/api/?name=MyProtein&background=E63946&color=fff", productCount: 41, description: "Europe's number one online sports nutrition brand." },
  { id: "gnc", slug: "gnc", name: "GNC", logo: "https://ui-avatars.com/api/?name=GNC&background=F4A261&color=000", productCount: 50, description: "Global leader in performance, health and wellness since 1935." },
  { id: "ace-blend", slug: "ace-blend", name: "Ace Blend", logo: "https://ui-avatars.com/api/?name=Ace+Blend&background=6B2D8B&color=fff", productCount: 20, description: "Premium performance blends crafted for serious athletes." },
  { id: "swisse", slug: "swisse", name: "Swisse", logo: "https://ui-avatars.com/api/?name=Swisse&background=009688&color=fff", productCount: 18, description: "Premium Australian health & wellness supplements." },
  { id: "himalayan-organics", slug: "himalayan-organics", name: "Himalayan Organics", logo: "https://ui-avatars.com/api/?name=Himalayan+Organics&background=388E3C&color=fff", productCount: 22, description: "Organic wellness products inspired by Himalayan herbs." },
  { id: "simply-herbal", slug: "simply-herbal", name: "Simply Herbal", logo: "https://ui-avatars.com/api/?name=Simply+Herbal&background=558B2F&color=fff", productCount: 15, description: "Natural herbal supplements for holistic health." },
  { id: "trunativ", slug: "trunativ", name: "Trunativ", logo: "https://ui-avatars.com/api/?name=Trunativ&background=1565C0&color=fff", productCount: 12, description: "Science-backed nutrition for peak performance." },
  { id: "bfs", slug: "bfs", name: "BFS Nutrition", logo: "https://ui-avatars.com/api/?name=BFS&background=212121&color=fff", productCount: 25, description: "High-performance sports supplements for dedicated athletes." },
  { id: "atn-imported", slug: "atn-imported", name: "ATN Imported", logo: "https://ui-avatars.com/api/?name=ATN&background=880E4F&color=fff", productCount: 14, description: "Premium imported nutrition products." },
  { id: "ripped-up-nutrition", slug: "ripped-up-nutrition", name: "Ripped Up Nutrition", logo: "https://ui-avatars.com/api/?name=Ripped+Up&background=BF360C&color=fff", productCount: 10, description: "Cutting-edge supplements for the shredded physique." },
  { id: "protein-kart", slug: "protein-kart", name: "Protein Kart", logo: "https://ui-avatars.com/api/?name=Protein+Kart&background=F57C00&color=fff", productCount: 16, description: "Your one-stop destination for quality protein supplements." },
  { id: "proteinxpres", slug: "proteinxpres", name: "ProteinXpres", logo: "https://ui-avatars.com/api/?name=ProteinXpres&background=0288D1&color=fff", productCount: 8, description: "Express nutrition solutions for busy fitness enthusiasts." },
  { id: "global-impex", slug: "global-impex", name: "Global Impex", logo: "https://ui-avatars.com/api/?name=Global+Impex&background=37474F&color=fff", productCount: 11, description: "Imported global nutrition brands at your doorstep." },
  { id: "yourhappylife", slug: "yourhappylife", name: "Your Happy Life", logo: "https://ui-avatars.com/api/?name=Your+Happy+Life&background=F48FB1&color=000", productCount: 9, description: "Wellness supplements for a happier, healthier you." },
  { id: "gayor-essentials", slug: "gayor-essentials", name: "Gayor Essentials", logo: "https://ui-avatars.com/api/?name=Gayor&background=4A148C&color=fff", productCount: 7, description: "Essential nutrients for everyday health." },
  { id: "khandelwal-enterprises", slug: "khandelwal-enterprises", name: "Khandelwal Enterprises", logo: "https://ui-avatars.com/api/?name=Khandelwal&background=1A237E&color=fff", productCount: 6, description: "Trusted nutrition distributor with years of experience." },
  { id: "scivation", slug: "scivation", name: "Scivation XTEND", logo: "https://ui-avatars.com/api/?name=XTEND&background=E53935&color=fff", productCount: 15, description: "The world's #1 BCAA brand for intra-workout recovery." },
  { id: "isopure", slug: "isopure", name: "Isopure", logo: "https://ui-avatars.com/api/?name=Isopure&background=00897B&color=fff", productCount: 12, description: "Zero carb, 100% whey protein isolate for clean gains." },
  { id: "dymatize", slug: "dymatize", name: "Dymatize", logo: "https://ui-avatars.com/api/?name=Dymatize&background=6A1B9A&color=fff", productCount: 20, description: "Science-backed, athlete-tested sports nutrition." },
  { id: "fastandup", slug: "fastandup", name: "Fast&Up", logo: "https://ui-avatars.com/api/?name=Fast%26Up&background=F9A825&color=000", productCount: 25, description: "Effervescent sports nutrition for rapid absorption." },
  { id: "yogabar", slug: "yogabar", name: "Yogabar", logo: "https://ui-avatars.com/api/?name=Yogabar&background=8BC34A&color=000", productCount: 18, description: "Nutritious, delicious protein bars and healthy snacks." },
];

export function getBrands() {
  return BRANDS;
}

export function getBrandBySlug(slug: string) {
  return BRANDS.find(b => b.slug === slug);
}

export function getBrandById(id: string) {
  return BRANDS.find(b => b.id === id);
}

