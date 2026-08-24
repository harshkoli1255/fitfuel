import { notFound } from "next/navigation"
import Link from "next/link"
import { getProductBySlug, getProductsByCategory } from "@/lib/data/products"
import { getBrandById } from "@/lib/data/brands"
import { getCategoryBySlug } from "@/lib/data/categories"
import { ProductInteractive } from "@/components/products/product-interactive"
import { ProductCard } from "@/components/products/product-card"
import { parseProductDescription, cleanText } from "@/lib/utils/parse-description"
import { ChevronRight } from "lucide-react"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const brand = getBrandById(product.brandId)
  const parsed = parseProductDescription(product.description || '')
  const relatedProducts = getProductsByCategory(product.categoryId).filter(p => p.id !== product.id).slice(0, 4)

  // Parse key benefits from description (they're in the main description section before ***SPLIT***)
  const benefits = product.benefits || [
    "Supports maximum muscle recovery and growth",
    "Clinically tested formula with zero banned substances",
    "Easily digestible and mixes instantly",
    "High biological value protein profile"
  ]

  return (
    <div className="container py-8 sm:py-12">
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
        {brand && (
          <>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/brands/${brand.slug}`} className="hover:text-foreground transition-colors">{brand.name}</Link>
          </>
        )}
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground line-clamp-1 max-w-[200px]">{product.name}</span>
      </nav>

      <ProductInteractive product={product} />

      {/* DESCRIPTION & DEEP DETAILS */}
      <div className="mt-20 pt-12 border-t-4 border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* Product Overview */}
            <section id="overview" className="scroll-mt-24">
              <h2 className="font-bold text-xl uppercase tracking-wider mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-[var(--color-brand)] block"></span>
                Product Overview
              </h2>
              <div className="bg-muted/30 rounded-xl p-6 border border-border">
                <div className="prose prose-base max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
                  {cleanText(parsed.description).slice(0, 1500)}
                  {parsed.description.length > 1500 ? '...' : ''}
                </div>
              </div>
            </section>

            {/* Key Benefits */}
            {benefits.length > 0 && (
              <section id="benefits" className="scroll-mt-24">
                <h2 className="font-bold text-xl uppercase tracking-wider mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 bg-[var(--color-brand)] block"></span>
                  Key Benefits
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-border hover:border-[var(--color-brand)]/50 transition-colors">
                      <span className="text-[var(--color-brand)] font-bold mt-0.5 shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </span>
                      <p className="text-sm text-foreground/80 leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Ingredients & Directions */}
            <section id="ingredients" className="scroll-mt-24">
              <h2 className="font-bold text-xl uppercase tracking-wider mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-[var(--color-brand)] block"></span>
                Ingredients & Usage
              </h2>
              <div className="bg-white rounded-xl border border-border divide-y divide-border overflow-hidden">
                {(parsed.ingredients || product.ingredients) && (
                  <div className="p-6">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-3">Ingredients</h3>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {cleanText(parsed.ingredients || product.ingredients || '')}
                    </p>
                  </div>
                )}
                {parsed.directions && (
                  <div className="p-6">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-3">Directions For Use</h3>
                    <p className="text-sm leading-relaxed text-foreground/80">{cleanText(parsed.directions)}</p>
                  </div>
                )}
                {parsed.manufacturer && (
                  <div className="p-6">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-3">Manufactured By</h3>
                    <p className="text-sm leading-relaxed text-foreground/80">{cleanText(parsed.manufacturer)}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Brand Info */}
            {parsed.brandInfo && (
              <section id="brand" className="scroll-mt-24 bg-muted/30 rounded-xl p-6 border border-border">
                <h2 className="font-bold text-xl uppercase tracking-wider mb-4 flex items-center gap-3">
                  <span className="w-1 h-6 bg-[var(--color-brand)] block"></span>
                  About {brand?.name || 'The Brand'}
                </h2>
                <p className="text-sm leading-relaxed text-foreground/80">{cleanText(parsed.brandInfo)}</p>
              </section>
            )}

            {/* Delivery & Trust */}
            <section className="bg-muted/20 p-6 rounded-xl border border-border flex flex-col sm:flex-row gap-8">
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Check Delivery
                </h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter Pincode" className="flex-1 px-4 py-2 border border-border rounded-md outline-none focus:border-[var(--color-brand)] text-sm" />
                  <button className="bg-foreground text-background font-bold px-6 py-2 rounded-md hover:bg-[var(--color-brand)] transition-colors text-sm">Check</button>
                </div>
              </div>
              <div className="flex-1 space-y-3 sm:border-l sm:pl-8 border-border">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-sm font-semibold">100% Genuine Products</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  <span className="text-sm font-semibold">Easy 7 Days Return</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  <span className="text-sm font-semibold">Secure Payments</span>
                </div>
              </div>
            </section>
          </div>

          {/* Nutrition Facts Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white border-2 border-border rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-lg uppercase tracking-wider mb-5 flex items-center justify-between">
                Nutrition Facts
                <span className="text-xs bg-foreground text-background px-2 py-1 rounded">Per Serving</span>
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground font-medium">Serving Size</span>
                  <span className="font-bold">{product.nutrition?.servingSize || '32g'}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground font-medium text-base">Calories</span>
                  <span className="font-bold text-base">{product.nutrition?.calories || 120}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2 text-[var(--color-brand)]">
                  <span className="font-semibold">Protein</span>
                  <span className="font-bold">{product.nutrition?.protein || '24g'}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground font-medium">Carbohydrates</span>
                  <span className="font-bold">{product.nutrition?.carbohydrates || '3g'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Fat</span>
                  <span className="font-bold">{product.nutrition?.fat || '1g'}</span>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-5 leading-relaxed border-t border-border pt-4">
                * Percent Daily Values are based on a 2,000 calorie diet.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 border-t-2 border-border pt-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tighter mb-10">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
