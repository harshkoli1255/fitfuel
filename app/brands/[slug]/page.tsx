import { notFound } from "next/navigation"
import { getBrandBySlug } from "@/lib/data/brands"
import { getProducts } from "@/lib/data/products"
import { getCategories } from "@/lib/data/categories"
import { getBrands } from "@/lib/data/brands"
import { ProductCard } from "@/components/products/product-card"
import { ShopFilters, SortSelect, MobileToggle } from "@/components/shop/shop-filters"
import { applyFilters } from "@/lib/utils/filter-products"
import { Suspense } from "react"

export default async function BrandDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<any> }) {
  const { slug } = await params
  const queryParams = await searchParams
  const brand = getBrandBySlug(slug)
  
  if (!brand) {
    notFound()
  }

  const allProducts = getProducts()
  const categories = getCategories()
  const brands = getBrands()
  
  // Filter products by this brand, then apply any additional filters from URL
  const brandProducts = allProducts.filter(p => p.brandId === brand.id)
  const filtered = applyFilters(brandProducts, queryParams, undefined, categories)
  
  const sort = queryParams.sort || 'recommended'

  return (
    <div className="container py-12">
      {/* Brand Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12 p-8 border border-border bg-card">
        <div className="h-32 w-32 shrink-0 bg-muted rounded-full flex items-center justify-center overflow-hidden border-2 border-border">
          <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
        </div>
        <div className="text-center md:text-left">
          <h1 className="font-display font-bold text-4xl uppercase tracking-tighter mb-2">{brand.name}</h1>
          <p className="text-muted-foreground max-w-2xl">
            {brand.description || `Discover the complete range of authentic ${brand.name} products available at FitFuel.`}
          </p>
          <p className="text-xs text-muted-foreground mt-3 font-bold uppercase tracking-widest">
            {brandProducts.length} Products Available
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR FILTERS */}
        <aside className="w-full lg:w-64 shrink-0 hidden lg:block">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ShopFilters 
              categories={categories}
              brands={brands}
              activeParams={queryParams}
              hideCategory={false}
            />
          </Suspense>
        </aside>

        {/* Mobile Filter Button */}
        <Suspense fallback={<div />}>
          <div className="lg:hidden w-full">
            <MobileToggle />
          </div>
        </Suspense>

        {/* MAIN PRODUCT GRID */}
        <div className="flex-1">
          {/* Sort & Controls Bar */}
          <div className="flex justify-between items-center bg-muted/30 border border-border p-4 mb-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground hidden sm:block">
              Showing {filtered.length} of {brandProducts.length} Products
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold uppercase tracking-widest hidden sm:inline">Sort By:</span>
              <Suspense fallback={<div />}>
                <SortSelect currentSort={sort} />
              </Suspense>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filtered.slice(0, 48).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full py-20 text-center border border-dashed border-border">
                <h3 className="font-bold text-xl uppercase mb-2">No Products Found</h3>
                <p className="text-muted-foreground">
                  {brandProducts.length === 0 
                    ? `We are currently restocking our ${brand.name} inventory.`
                    : `Try adjusting your filters to see more products.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
