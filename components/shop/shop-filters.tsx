"use client"
import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Category, Brand } from "@/types"
import { FilterParams } from "@/lib/utils/filter-products"
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react"

interface ShopFiltersProps {
  categories?: Category[];
  brands?: Brand[];
  activeParams: FilterParams;
  hideCategory?: boolean;
}

// ─── Reusable filter section with accordion ─────────────────────────────────
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-3 text-sm font-bold uppercase tracking-wider"
      >
        {title}
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && <div className="mt-1 space-y-2.5">{children}</div>}
    </div>
  )
}

// ─── Checkbox item ───────────────────────────────────────────────────────────
function FilterCheckbox({
  label, checked, onChange, count
}: { label: string; checked: boolean; onChange: () => void; count?: number }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group text-sm">
      <div
        onClick={onChange}
        className={`w-4 h-4 border-2 flex items-center justify-center shrink-0 cursor-pointer transition-colors ${checked ? 'bg-[var(--color-brand)] border-[var(--color-brand)]' : 'border-border hover:border-[var(--color-brand)]'}`}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="font-medium group-hover:text-[var(--color-brand)] transition-colors flex-1">
        {label}
      </span>
      {count !== undefined && (
        <span className="text-[10px] text-muted-foreground font-medium">({count})</span>
      )}
    </label>
  )
}

