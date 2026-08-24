import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "sports-nutrition", slug: "sports-nutrition", name: "Sports Nutrition", image: "https://nutristar.in/cdn/shop/files/Category_March_01_ad517d91-6d1b-42a0-b761-a9d8f6da3ff3.webp?v=1767768867&width=600" },
  { id: "protein", slug: "protein", name: "Protein", parentId: "sports-nutrition", image: "https://nutristar.in/cdn/shop/files/Category_March_04_a1c99e42-701f-4cdb-a958-96cf4f3bc15d_1.webp?v=1769778160&width=600" },
  { id: "creatine", slug: "creatine", name: "Creatine", parentId: "sports-nutrition", image: "https://nutristar.in/cdn/shop/files/Category_March_06_16531104-2ae5-4d8e-80bd-c0a91c9cca6c_1.webp?v=1769778160&width=600" },
  { id: "pre-workout", slug: "pre-workout", name: "Pre-Workout", parentId: "sports-nutrition", image: "https://nutristar.in/cdn/shop/files/Category_March_07_18b0816d-6db3-4659-9b9e-688d39325f1c_1.webp?v=1769778160&width=600" },
  { id: "vitamins", slug: "vitamins", name: "Vitamins & Supplements", image: "https://nutristar.in/cdn/shop/files/Category_March_05_10756e5e-2f29-4b93-8d97-0e696bb04d61_1.webp?v=1769778160&width=600" },
  { id: "multivitamins", slug: "multivitamins", name: "Multivitamins", parentId: "vitamins", image: "https://nutristar.in/cdn/shop/files/MULTIVITAMIN_jpg.jpg?v=1785224109&width=600" },
  { id: "omega-3", slug: "omega-3", name: "Omega-3 & Fish Oil", parentId: "vitamins", image: "https://nutristar.in/cdn/shop/files/Category_March_10_b904af49-6acc-461e-85b3-8dedcbcd4853_1.webp?v=1769778160&width=600" },
  { id: "healthy-snacking", slug: "healthy-snacking", name: "Healthy Snacking", image: "https://nutristar.in/cdn/shop/files/Category_March_03_9974e3b5-9a17-4668-b2f8-8b010749b545_1.webp?v=1769778160&width=600" },
  { id: "protein-bars", slug: "protein-bars", name: "Protein Bars", parentId: "healthy-snacking", image: "https://nutristar.in/cdn/shop/files/Category_March_12_c69a9756-30be-4206-b3fd-ff0f2bf5295a_1.webp?v=1769778160&width=600" },
  { id: "accessories", slug: "accessories", name: "Accessories", image: "https://nutristar.in/cdn/shop/files/Category_March_08_3918449b-6034-4825-a96c-46da0ab6414a_1.webp?v=1769778160&width=600" },
  { id: "shakers", slug: "shakers", name: "Shakers & Bottles", parentId: "accessories", image: "https://nutristar.in/cdn/shop/files/Category_March_08_3918449b-6034-4825-a96c-46da0ab6414a_1.webp?v=1769778160&width=600" },
];

export function getCategories() {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find(c => c.slug === slug);
}
