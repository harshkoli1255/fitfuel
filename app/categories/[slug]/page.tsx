import { notFound } from "next/navigation"
import { getCategoryBySlug, getCategories } from "@/lib/data/categories"
import { getProducts } from "@/lib/data/products"
import { getBrands } from "@/lib/data/brands"
import { ProductCard } from "@/components/products/product-card"
import { ShopFilters, MobileToggle, SortSelect } from "@/components/shop/shop-filters"
import { applyFilters } from "@/lib/utils/filter-products"
import { Suspense } from 'react'

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<any> }) {
  const { slug } = await params
  const queryParams = await searchParams
  const category = getCategoryBySlug(slug)
  
  if (!category) {
    notFound()
  }

  const allProducts = getProducts()
  const categories = getCategories()
  const brands = getBrands()
  const filtered = applyFilters(allProducts, queryParams, category.id, categories)
  
  const sort = queryParams.sort || 'recommended'

  return (
    <div className="container py-12">
      <div className="mb-12 bg-foreground text-background p-12 text-center border-l-8 border-[var(--color-brand)]">
        <h1 className="font-display font-bold text-5xl uppercase tracking-tighter mb-4">{category.name}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {category.description || `Explore our premium selection of ${category.name.toLowerCase()} tailored for your fitness goals.`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR FILTERS */}
        <aside className="w-full lg:w-64 shrink-0 hidden lg:block">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ShopFilters 
              categories={categories} 
              brands={brands} 
              activeParams={queryParams}
              hideCategory={true}
            />
          </Suspense>
        </aside>
        
        {/* Mobile Filter Button */}
        <Suspense fallback={<div>Loading...</div>}>
          <div className="lg:hidden w-full">
            <MobileToggle />
          </div>
        </Suspense>

        {/* MAIN PRODUCT GRID */}
        <div className="flex-1">
          {/* Sort & Controls Bar */}
          <div className="flex justify-between items-center bg-muted/30 border border-border p-4 mb-6">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground hidden sm:block">
              Showing {filtered.length} Products
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold uppercase tracking-widest hidden sm:inline">Sort By:</span>
              <Suspense fallback={<div>Loading...</div>}>
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
                <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
