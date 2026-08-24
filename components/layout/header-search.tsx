"use client"

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { getProducts } from '@/lib/data/products'
import Link from 'next/link'

export function HeaderSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  const results = query.length > 2 
    ? getProducts().filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5) 
    : []

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsOpen(false)
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="relative" ref={ref}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="hidden sm:inline-flex text-foreground h-12 w-12" 
        onClick={() => setIsOpen(!isOpen)} 
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="absolute top-14 right-0 w-screen max-w-[400px] bg-background border-2 border-border shadow-2xl z-50 transform origin-top-right transition-all">
          <form onSubmit={handleSubmit} className="p-4 border-b border-border flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input 
              autoFocus
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH PRODUCTS, BRANDS..." 
              className="flex-1 bg-transparent border-none outline-none text-sm font-bold uppercase tracking-wider"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            )}
          </form>

          {query.length > 2 && (
            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
              {results.length > 0 ? (
                <div className="p-2">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 mb-2 mt-2">Products</p>
                  {results.map(p => (
                    <Link 
                      key={p.id} 
                      href={`/products/${p.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 p-2 hover:bg-muted transition-colors group"
                    >
                      <div className="w-12 h-12 bg-card shrink-0 flex items-center justify-center border border-border group-hover:border-[var(--color-brand)] transition-colors">
                        <span className="text-[8px] font-bold text-muted-foreground uppercase">Img</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider leading-tight truncate group-hover:text-[var(--color-brand)] transition-colors">{p.name}</p>
                        <p className="text-xs text-muted-foreground font-bold mt-1">₹{p.variants[0]?.price}</p>
                      </div>
                    </Link>
                  ))}
                  <button 
                    onClick={handleSubmit}
                    className="w-full text-center p-4 text-xs font-bold uppercase tracking-wider text-background bg-foreground hover:bg-foreground/90 mt-2 transition-colors"
                  >
                    View all results for &quot;{query}&quot;
                  </button>
                </div>
              ) : (
                <div className="p-12 text-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  No results found.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