// ─── Core filter logic hook ──────────────────────────────────────────────────
function useFilters(activeParams: FilterParams) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleToggle = (type: keyof FilterParams, value: string) => {
    const currentStr = activeParams[type] as string || ''
    const current = currentStr ? currentStr.split(',') : []
    const updated = current.includes(value) ? current.filter(x => x !== value) : [...current, value]
    const params = new URLSearchParams(searchParams.toString())
    if (updated.length > 0) params.set(type as string, updated.join(','))
    else params.delete(type as string)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleSingle = (type: keyof FilterParams, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (activeParams[type] === value) params.delete(type as string)
    else params.set(type as string, value)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handlePrice = (min: string, max: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (min) params.set('minPrice', min); else params.delete('minPrice')
    if (max) params.set('maxPrice', max); else params.delete('maxPrice')
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const clearAll = () => router.push(pathname, { scroll: false })
  const activeCount = Array.from(searchParams.keys()).filter(k => k !== 'sort').length

  return { handleToggle, handleSingle, handlePrice, clearAll, activeCount }
}

// ─── Desktop sidebar filters ─────────────────────────────────────────────────
export function ShopFilters({ categories = [], brands = [], activeParams, hideCategory = false }: ShopFiltersProps) {
  const { handleToggle, handleSingle, handlePrice, clearAll, activeCount } = useFilters(activeParams)

  const categoryActive = (activeParams.category || '').split(',').filter(Boolean)
  const brandActive = (activeParams.brand || '').split(',').filter(Boolean)
  const priceActive = (activeParams.price || '').split(',').filter(Boolean)
  const availabilityActive = (activeParams.availability || '').split(',').filter(Boolean)

  return (
    <div className="sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-lg uppercase tracking-tight flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="text-xs bg-[var(--color-brand)] text-white px-1.5 py-0.5 rounded-full">{activeCount}</span>
          )}
        </h2>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs font-bold text-[var(--color-brand)] uppercase hover:underline">
            Clear All
          </button>
        )}
      </div>
      <div className="space-y-1">
        {!hideCategory && categories.length > 0 && (
          <FilterSection title="Category">
            {categories.map(c => (
              <FilterCheckbox
                key={c.id}
                label={c.name}
                checked={categoryActive.includes(c.id)}
                onChange={() => handleToggle('category', c.id)}
              />
            ))}
          </FilterSection>
        )}

        {brands.length > 0 && (
          <FilterSection title="Brand">
            {brands.map(b => (
              <FilterCheckbox
                key={b.id}
                label={b.name}
                checked={brandActive.includes(b.id)}
                onChange={() => handleToggle('brand', b.id)}
              />
            ))}
          </FilterSection>
        )}

        <FilterSection title="Price Range">
          {[
            { id: 'under-1000', label: 'Under ₹1,000' },
            { id: '1000-3000', label: '₹1,000 – ₹3,000' },
            { id: 'over-3000', label: 'Over ₹3,000' },
          ].map(p => (
            <FilterCheckbox
              key={p.id}
              label={p.label}
              checked={priceActive.includes(p.id)}
              onChange={() => handleToggle('price', p.id)}
            />
          ))}
          <div className="flex gap-2 mt-3">
            <input
              type="number"
              placeholder="Min ₹"
              defaultValue={activeParams.minPrice || ''}
              className="w-full border border-border px-2 py-1.5 text-xs rounded outline-none focus:border-[var(--color-brand)]"
              onBlur={e => handlePrice(e.target.value, activeParams.maxPrice || '')}
            />
            <input
              type="number"
              placeholder="Max ₹"
              defaultValue={activeParams.maxPrice || ''}
              className="w-full border border-border px-2 py-1.5 text-xs rounded outline-none focus:border-[var(--color-brand)]"
              onBlur={e => handlePrice(activeParams.minPrice || '', e.target.value)}
            />
          </div>
        </FilterSection>

        <FilterSection title="Rating">
          {[4, 3, 2].map(r => (
            <label key={r} className="flex items-center gap-3 cursor-pointer group text-sm">
              <input
                type="radio"
                name="rating"
                checked={activeParams.rating === String(r)}
                onChange={() => handleSingle('rating', String(r))}
                className="accent-[var(--color-brand)] w-4 h-4 cursor-pointer"
              />
              <span className="font-medium group-hover:text-[var(--color-brand)] transition-colors">
                {'★'.repeat(r)}{'☆'.repeat(5 - r)} &amp; Up
              </span>
            </label>
          ))}
        </FilterSection>

        <FilterSection title="Availability">
          {[
            { id: 'in-stock', label: 'In Stock' },
            { id: 'out-of-stock', label: 'Out of Stock' },
          ].map(a => (
            <FilterCheckbox
              key={a.id}
              label={a.label}
              checked={availabilityActive.includes(a.id)}
              onChange={() => handleToggle('availability', a.id)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Offers">
          <FilterCheckbox
            label="On Sale / Discounted"
            checked={activeParams.discount === 'true'}
            onChange={() => handleSingle('discount', 'true')}
          />
        </FilterSection>
      </div>
    </div>
  )
}

// ─── Mobile filter drawer ─────────────────────────────────────────────────────
export function MobileFilterDrawer({ categories = [], brands = [], activeParams, hideCategory = false }: ShopFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { handleToggle, handleSingle, handlePrice, clearAll, activeCount } = useFilters(activeParams)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const categoryActive = (activeParams.category || '').split(',').filter(Boolean)
  const brandActive = (activeParams.brand || '').split(',').filter(Boolean)
  const priceActive = (activeParams.price || '').split(',').filter(Boolean)
  const availabilityActive = (activeParams.availability || '').split(',').filter(Boolean)

  const open = () => {
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }
  const close = () => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <button
        onClick={open}
        className="md:hidden flex items-center gap-2 border border-border px-4 py-2.5 text-sm font-bold uppercase tracking-wider hover:border-[var(--color-brand)] transition-colors"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {activeCount > 0 && (
          <span className="ml-1 text-xs bg-[var(--color-brand)] text-white px-1.5 py-0.5 rounded-full">{activeCount}</span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            onClick={close}
          />

          {/* Drawer */}
          <div className="fixed inset-x-0 bottom-0 z-[210] bg-background rounded-t-2xl shadow-2xl flex flex-col" style={{ maxHeight: '90vh' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
              <h2 className="font-bold text-lg uppercase tracking-tight flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeCount > 0 && (
                  <span className="text-xs bg-[var(--color-brand)] text-white px-1.5 py-0.5 rounded-full">{activeCount}</span>
                )}
              </h2>
              <div className="flex items-center gap-4">
                {activeCount > 0 && (
                  <button onClick={() => { clearAll(); close() }} className="text-sm font-bold text-[var(--color-brand)]">
                    Clear All
                  </button>
                )}
                <button onClick={close} className="h-8 w-8 flex items-center justify-center hover:bg-muted rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-2 space-y-1">
              {!hideCategory && categories.length > 0 && (
                <FilterSection title="Category">
                  {categories.map(c => (
                    <FilterCheckbox
                      key={c.id}
                      label={c.name}
                      checked={categoryActive.includes(c.id)}
                      onChange={() => handleToggle('category', c.id)}
                    />
                  ))}
                </FilterSection>
              )}

              {brands.length > 0 && (
                <FilterSection title="Brand">
                  {brands.map(b => (
                    <FilterCheckbox
                      key={b.id}
                      label={b.name}
                      checked={brandActive.includes(b.id)}
                      onChange={() => handleToggle('brand', b.id)}
                    />
                  ))}
                </FilterSection>
              )}

              <FilterSection title="Price Range">
                {[
                  { id: 'under-1000', label: 'Under ₹1,000' },
                  { id: '1000-3000', label: '₹1,000 – ₹3,000' },
                  { id: 'over-3000', label: 'Over ₹3,000' },
                ].map(p => (
                  <FilterCheckbox
                    key={p.id}
                    label={p.label}
                    checked={priceActive.includes(p.id)}
                    onChange={() => handleToggle('price', p.id)}
                  />
                ))}
                <div className="flex gap-2 mt-3">
                  <input
                    type="number"
                    placeholder="Min ₹"
                    defaultValue={activeParams.minPrice || ''}
                    className="w-full border border-border px-3 py-2 text-sm rounded-lg outline-none focus:border-[var(--color-brand)]"
                    onBlur={e => handlePrice(e.target.value, activeParams.maxPrice || '')}
                  />
                  <input
                    type="number"
                    placeholder="Max ₹"
                    defaultValue={activeParams.maxPrice || ''}
                    className="w-full border border-border px-3 py-2 text-sm rounded-lg outline-none focus:border-[var(--color-brand)]"
                    onBlur={e => handlePrice(activeParams.minPrice || '', e.target.value)}
                  />
                </div>
              </FilterSection>

              <FilterSection title="Rating">
                {[4, 3, 2].map(r => (
                  <label key={r} className="flex items-center gap-3 cursor-pointer group text-sm">
                    <input
                      type="radio"
                      name="rating-mobile"
                      checked={activeParams.rating === String(r)}
                      onChange={() => handleSingle('rating', String(r))}
                      className="accent-[var(--color-brand)] w-4 h-4"
                    />
                    <span className="font-medium">{'★'.repeat(r)}{'☆'.repeat(5 - r)} &amp; Up</span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Availability">
                {[
                  { id: 'in-stock', label: 'In Stock' },
                  { id: 'out-of-stock', label: 'Out of Stock' },
                ].map(a => (
                  <FilterCheckbox
                    key={a.id}
                    label={a.label}
                    checked={availabilityActive.includes(a.id)}
                    onChange={() => handleToggle('availability', a.id)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Offers">
                <FilterCheckbox
                  label="On Sale / Discounted"
                  checked={activeParams.discount === 'true'}
                  onChange={() => handleSingle('discount', 'true')}
                />
              </FilterSection>
            </div>

            {/* Footer */}
            <div className="shrink-0 px-5 py-4 border-t border-border">
              <button
                onClick={close}
                className="w-full py-3.5 bg-foreground text-background font-bold uppercase tracking-wider text-sm hover:bg-[var(--color-brand)] transition-colors rounded-lg"
              >
                Apply Filters {activeCount > 0 ? `(${activeCount})` : ''}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

// ─── Sort select ─────────────────────────────────────────────────────────────
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
      className="border border-border px-3 py-2.5 text-sm font-bold bg-background focus:outline-none focus:border-[var(--color-brand)] cursor-pointer rounded-md"
    >
      <option value="recommended">Recommended</option>
      <option value="best-selling">Best Selling</option>
      <option value="newest">Newest</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">A–Z</option>
      <option value="name-desc">Z–A</option>
      <option value="discount">Discount</option>
      <option value="rating">Rating</option>
    </select>
  )
}

// ─── Legacy export kept for any remaining uses ────────────────────────────────
export function MobileToggle() {
  return null // Replaced by MobileFilterDrawer
}
