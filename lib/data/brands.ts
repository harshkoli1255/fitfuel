import { Brand } from "@/types";

export const BRANDS: Brand[] = [
  { id: "b1", slug: "muscleblaze", name: "MuscleBlaze", logo: "https://ui-avatars.com/api/?name=MuscleBlaze&background=random&color=fff", productCount: 45 },
  { id: "b2", slug: "optimum-nutrition", name: "Optimum Nutrition", logo: "https://ui-avatars.com/api/?name=Optimum+Nutrition&background=random&color=fff", productCount: 32 },
  { id: "b3", slug: "as-it-is", name: "As It Is Nutrition", logo: "https://ui-avatars.com/api/?name=As+It+Is&background=random&color=fff", productCount: 28 },
  { id: "b4", slug: "myprotein", name: "MyProtein", logo: "https://ui-avatars.com/api/?name=MyProtein&background=random&color=fff", productCount: 41 },
  { id: "b5", slug: "gnc", name: "GNC", logo: "https://ui-avatars.com/api/?name=GNC&background=random&color=fff", productCount: 50 },
  { id: "b6", slug: "scivation", name: "Scivation XTEND", logo: "https://ui-avatars.com/api/?name=XTEND&background=random&color=fff", productCount: 15 },
  { id: "b7", slug: "isopure", name: "Isopure", logo: "https://ui-avatars.com/api/?name=Isopure&background=random&color=fff", productCount: 12 },
  { id: "b8", slug: "dymatize", name: "Dymatize", logo: "https://ui-avatars.com/api/?name=Dymatize&background=random&color=fff", productCount: 20 },
  { id: "b9", slug: "fastandup", name: "Fast&Up", logo: "https://ui-avatars.com/api/?name=Fast&Up&background=random&color=fff", productCount: 25 },
  { id: "b10", slug: "yogabar", name: "Yogabar", logo: "https://ui-avatars.com/api/?name=Yogabar&background=random&color=fff", productCount: 18 },
];

for (let i = 11; i <= 20; i++) {
  BRANDS.push({
    id: `b${i}`,
    slug: `brand-${i}`,
    name: `Premium Brand ${i}`,
    logo: `https://ui-avatars.com/api/?name=Brand+${i}&background=random&color=fff`,
    productCount: 15
  });
}

export function getBrands() {
  return BRANDS;
}

export function getBrandBySlug(slug: string) {
  return BRANDS.find(b => b.slug === slug);
}
