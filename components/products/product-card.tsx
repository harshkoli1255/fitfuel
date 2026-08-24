"use client"
import Link from "next/link"
import { Heart, Plus } from "lucide-react"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const defaultVariant = product.variants[0]
  const hasDiscount = defaultVariant.compareAtPrice && defaultVariant.compareAtPrice > defaultVariant.price
  const discountPercentage = hasDiscount 
    ? Math.round(((defaultVariant.compareAtPrice! - defaultVariant.price) / defaultVariant.compareAtPrice!) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: `${product.id}-${defaultVariant.flavor || 'default'}-${defaultVariant.size || 'default'}`,
      product,
      flavor: defaultVariant.flavor || '',
      size: defaultVariant.size || '',
      quantity: 1,
      price: defaultVariant.price
    })
  }

  return (
    <div className="group relative flex flex-col bg-card border border-border p-4 transition-all duration-300 ease-out hover:border-[var(--color-brand)] hover:shadow-xl hover:-translate-y-1">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {hasDiscount && (
          <span className="bg-[var(--color-brand)] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            {discountPercentage}% OFF
          </span>
        )}
        {product.isBestseller && (
          <span className="bg-foreground text-background text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            Bestseller
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-[var(--color-brand)] transition-colors">
        <Heart className="h-5 w-5" />
      </button>

      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full mb-4 overflow-hidden bg-white flex items-center justify-center p-4">
        {product.media && product.media.length > 0 ? (
          <img src={product.media[0].src} alt={product.media[0].alt || product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300 ease-out" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
            <span className="text-muted-foreground font-medium text-sm">Image</span>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-1">
        <Link href={`/products/${product.slug}`} className="group-hover:underline decoration-[var(--color-brand)] underline-offset-4 mb-2">
          <h3 className="font-bold text-sm sm:text-base leading-tight line-clamp-2">{product.name}</h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400 text-sm">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        <div className="mt-auto pt-4 flex items-end justify-between border-t border-border/50">
          <div>
            {hasDiscount && (
              <p className="text-xs text-muted-foreground line-through">₹{defaultVariant.compareAtPrice}</p>
            )}
            <p className="font-display font-bold text-lg leading-none">₹{defaultVariant.price}</p>
          </div>
          <Button onClick={handleAddToCart} size="icon" className="h-10 w-10 shrink-0 rounded-none bg-foreground hover:bg-[var(--color-brand)]">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
