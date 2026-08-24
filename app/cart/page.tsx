import { getProducts } from "@/lib/data/products"
import { ProductCard } from "@/components/products/product-card"
import { CartView } from "@/components/cart/cart-view"

export default function CartPage() {
  const products = getProducts().slice(0, 4)

  return (
    <div className="container py-16">
      <h1 className="font-display font-bold text-5xl uppercase tracking-tighter mb-12">Your Cart</h1>
      
      <CartView />

      <div className="mt-24 border-t-8 border-border pt-16">
        <h2 className="font-display font-bold text-4xl uppercase tracking-tighter mb-8">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  )
}
