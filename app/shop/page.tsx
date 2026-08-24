import { getProducts } from "@/lib/data/products"
import { getCategories } from "@/lib/data/categories"
import { getBrands } from "@/lib/data/brands"
import { ProductCard } from "@/components/products/product-card"
import { ShopFilters, MobileToggle, SortSelect } from "@/components/shop/shop-filters"

import { Suspense } from 'react'

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string, brand?: string, sort?: string }> }) {
  const params = await searchParams
  const categoryFilters = params.category ? params.category.split(',') : []
  const brandFilters = params.brand ? params.brand.split(',') : []
  const sort = params.sort || 'recommended'

  const allProducts = getProducts()
  
  // Apply filters
  const filtered = allProducts.filter(p => {
    const matchCategory = categoryFilters.length === 0 || categoryFilters.includes(p.categoryId)
    const matchBrand = brandFilters.length === 0 || brandFilters.includes(p.brandId)
    return matchCategory && matchBrand
  })

  // Apply sort
  if (sort === 'price-asc') filtered.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0))
  if (sort === 'price-desc') filtered.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0))

  const categories = getCategories()
  const brands = getBrands()

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0 hidden md:block">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ShopFilters 
              categories={categories} 
              brands={brands} 
              activeCategories={categoryFilters} 
              activeBrands={brandFilters} 
            />
          </Suspense>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="font-display font-bold text-4xl uppercase tracking-tighter">All Products</h1>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Suspense fallback={<div>Loading...</div>}>
                <MobileToggle />
                <SortSelect currentSort={sort} />
              </Suspense>
            </div>
          </div>
          
          {filtered.length === 0 ? (
            <div className="text-center py-24 bg-muted border-2 border-border border-dashed">
              <p className="text-muted-foreground font-medium mb-4">No products found matching your filters.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filtered.slice(0, 48).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {filtered.length > 48 && (
                <div className="mt-12 text-center">
                  <p className="text-muted-foreground mb-4">Showing 48 of {filtered.length} products.</p>
                  <button className="border-2 border-foreground px-8 py-3 font-bold uppercase hover:bg-foreground hover:text-background transition-colors">
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
