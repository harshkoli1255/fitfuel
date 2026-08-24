"use client"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Category, Brand } from "@/types"

interface ShopFiltersProps {
  categories: Category[];
  brands: Brand[];
  activeCategories: string[];
  activeBrands: string[];
}

export function ShopFilters({ categories, brands, activeCategories, activeBrands }: ShopFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleToggle = (type: 'category' | 'brand', id: string) => {
    const current = type === 'category' ? activeCategories : activeBrands
    const updated = current.includes(id) ? current.filter((x: string) => x !== id) : [...current, id]
    
    const params = new URLSearchParams(searchParams.toString())
    if (updated.length > 0) {
      params.set(type, updated.join(','))
    } else {
      params.delete(type)
    }
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="sticky top-24">
      <h2 className="font-display font-bold text-xl uppercase mb-6">Filters</h2>
      <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
        <div>
          <h3 className="font-bold text-sm uppercase mb-3 text-muted-foreground tracking-wider">Category</h3>
          <div className="space-y-3 text-sm">
            {categories.map((c: Category) => (
              <label key={c.id} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={activeCategories.includes(c.id)}
                  onChange={() => handleToggle('category', c.id)}
                  className="accent-[var(--color-brand)] w-4 h-4 cursor-pointer" 
                /> 
                <span className="font-medium group-hover:text-[var(--color-brand)] transition-colors">{c.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-sm uppercase mb-3 text-muted-foreground tracking-wider">Brand</h3>
          <div className="space-y-3 text-sm">
            {brands.map((b: Brand) => (
              <label key={b.id} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={activeBrands.includes(b.id)}
                  onChange={() => handleToggle('brand', b.id)}
                  className="accent-[var(--color-brand)] w-4 h-4 cursor-pointer" 
                /> 
                <span className="font-medium group-hover:text-[var(--color-brand)] transition-colors">{b.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MobileToggle() {
  return (
    <button className="md:hidden border border-border px-4 py-3 text-sm font-bold uppercase w-full sm:w-auto hover:border-[var(--color-brand)] transition-colors">
      Filters
    </button>
  )
}

export function SortSelect({ currentSort }: { currentSort: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value === 'recommended') params.delete('sort')
    else params.set('sort', e.target.value)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <select 
      value={currentSort}
      onChange={onChange}
      className="border border-border p-3 px-4 text-sm font-bold uppercase bg-background w-full sm:w-auto focus:outline-none focus:border-[var(--color-brand)]"
    >
      <option value="recommended">Recommended</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  )
}
