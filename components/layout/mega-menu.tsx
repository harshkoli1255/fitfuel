"use client"
import Link from "next/link"
import { useState, useRef } from "react"
import { getCategories } from "@/lib/data/categories"
import { getBrands } from "@/lib/data/brands"

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const categories = getCategories().filter(c => !c.parentId)
  const brands = getBrands().slice(0, 6)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150) // 150ms delay prevents accidental closes when moving mouse to menu
  }

  return (
    <nav className="hidden lg:flex items-center h-full">
      <div 
        className="h-full flex items-center px-4 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href="/shop" className={`text-sm font-bold uppercase tracking-wider transition-colors h-full flex items-center py-6 ${isOpen ? 'text-[var(--color-brand)]' : 'hover:text-[var(--color-brand)]'}`}>
          Shop All
        </Link>
        
        {/* Mega Menu Dropdown */}
        <div 
          className={`absolute top-full left-0 w-full bg-background border-b-4 border-[var(--color-brand)] shadow-2xl transition-all duration-300 ease-out z-50 origin-top ${
            isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
          }`}
        >
          <div className="container py-12">
            <div className="grid grid-cols-4 gap-8">
              
              <div className="col-span-1">
                <h3 className="font-display font-bold text-xl uppercase tracking-tighter mb-6 text-[var(--color-brand)]">Categories</h3>
                <ul className="space-y-4">
                  {categories.map(c => (
                    <li key={c.id}>
                      <Link href={`/categories/${c.slug}`} onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all block w-full">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/shop" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-wider text-foreground hover:text-[var(--color-brand)] transition-colors block w-full mt-4 pt-4 border-t border-border">
                      View All Categories &rarr;
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-2">
                <h3 className="font-display font-bold text-xl uppercase tracking-tighter mb-6 text-[var(--color-brand)]">Featured Brands</h3>
                <div className="grid grid-cols-2 gap-4">
                  {brands.map(b => (
                    <Link key={b.id} href={`/brands/${b.slug}`} onClick={() => setIsOpen(false)} className="group/brand flex items-center gap-4 p-4 border border-border hover:border-[var(--color-brand)] hover:shadow-md transition-all bg-card">
                      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-border group-hover/brand:border-[var(--color-brand)] transition-colors overflow-hidden p-1">
                         {b.logo ? (
                           <img src={b.logo} alt={b.name} className="w-full h-full object-contain mix-blend-multiply" />
                         ) : (
                           <span className="text-[10px] font-bold uppercase text-muted-foreground">Logo</span>
                         )}
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wider group-hover/brand:text-[var(--color-brand)] transition-colors">{b.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="col-span-1 bg-foreground p-8 border-4 border-border flex flex-col justify-center text-center group/promo cursor-pointer hover:border-[var(--color-brand)] transition-colors">
                <h3 className="font-display font-bold text-3xl uppercase tracking-tighter mb-4 text-background group-hover/promo:text-[var(--color-brand)] transition-colors">New Arrivals</h3>
                <p className="text-sm font-medium text-muted-foreground mb-8">Discover the latest premium supplements added to our catalog.</p>
                <Link href="/collections/new-arrivals" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-wider text-foreground bg-background py-4 px-6 hover:bg-[var(--color-brand)] hover:text-white transition-colors inline-block w-full">
                  Shop Now
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Other Top Level Links */}
      <Link href="/brands" className="px-4 text-sm font-bold uppercase tracking-wider transition-colors hover:text-[var(--color-brand)] py-6">Brands</Link>
      <Link href="/offers" className="px-4 text-sm font-bold uppercase tracking-wider transition-colors text-[var(--color-brand)] py-6">Offers</Link>
    </nav>
  )
}
