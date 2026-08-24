"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden text-foreground" 
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open Menu</span>
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-card border-r border-border shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border bg-foreground text-background">
            <span className="font-display font-bold text-2xl tracking-tighter uppercase">Menu</span>
            <Button variant="ghost" size="icon" className="text-background hover:bg-background/20" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4">Shop</h3>
              <Link href="/shop" onClick={() => setIsOpen(false)} className="block py-3 text-lg font-bold uppercase tracking-wider border-b border-border">All Products</Link>
              
              <div className="border-b border-border">
                <button 
                  className="w-full flex items-center justify-between py-3 text-lg font-bold uppercase tracking-wider"
                  onClick={() => document.getElementById('mobile-categories')?.classList.toggle('hidden')}
                >
                  Categories
                  <span className="text-xl leading-none">+</span>
                </button>
                <div id="mobile-categories" className="hidden pl-4 pb-4 space-y-3">
                  <Link href="/categories/protein" onClick={() => setIsOpen(false)} className="block text-sm font-bold uppercase tracking-wider text-muted-foreground">Protein</Link>
                  <Link href="/categories/creatine" onClick={() => setIsOpen(false)} className="block text-sm font-bold uppercase tracking-wider text-muted-foreground">Creatine</Link>
                  <Link href="/categories/pre-workout" onClick={() => setIsOpen(false)} className="block text-sm font-bold uppercase tracking-wider text-muted-foreground">Pre-Workout</Link>
                  <Link href="/categories/recovery" onClick={() => setIsOpen(false)} className="block text-sm font-bold uppercase tracking-wider text-muted-foreground">Recovery</Link>
                </div>
              </div>

              <Link href="/brands" onClick={() => setIsOpen(false)} className="block py-3 text-lg font-bold uppercase tracking-wider border-b border-border">Brands</Link>
              <Link href="/offers" onClick={() => setIsOpen(false)} className="block py-3 text-lg font-bold uppercase tracking-wider text-[var(--color-brand)] border-b border-border">Offers</Link>
            </div>
            
            <div className="space-y-2 pt-4">
              <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4">Account</h3>
              <Link href="/login" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-bold uppercase tracking-wider">Login</Link>
              <Link href="/account/orders" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-bold uppercase tracking-wider">My Orders</Link>
              <Link href="/cart" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-bold uppercase tracking-wider">Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
