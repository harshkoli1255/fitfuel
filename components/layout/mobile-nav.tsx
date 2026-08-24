"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('main') // 'main', 'categories', 'brands'

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      // reset menu state when closed
      setTimeout(() => setActiveMenu('main'), 300)
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden text-foreground hover:bg-transparent" 
        onClick={() => setIsOpen(true)}
        aria-label="Open Menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 z-[110] w-[85vw] max-w-[320px] bg-background shadow-2xl transition-transform duration-300 ease-in-out flex flex-col lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border bg-foreground text-background shrink-0 h-16">
          <span className="font-display font-bold text-2xl tracking-tighter uppercase">Menu</span>
          <Button variant="ghost" size="icon" className="text-background hover:bg-background/20 h-10 w-10" onClick={closeMenu} aria-label="Close Menu">
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="relative flex-1 overflow-hidden">
          {/* MAIN MENU */}
          <div className={`absolute inset-0 overflow-y-auto p-4 transition-transform duration-300 ease-in-out ${activeMenu === 'main' ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="space-y-1">
              <Link href="/shop" onClick={closeMenu} className="block py-4 text-sm font-bold uppercase tracking-wider border-b border-border">All Products</Link>
              
              <button 
                className="w-full flex items-center justify-between py-4 text-sm font-bold uppercase tracking-wider border-b border-border text-left"
                onClick={() => setActiveMenu('categories')}
              >
                Shop By Category
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button 
                className="w-full flex items-center justify-between py-4 text-sm font-bold uppercase tracking-wider border-b border-border text-left"
                onClick={() => setActiveMenu('brands')}
              >
                Shop By Brand
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <Link href="/collections/deals" onClick={closeMenu} className="block py-4 text-sm font-bold uppercase tracking-wider text-[var(--color-brand)] border-b border-border">Deals & Offers</Link>
              <Link href="/blogs" onClick={closeMenu} className="block py-4 text-sm font-bold uppercase tracking-wider border-b border-border">FitFuel TV & Blog</Link>
            </div>
            
            <div className="space-y-1 mt-8">
              <h3 className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground mb-2 px-2">Account</h3>
              <Link href="/login" onClick={closeMenu} className="block py-3 px-2 text-sm font-bold uppercase tracking-wider hover:bg-muted rounded-md transition-colors">Login</Link>
              <Link href="/account/orders" onClick={closeMenu} className="block py-3 px-2 text-sm font-bold uppercase tracking-wider hover:bg-muted rounded-md transition-colors">My Orders</Link>
              <Link href="/cart" onClick={closeMenu} className="block py-3 px-2 text-sm font-bold uppercase tracking-wider hover:bg-muted rounded-md transition-colors">Cart</Link>
            </div>
          </div>

          {/* CATEGORIES SUBMENU */}
          <div className={`absolute inset-0 overflow-y-auto bg-background transition-transform duration-300 ease-in-out ${activeMenu === 'categories' ? 'translate-x-0' : 'translate-x-full'}`}>
            <button 
              onClick={() => setActiveMenu('main')}
              className="w-full flex items-center gap-2 p-4 bg-muted text-sm font-bold uppercase tracking-wider border-b border-border"
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>
            <div className="p-4 space-y-1">
              <h3 className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground mb-4 px-2">Categories</h3>
              {["Sports Nutrition", "Protein", "Creatine", "Pre-Workout", "Vitamins & Supplements", "Multivitamins", "Omega-3", "Healthy Snacking", "Protein Bars"].map(cat => (
                <Link 
                  key={cat} 
                  href={`/categories/${cat.toLowerCase().replace(/ & | /g, '-')}`} 
                  onClick={closeMenu} 
                  className="block py-3 px-2 text-sm font-bold uppercase tracking-wider border-b border-border hover:bg-muted transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* BRANDS SUBMENU */}
          <div className={`absolute inset-0 overflow-y-auto bg-background transition-transform duration-300 ease-in-out ${activeMenu === 'brands' ? 'translate-x-0' : 'translate-x-full'}`}>
            <button 
              onClick={() => setActiveMenu('main')}
              className="w-full flex items-center gap-2 p-4 bg-muted text-sm font-bold uppercase tracking-wider border-b border-border"
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>
            <div className="p-4 space-y-1">
              <h3 className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground mb-4 px-2">Popular Brands</h3>
              {["Optimum Nutrition", "MuscleBlaze", "GNC", "MyProtein", "Dymatize", "Isopure", "MuscleTech", "BSN"].map(brand => (
                <Link 
                  key={brand} 
                  href={`/brands/${brand.toLowerCase().replace(/ /g, '-')}`} 
                  onClick={closeMenu} 
                  className="block py-3 px-2 text-sm font-bold uppercase tracking-wider border-b border-border hover:bg-muted transition-colors"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
