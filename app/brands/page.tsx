import Link from "next/link"
import { getBrands } from "@/lib/data/brands"
import Image from "next/image"

export default function BrandsPage() {
  const brands = getBrands()

  // Group brands by first letter A-Z
  const groupedBrands = brands.reduce((acc, brand) => {
    const firstLetter = brand.name.charAt(0).toUpperCase()
    const key = /[A-Z]/.test(firstLetter) ? firstLetter : '#'
    if (!acc[key]) acc[key] = []
    acc[key].push(brand)
    return acc
  }, {} as Record<string, typeof brands>)

  // Sort keys A-Z with # at the end
  const sortedKeys = Object.keys(groupedBrands).sort((a, b) => {
    if (a === '#') return 1
    if (b === '#') return -1
    return a.localeCompare(b)
  })

  // Popular brands (top 5 by product count for featured section)
  const popularBrands = [...brands].sort((a, b) => b.productCount - a.productCount).slice(0, 5)

  return (
    <div className="container py-16">
      <div className="text-center mb-16">
        <h1 className="font-display font-bold text-5xl uppercase tracking-tighter mb-4">Our Brands</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">We partner with the most trusted names in sports nutrition to bring you authentic, premium products.</p>
      </div>
      
      {/* Popular Brands Section */}
      <section className="mb-20">
        <h2 className="font-display font-bold text-3xl uppercase tracking-tighter mb-8 border-b-2 border-border pb-4">Featured Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
          {popularBrands.map(brand => (
            <Link key={brand.id} href={`/brands/${brand.slug}`} className="group flex flex-col items-center justify-center p-6 bg-card border border-border hover:border-[var(--color-brand)] hover:shadow-sm transition-all">
              <div className="aspect-square w-full mb-4 bg-white rounded-lg flex items-center justify-center overflow-hidden relative">
                {brand.logo ? (
                  <Image unoptimized src={brand.logo} alt={brand.name} fill className="object-contain p-4 mix-blend-multiply group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <span className="text-xs text-muted-foreground font-bold tracking-widest uppercase">{brand.name}</span>
                )}
              </div>
              <h3 className="font-bold text-center group-hover:text-[var(--color-brand)] transition-colors line-clamp-1 text-sm">{brand.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* A-Z Directory Navigation */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur py-4 mb-12 border-y border-border flex flex-wrap justify-center gap-2">
        {sortedKeys.map(letter => (
          <a key={letter} href={`#letter-${letter}`} className="w-8 h-8 flex items-center justify-center font-bold text-sm bg-muted hover:bg-[var(--color-brand)] hover:text-white transition-colors">
            {letter}
          </a>
        ))}
      </div>

      {/* A-Z Directory Sections */}
      <div className="space-y-16">
        {sortedKeys.map(letter => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-40">
            <h2 className="font-display font-bold text-4xl text-muted-foreground/30 mb-8 pb-4 border-b border-border">{letter}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {groupedBrands[letter].sort((a,b) => a.name.localeCompare(b.name)).map(brand => (
                <Link key={brand.id} href={`/brands/${brand.slug}`} className="group flex flex-col items-center text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mb-4 bg-white rounded-full flex items-center justify-center overflow-hidden border border-border group-hover:border-[var(--color-brand)] transition-colors relative">
                    {brand.logo ? (
                      <Image unoptimized src={brand.logo} alt={brand.name} fill className="object-contain p-4 sm:p-6 mix-blend-multiply group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase truncate w-full px-2">{brand.name}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm group-hover:text-[var(--color-brand)] transition-colors">{brand.name}</h3>
                  <p className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-wider">{brand.productCount} Products</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
