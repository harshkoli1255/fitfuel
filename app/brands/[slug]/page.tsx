import { notFound } from "next/navigation"
import { getBrandBySlug } from "@/lib/data/brands"
import { getProductsByBrand } from "@/lib/data/products"
import { ProductCard } from "@/components/products/product-card"

export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = getBrandBySlug(slug)
  
  if (!brand) {
    notFound()
  }

  const products = getProductsByBrand(brand.id)

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12 p-8 border border-border bg-card">
        <div className="h-32 w-32 shrink-0 bg-muted rounded-full flex items-center justify-center overflow-hidden border border-border">
            <span className="text-xs text-muted-foreground font-bold tracking-widest uppercase">Logo</span>
        </div>
        <div className="text-center md:text-left">
          <h1 className="font-display font-bold text-4xl uppercase tracking-tighter mb-2">{brand.name}</h1>
          <p className="text-muted-foreground max-w-2xl">
            {brand.description || `Discover the complete range of authentic ${brand.name} products available at FitFuel.`}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR FILTERS */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 bg-card border border-border p-6 hidden lg:block">
            <h2 className="font-display font-bold text-xl uppercase tracking-tighter mb-6 border-b border-border pb-4">Filters</h2>
            
            <div className="mb-6">
              <h3 className="font-bold text-sm uppercase tracking-widest mb-3">Availability</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 accent-[var(--color-brand)]" defaultChecked />
                  <span className="text-sm font-medium group-hover:text-[var(--color-brand)] transition-colors">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group text-muted-foreground">
                  <input type="checkbox" className="w-4 h-4 accent-[var(--color-brand)]" />
                  <span className="text-sm font-medium group-hover:text-foreground transition-colors">Out of Stock</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-sm uppercase tracking-widest mb-3">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 accent-[var(--color-brand)]" />
                  <span className="text-sm font-medium group-hover:text-[var(--color-brand)] transition-colors">Under ₹1000</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 accent-[var(--color-brand)]" />
                  <span className="text-sm font-medium group-hover:text-[var(--color-brand)] transition-colors">₹1000 - ₹3000</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 accent-[var(--color-brand)]" />
                  <span className="text-sm font-medium group-hover:text-[var(--color-brand)] transition-colors">Over ₹3000</span>
                </label>
              </div>
            </div>

          </div>
          
          {/* Mobile Filter Button */}
          <button className="w-full lg:hidden bg-foreground text-background font-bold uppercase tracking-widest py-4 border-2 border-transparent">
            Show Filters
          </button>
        </aside>

        {/* MAIN PRODUCT GRID */}
        <div className="flex-1">
          {/* Sort & Controls Bar */}
          <div className="flex justify-between items-center bg-muted/30 border border-border p-4 mb-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground hidden sm:block">
              Showing {products.length} Products
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold uppercase tracking-widest">Sort By:</span>
              <select className="bg-transparent border border-border px-3 py-1 font-bold text-sm uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] cursor-pointer">
                <option>Featured</option>
                <option>Best Selling</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(0, 48).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && (
              <div className="col-span-full py-20 text-center border border-dashed border-border">
                <h3 className="font-bold text-xl uppercase mb-2">No Products Found</h3>
                <p className="text-muted-foreground">We are currently restocking our {brand.name} inventory.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
