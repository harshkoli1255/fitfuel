import { Product } from "@/types";

import generatedProducts from './generated-products.json';

// Use the generated 499 products directly
export const PRODUCTS: Product[] = generatedProducts as Product[];

export function getProducts() {
  return PRODUCTS;
}

export function getProductBySlug(slug: string) {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(categoryId: string) {
  const { CATEGORIES } = require('./categories');
  const targetCategories = [categoryId];
  const children = CATEGORIES.filter((c: any) => c.parentId === categoryId).map((c: any) => c.id);
  targetCategories.push(...children);
  
  return PRODUCTS.filter(p => targetCategories.includes(p.categoryId));
}

export function getProductsByBrand(brandId: string) {
  return PRODUCTS.filter(p => p.brandId === brandId);
}

export function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.isBestseller).slice(0, 8);
}
