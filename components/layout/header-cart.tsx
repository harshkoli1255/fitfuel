"use client"
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { useEffect, useState } from 'react'

export function HeaderCart() {
  const { cartCount, openCart } = useCart()
  const [mounted, setMounted] = useState(false)
  
  // Hydration fix
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])
  
  return (
    <Button variant="ghost" size="icon" className="relative text-foreground h-12 w-12" onClick={openCart} aria-label="Cart">
      <ShoppingBag className="h-5 w-5" />
      {mounted && cartCount > 0 && (
        <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-brand)] text-[10px] font-bold text-white">
          {cartCount}
        </span>
      )}
    </Button>
  )
}
