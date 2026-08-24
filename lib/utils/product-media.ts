import { Product, ProductMedia } from "@/types";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80";

export function getPrimaryProductImage(product: Product): string {
  if (!product || !product.media || product.media.length === 0) {
    return FALLBACK_IMAGE;
  }

  // Prefer a proper primary image
  const primary = product.media.find(m => m.type === "image" && m.role === "primary");
  if (primary?.src) return primary.src;

  // Then any image
  const firstImage = product.media.find(m => m.type === "image");
  if (firstImage?.src) return firstImage.src;

  // Last resort: first item if it has src
  if (product.media[0]?.src) return product.media[0].src;

  return FALLBACK_IMAGE;
}

export function getProductAlt(product: Product): string {
  const primary = product.media?.find(m => m.type === "image" && m.role === "primary");
  return primary?.alt || product.name;
}

export function getProductImages(product: Product): ProductMedia[] {
  if (!product?.media) return [];
  return product.media.filter(m => m.type === "image");
}

export function getProductVideos(product: Product): ProductMedia[] {
  if (!product?.media) return [];
  return product.media.filter(m => m.type === "video");
}
