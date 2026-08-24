"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X, TrendingUp, Award, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getProducts, getFeaturedProducts } from '@/lib/data/products'
import { getBrands } from '@/lib/data/brands'
import { getCategories } from '@/lib/data/categories'
import { getPrimaryProductImage } from '@/lib/utils/product-media'
import Link from 'next/link'
import Image from 'next/image'

const POPULAR_SEARCHES = [
  "Whey Protein", "Creatine", "Pre-Workout", "BCAA",
  "Optimum Nutrition", "GNC", "Vitamins", "Omega-3"
]

export function HeaderSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const allProducts = getProducts()
  const brands = getBrands()
  const categories = getCategories()

  const recommended = getFeaturedProducts().slice(0, 4)

  const productResults = query.length > 1
    ? allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : []

  const brandResults = query.length > 1
    ? brands.filter(b => b.name.toLowerCase().includes(query.toLowerCase())).slice(0, 2)
    : []

  const categoryResults = query.length > 1
    ? categories.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 2)
    : []

  const totalResults = productResults.length + brandResults.length + categoryResults.length
  // flat list for keyboard navigation
  const allResultLinks = [
    ...productResults.map(p => ({ type: 'product', href: `/products/${p.slug}` })),
    ...brandResults.map(b => ({ type: 'brand', href: `/brands/${b.slug}` })),
    ...categoryResults.map(c => ({ type: 'category', href: `/categories/${c.slug}` })),
  ]

  const open = useCallback(() => {
    setIsOpen(true)
    setActiveIndex(-1)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setActiveIndex(-1)
  }, [])

  // Click outside close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [close])

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [close])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      close()
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, allResultLinks.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      const target = allResultLinks[activeIndex]
      if (target) {
        close()
        router.push(target.href)
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative hidden lg:flex items-center mr-2 transition-[width] duration-300 ease-out w-[260px] focus-within:w-[360px]"
    >
      <form onSubmit={handleSubmit} className="relative w-full" role="search">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          value={query}
          onChange={e => { setQuery(e.target.value); setActiveIndex(-1) }}
          onFocus={open}
          onKeyDown={handleKeyDown}
          placeholder="Search products, brands..."
          className="w-full bg-muted border border-transparent rounded-full py-2 pl-10 pr-10 text-sm outline-none transition-all focus:bg-background focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20 focus:shadow-md"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full right-0 mt-2 bg-background border border-border shadow-2xl rounded-lg z-[200] overflow-hidden"
          style={{
            width: 'min(600px, calc(100vw - 2rem))',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          {!query ? (
            // — Empty state: popular + recommended —
            <div className="p-5">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map(s => (
                    <button
                      key={s}
                      onClick={() => { setQuery(s); inputRef.current?.focus() }}
                      className="px-3 py-1.5 bg-muted text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-full transition-colors border border-border"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recommended For You</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {recommended.map(product => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={close}
                      className="group block border border-border rounded-lg p-2.5 hover:border-[var(--color-brand)] transition-colors"
                    >
                      {product.variants[0]?.compareAtPrice && (
                        <div className="text-[9px] font-bold text-[var(--color-brand)] mb-1">
                          {Math.round((1 - product.variants[0].price / product.variants[0].compareAtPrice) * 100)}% OFF
                        </div>
                      )}
                      <div className="aspect-square relative mb-2 bg-white rounded flex items-center justify-center">
                        <Image
                          unoptimized
                          src={getPrimaryProductImage(product)}
                          alt={product.name}
                          width={72}
                          height={72}
                          className="object-contain max-h-full"
                        />
                      </div>
                      <p className="text-[10px] font-bold leading-tight line-clamp-2 mb-1 group-hover:text-[var(--color-brand)] transition-colors">
                        {product.name}
                      </p>
                      <p className="text-[11px] font-bold text-[var(--color-brand)]">
                        ₹{product.variants[0]?.price}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : totalResults === 0 ? (
            // — No results —
            <div className="p-10 text-center">
              <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-40" />
              <p className="text-sm font-bold text-muted-foreground">No results for "{query}"</p>
              <p className="text-xs text-muted-foreground mt-1">Try searching by brand or category</p>
            </div>
          ) : (
            // — Results —
            <div className="py-2">
              {productResults.length > 0 && (
                <div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2 border-b border-border">Products</p>
                  {productResults.map((p, i) => {
                    const isActive = activeIndex === i
                    return (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug}`}
                        onClick={close}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors group ${isActive ? 'bg-muted' : 'hover:bg-muted/50'}`}
                      >
                        <div className="w-10 h-10 bg-white shrink-0 flex items-center justify-center border border-border rounded p-1">
                          <Image
                            unoptimized
                            src={getPrimaryProductImage(p)}
                            alt={p.name}
                            width={36}
                            height={36}
                            className="object-contain max-h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate group-hover:text-[var(--color-brand)] transition-colors">{p.name}</p>
                          <p className="text-xs text-muted-foreground">₹{p.variants[0]?.price}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}

              {brandResults.length > 0 && (
                <div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2 border-b border-border border-t mt-1">Brands</p>
                  {brandResults.map((b, i) => {
                    const idx = productResults.length + i
                    const isActive = activeIndex === idx
                    return (
                      <Link
                        key={b.id}
                        href={`/brands/${b.slug}`}
                        onClick={close}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${isActive ? 'bg-muted' : 'hover:bg-muted/50'}`}
                      >
                        <div className="w-10 h-10 bg-white border border-border rounded-full overflow-hidden shrink-0 flex items-center justify-center">
                          {b.logo ? (
                            <Image unoptimized src={b.logo} alt={b.name} width={36} height={36} className="object-contain p-1" />
                          ) : (
                            <span className="text-[8px] font-bold text-muted-foreground">{b.name.slice(0, 2)}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{b.name}</p>
                          <p className="text-xs text-muted-foreground">Brand · {b.productCount} Products</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}

              {categoryResults.length > 0 && (
                <div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2 border-b border-border border-t mt-1">Categories</p>
                  {categoryResults.map((c, i) => {
                    const idx = productResults.length + brandResults.length + i
                    const isActive = activeIndex === idx
                    return (
                      <Link
                        key={c.id}
                        href={`/categories/${c.slug}`}
                        onClick={close}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${isActive ? 'bg-muted' : 'hover:bg-muted/50'}`}
                      >
                        <div className="w-10 h-10 bg-muted border border-border rounded shrink-0 overflow-hidden flex items-center justify-center">
                          {c.image ? (
                            <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{c.name}</p>
                          <p className="text-xs text-muted-foreground">Category</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}

              <div className="px-4 py-3 border-t border-border mt-1">
                <button
                  onClick={handleSubmit as any}
                  className="w-full text-center py-2.5 text-sm font-bold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] transition-colors rounded-md"
                >
                  See all results for "{query}"
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Mobile search button — triggers full-screen search overlay
export function MobileSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const allProducts = getProducts()
  const brands = getBrands()
  const categories = getCategories()

  const productResults = query.length > 1
    ? allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : []
  const brandResults = query.length > 1
    ? brands.filter(b => b.name.toLowerCase().includes(query.toLowerCase())).slice(0, 2)
    : []
  const categoryResults = query.length > 1
    ? categories.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 2)
    : []

  const open = () => {
    setIsOpen(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }
  const close = () => { setIsOpen(false); setQuery('') }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      close()
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <>
      <button
        onClick={open}
        className="lg:hidden flex items-center justify-center h-10 w-10 text-foreground"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[300] bg-background flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border shrink-0">
            <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-3 bg-muted rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products, brands..."
                className="flex-1 bg-transparent text-sm outline-none font-medium"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="text-muted-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>
            <button onClick={close} className="text-sm font-bold text-[var(--color-brand)] shrink-0">Cancel</button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {!query ? (
              <div className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Trending</p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map(s => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="px-3 py-1.5 bg-muted text-xs font-semibold text-muted-foreground rounded-full border border-border"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {productResults.length === 0 && brandResults.length === 0 && categoryResults.length === 0 ? (
                  <div className="p-10 text-center">
                    <p className="text-sm font-bold text-muted-foreground">No results for "{query}"</p>
                  </div>
                ) : (
                  <>
                    {productResults.map(p => (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug}`}
                        onClick={close}
                        className="flex items-center gap-3 px-4 py-3 border-b border-border/50 hover:bg-muted/50 active:bg-muted"
                      >
                        <div className="w-12 h-12 bg-white border border-border rounded shrink-0 flex items-center justify-center">
                          <Image unoptimized src={getPrimaryProductImage(p)} alt={p.name} width={44} height={44} className="object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold line-clamp-2">{p.name}</p>
                          <p className="text-xs text-[var(--color-brand)] font-bold mt-0.5">₹{p.variants[0]?.price}</p>
                        </div>
                      </Link>
                    ))}
                    {brandResults.map(b => (
                      <Link
                        key={b.id}
                        href={`/brands/${b.slug}`}
                        onClick={close}
                        className="flex items-center gap-3 px-4 py-3 border-b border-border/50 hover:bg-muted/50"
                      >
                        <div className="w-12 h-12 bg-white border border-border rounded-full shrink-0 flex items-center justify-center overflow-hidden">
                          {b.logo && <Image unoptimized src={b.logo} alt={b.name} width={44} height={44} className="object-contain p-1" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{b.name}</p>
                          <p className="text-xs text-muted-foreground">Brand</p>
                        </div>
                      </Link>
                    ))}
                    {categoryResults.map(c => (
                      <Link
                        key={c.id}
                        href={`/categories/${c.slug}`}
                        onClick={close}
                        className="flex items-center gap-3 px-4 py-3 border-b border-border/50 hover:bg-muted/50"
                      >
                        <div className="w-12 h-12 bg-muted border border-border rounded shrink-0 overflow-hidden">
                          {c.image ? <img src={c.image} alt={c.name} className="w-full h-full object-cover" /> : <Package className="h-5 w-5 text-muted-foreground m-auto mt-3.5" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{c.name}</p>
                          <p className="text-xs text-muted-foreground">Category</p>
                        </div>
                      </Link>
                    ))}
                    <div className="p-4">
                      <button
                        onClick={handleSubmit as any}
                        className="w-full py-3 text-sm font-bold text-white bg-[var(--color-brand)] rounded-lg"
                      >
                        View all results for "{query}"
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
