import Link from "next/link"
import { getBrands } from "@/lib/data/brands"

export default function BrandsPage() {
  const brands = getBrands()

  return (
    <div className="container py-16">
      <div className="text-center mb-16">
        <h1 className="font-display font-bold text-5xl uppercase tracking-tighter mb-4">Our Brands</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">We partner with the most trusted names in sports nutrition to bring you authentic, premium products.</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {brands.map(brand => (
          <Link key={brand.id} href={`/brands/${brand.slug}`} className="group flex flex-col items-center justify-center p-8 bg-card border border-border hover:border-[var(--color-brand)] hover:shadow-sm transition-all">
            <div className="h-20 w-20 mb-6 bg-muted rounded-full flex items-center justify-center overflow-hidden border border-border group-hover:border-[var(--color-brand)] transition-colors">
              <span className="text-xs text-muted-foreground font-bold tracking-widest uppercase">Logo</span>
            </div>
            <h3 className="font-bold text-center group-hover:text-[var(--color-brand)] transition-colors line-clamp-1">{brand.name}</h3>
            <p className="text-xs text-muted-foreground mt-2 font-bold uppercase tracking-wider">{brand.productCount} Products</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
