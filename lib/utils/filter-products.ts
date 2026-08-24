import { Product, Category } from "@/types";

export interface FilterParams {
  category?: string;
  brand?: string;
  sort?: string;
  price?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  availability?: string;
  discount?: string;
  flavor?: string;
  [key: string]: string | undefined;
}

export function applyFilters(
  products: Product[],
  params: FilterParams,
  currentCategoryId?: string,
  allCategories?: Category[]
) {
  let filtered = [...products];

  // Category filter: if we have a locked-in category (category page), filter by it + children
  if (currentCategoryId) {
    const validIds = new Set<string>([currentCategoryId]);
    if (allCategories) {
      allCategories.forEach(c => {
        if (c.parentId === currentCategoryId) validIds.add(c.id);
      });
    }
    filtered = filtered.filter(p => validIds.has(p.categoryId));
  } else if (params.category) {
    // On shop page, filter by selected categories (each may include children)
    const categoryFilters = params.category.split(',');
    const validIds = new Set<string>(categoryFilters);
    if (allCategories) {
      categoryFilters.forEach(catId => {
        allCategories.forEach(c => {
          if (c.parentId === catId) validIds.add(c.id);
        });
      });
    }
    filtered = filtered.filter(p => validIds.has(p.categoryId));
  }

  // Brand filter
  if (params.brand) {
    const brandFilters = params.brand.split(',');
    filtered = filtered.filter(p => brandFilters.includes(p.brandId));
  }

  // Flavor filter
  if (params.flavor) {
    const flavorFilters = params.flavor.split(',');
    filtered = filtered.filter(p =>
      p.variants.some(v => v.flavor && flavorFilters.includes(v.flavor))
    );
  }

  // Price range filter (checkbox-style: under-1000, 1000-3000, over-3000)
  if (params.price) {
    const ranges = params.price.split(',');
    filtered = filtered.filter(p => {
      const pPrice = Number(p.variants[0]?.price) || 0;
      return ranges.some(range => {
        if (range === 'under-1000') return pPrice < 1000;
        if (range === '1000-3000') return pPrice >= 1000 && pPrice <= 3000;
        if (range === '3000-5000') return pPrice > 3000 && pPrice <= 5000;
        if (range === 'over-3000') return pPrice > 3000;
        if (range === 'over-5000') return pPrice > 5000;
        return false;
      });
    });
  }

  // Min/Max price filter (numeric range inputs)
  if (params.minPrice || params.maxPrice) {
    const min = params.minPrice ? Number(params.minPrice) : 0;
    const max = params.maxPrice ? Number(params.maxPrice) : Infinity;
    if (!isNaN(min) && !isNaN(max) && min <= max) {
      filtered = filtered.filter(p => {
        const pPrice = Number(p.variants[0]?.price) || 0;
        return pPrice >= min && pPrice <= max;
      });
    }
  }

  // Rating filter
  if (params.rating) {
    const minRating = parseFloat(params.rating);
    if (!isNaN(minRating)) {
      filtered = filtered.filter(p => p.rating >= minRating);
    }
  }

  // Availability filter
  if (params.availability) {
    const avails = params.availability.split(',');
    filtered = filtered.filter(p => {
      const inStock = p.variants.some(v => v.stock > 0);
      const wantInStock = avails.includes('in-stock');
      const wantOut = avails.includes('out-of-stock');
      if (wantInStock && wantOut) return true;
      if (wantInStock) return inStock;
      if (wantOut) return !inStock;
      return true;
    });
  }

  // Discount filter
  if (params.discount === 'true') {
    filtered = filtered.filter(p =>
      p.variants.some(v => v.compareAtPrice && v.compareAtPrice > v.price)
    );
  }

  // Sorting
  const sort = params.sort || 'recommended';
  switch (sort) {
    case 'price-asc':
      filtered.sort((a, b) => (Number(a.variants[0]?.price) || 0) - (Number(b.variants[0]?.price) || 0));
      break;
    case 'price-desc':
      filtered.sort((a, b) => (Number(b.variants[0]?.price) || 0) - (Number(a.variants[0]?.price) || 0));
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'newest':
      filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'best-selling':
      filtered.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
      break;
    case 'discount':
      filtered.sort((a, b) => {
        const da = a.variants[0]?.compareAtPrice
          ? ((a.variants[0].compareAtPrice - a.variants[0].price) / a.variants[0].compareAtPrice)
          : 0;
        const db = b.variants[0]?.compareAtPrice
          ? ((b.variants[0].compareAtPrice - b.variants[0].price) / b.variants[0].compareAtPrice)
          : 0;
        return db - da;
      });
      break;
    // 'recommended' or unknown = default order
  }

  return filtered;
}
