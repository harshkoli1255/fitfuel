export type Brand = {
  id: string;
  slug: string;
  name: string;
  logo: string;
  description?: string;
  productCount: number;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
};

export type Collection = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
};

export type ProductVariant = {
  id: string;
  sku: string;
  flavor?: string;
  size?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  image?: string;
};

export type NutritionData = {
  servingSize: string;
  servingsPerContainer: number;
  calories: number;
  protein: string;
  carbohydrates: string;
  fat: string;
  sugar: string;
};

export type MediaStatus =
  | "authorized-reference"
  | "original"
  | "licensed"
  | "generated"
  | "temporary-placeholder";

export type ProductMedia = {
  id: string;
  type: "image" | "video";
  role:
    | "primary"
    | "secondary"
    | "back"
    | "nutrition"
    | "ingredients"
    | "lifestyle"
    | "variant"
    | "video"
    | "poster";
  src: string;
  alt: string;
  variantId?: string;
  mediaStatus: MediaStatus;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  categoryId: string;
  description: string;
  rating: number;
  reviewCount: number;
  media: ProductMedia[];
  variants: ProductVariant[];
  tags: string[];
  goals: string[];
  ingredients?: string;
  benefits?: string[];
  nutrition?: NutritionData;
  isBestseller?: boolean;
  isNewArrival?: boolean;
};

export type Review = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
};

export type CartItem = {
  id: string; // Composite of productId + variantId
  productId: string;
  variantId: string;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  items: (CartItem & { priceAtPurchase: number })[];
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  date: string;
};
