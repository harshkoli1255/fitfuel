import { notFound } from "next/navigation"
import { getProductBySlug, getProductsByCategory } from "@/lib/data/products"
import { ProductInteractive } from "@/components/products/product-interactive"
import { ProductCard } from "@/components/products/product-card"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  
  if (!product) {
    notFound()
  }

  const relatedProducts = getProductsByCategory(product.categoryId).filter(p => p.id !== product.id).slice(0, 4)

  return (
    <div className="container py-8 sm:py-16">
      <ProductInteractive product={product} />

      {/* DESCRIPTION & DEEP DETAILS (Reconstructed Architecture) */}
      <div className="mt-24 pt-16 border-t-8 border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-20">
            
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-24 bg-white p-8 rounded-2xl shadow-sm border">
              <h2 className="font-bold text-2xl uppercase text-gray-900 mb-6 border-b pb-4">Product Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-600 font-medium" dangerouslySetInnerHTML={{ __html: product.description || "No description provided." }} />
            </section>

            {/* Pincode & Delivery Section (Nutristar replication) */}
            <section className="bg-gray-50 p-8 rounded-2xl border flex flex-col sm:flex-row gap-8">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Check Delivery Time & Options
                </h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter Pincode" className="flex-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-orange-500 font-medium text-sm" />
                  <button className="bg-gray-900 text-white font-bold px-6 py-2 rounded-md hover:bg-orange-500 transition-colors uppercase text-sm tracking-wide">Check</button>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">Please enter PIN code to check delivery time & Pay on Delivery Availability</p>
              </div>
              <div className="flex-1 space-y-3 pt-4 sm:pt-0 sm:border-l sm:pl-8 border-gray-200">
                 <div className="flex items-center gap-3">
                   <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   <span className="text-sm font-bold text-gray-700">100% Genuine Products</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                   <span className="text-sm font-bold text-gray-700">Easy 7 Days Return Policy</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                   <span className="text-sm font-bold text-gray-700">Secure Payments</span>
                 </div>
              </div>
            </section>

            {/* Highlights & Benefits */}
            <section id="benefits" className="scroll-mt-24">
              <h3 className="font-bold text-2xl uppercase text-gray-900 mb-6 bg-gray-50 p-4 rounded-xl border-l-4 border-orange-500">Key Benefits</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {(product.benefits || [
                  "Supports maximum muscle recovery and growth",
                  "Clinically tested formula with zero banned substances",
                  "Easily digestible and mixes instantly",
                  "High biological value protein profile"
                ]).map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border shadow-sm hover:border-orange-500 transition-colors">
                    <span className="text-orange-500 font-bold mt-0.5">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <p className="font-medium text-sm text-gray-700 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Ingredients & Directions */}
            <section id="ingredients" className="scroll-mt-24 bg-white p-8 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-2xl uppercase text-gray-900 mb-6">Ingredients & Usage</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-xs text-gray-500 mb-2">Ingredients</h4>
                  <p className="text-sm leading-relaxed text-gray-700">{product.ingredients || "Protein Blend (Whey Protein Isolate, Whey Protein Concentrate), Cocoa Powder, Natural and Artificial Flavors, Soy Lecithin, Sucralose, Acesulfame Potassium."}</p>
                </div>
                <div className="h-px bg-gray-100 w-full" />
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-xs text-gray-500 mb-2">Directions For Use</h4>
                  <p className="text-sm leading-relaxed text-gray-700">Mix 1 scoop with 6-8 oz of cold water or milk. Shake well and consume immediately after workout or anytime you need a protein boost.</p>
                </div>
              </div>
            </section>

            {/* Authenticity Banner */}
            <section className="bg-gray-900 text-white p-8 rounded-2xl flex flex-col sm:flex-row items-center gap-8 justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-bl-full opacity-20"></div>
              <div className="relative z-10">
                <h3 className="font-bold text-2xl uppercase tracking-wider mb-2 text-orange-500">100% Genuine Guarantee</h3>
                <p className="text-gray-300 font-medium text-sm max-w-lg leading-relaxed">Every product shipped by FitFuel is sourced directly from the brand or authorized importers. Scan the scratch code on the jar to verify authenticity.</p>
              </div>
              <div className="shrink-0 relative z-10">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-2">
                  <svg className="w-12 h-12 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
            </section>
          </div>
          
          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-muted/10 p-6 sm:p-8 border-2 border-border self-start sticky top-24 shadow-xl">
              <h3 className="font-display font-bold text-2xl uppercase tracking-tighter mb-6 flex items-center justify-between">
                Nutrition Facts
                <span className="text-xs bg-foreground text-background px-2 py-1 rounded">PER SCOOP</span>
              </h3>
              
              <div className="space-y-4 text-sm font-bold uppercase tracking-widest">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Serving Size</span>
                  <span>{product.nutrition?.servingSize || "32g (1 Scoop)"}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground text-lg">Calories</span>
                  <span className="text-lg">{product.nutrition?.calories || 120}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3 text-[var(--color-brand)]">
                  <span>Protein</span>
                  <span>{product.nutrition?.protein || "24g"}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Carbohydrates</span>
                  <span>{product.nutrition?.carbohydrates || "3g"}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-muted-foreground">Fat</span>
                  <span>{product.nutrition?.fat || "1g"}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-dashed border-border text-center">
                <p className="text-xs text-muted-foreground font-medium normal-case leading-relaxed">
                  * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="mt-32 border-t-2 border-border pt-20">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tighter">You Might Also Like</h2>
          </div>
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
