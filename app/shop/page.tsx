import { getProducts } from "@/lib/data/products"
import { getCategories } from "@/lib/data/categories"
import { getBrands } from "@/lib/data/brands"
import { ProductCard } from "@/components/products/product-card"
import { ShopFilters, MobileFilterDrawer, SortSelect } from "@/components/shop/shop-filters"
import { applyFilters } from "@/lib/utils/filter-products"
import { Suspense } from 'react'

export default async function ShopPage({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams
  const sort = params.sort || 'recommended'

  const allProducts = getProducts()
  const categories = getCategories()
  const brands = getBrands()
  
  // Apply filters (pass categories for child-category resolution)
  const filtered = applyFilters(allProducts, params, undefined, categories)

  const activeFilterCount = Object.keys(params).filter(k => k !== 'sort').length

  return (
    <div className="container py-8 sm:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="w-full md:w-64 shrink-0 hidden md:block">
          <Suspense fallback={<div className="animate-pulse h-64 bg-muted rounded-lg" />}>
            <ShopFilters 
              categories={categories} 
              brands={brands} 
              activeParams={params}
            />
          </Suspense>
        </aside>

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tighter">All Products</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Suspense fallback={<div />}>
                <MobileFilterDrawer
                  categories={categories}
                  brands={brands}
                  activeParams={params}
                />
              </Suspense>
              <Suspense fallback={<div />}>
                <SortSelect currentSort={sort} />
              </Suspense>
            </div>
          </div>

          {/* Active filters chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {params.category && params.category.split(',').map((c: string) => (
                <span key={c} className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-xs font-bold rounded-full border border-border">
                  {categories.find(cat => cat.id === c)?.name || c}
                </span>
              ))}
              {params.brand && params.brand.split(',').map((b: string) => (
                <span key={b} className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-xs font-bold rounded-full border border-border">
                  {brands.find(br => br.id === b)?.name || b}
                </span>
              ))}
              {params.price && params.price.split(',').map((p: string) => (
                <span key={p} className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-xs font-bold rounded-full border border-border">
                  {p === 'under-1000' ? 'Under ₹1K' : p === '1000-3000' ? '₹1K–3K' : 'Over ₹3K'}
                </span>
              ))}
              {params.rating && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-xs font-bold rounded-full border border-border">
                  ★ {params.rating}+
                </span>
              )}
              {params.discount === 'true' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-xs font-bold rounded-full border border-[var(--color-brand)]/30">
                  On Sale
                </span>
              )}
            </div>
          )}
          
          {filtered.length === 0 ? (
            <div className="text-center py-24 bg-muted/30 border border-border rounded-xl">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="font-bold text-xl mb-2">No products found</h2>
              <p className="text-muted-foreground text-sm mb-6">Try adjusting your filters or clearing them.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filtered.slice(0, 48).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {filtered.length > 48 && (
                <div className="mt-12 text-center">
                  <p className="text-muted-foreground text-sm mb-4">Showing 48 of {filtered.length} products</p>
                  <button className="border-2 border-foreground px-10 py-3 font-bold uppercase text-sm hover:bg-foreground hover:text-background transition-colors">
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
