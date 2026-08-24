import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "c1", slug: "sports-nutrition", name: "Sports Nutrition", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80" },
  { id: "c2", slug: "protein", name: "Protein", parentId: "c1", image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=400&q=80" },
  { id: "c3", slug: "creatine", name: "Creatine", parentId: "c1", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80" },
  { id: "c4", slug: "pre-workout", name: "Pre-Workout", parentId: "c1", image: "https://images.unsplash.com/photo-1546483875-ad9014c88efa?w=400&q=80" },
  { id: "c5", slug: "vitamins", name: "Vitamins & Supplements", image: "https://images.unsplash.com/photo-1584308666744-24d5e478ac67?w=400&q=80" },
  { id: "c6", slug: "multivitamins", name: "Multivitamins", parentId: "c5" },
  { id: "c7", slug: "omega-3", name: "Omega-3 & Fish Oil", parentId: "c5" },
  { id: "c8", slug: "healthy-snacking", name: "Healthy Snacking", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
  { id: "c9", slug: "protein-bars", name: "Protein Bars", parentId: "c8" },
  { id: "c10", slug: "accessories", name: "Accessories", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80" },
  { id: "c11", slug: "shakers", name: "Shakers & Bottles", parentId: "c10" },
];

export function getCategories() {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find(c => c.slug === slug);
}
