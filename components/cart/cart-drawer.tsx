"use client"
import Link from 'next/link'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { useEffect } from 'react'

export function CartDrawer() {
  const { items, cartTotal, isOpen, closeCart, updateQuantity, removeItem } = useCart()

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[450px] bg-background shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/10">
          <h2 className="font-display font-bold text-2xl uppercase tracking-tighter flex items-center gap-3">
            <ShoppingBag className="h-6 w-6" /> Your Cart
          </h2>
          <button onClick={closeCart} className="text-muted-foreground hover:text-foreground transition-colors p-2">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-50">
              <ShoppingBag className="h-24 w-24 text-muted-foreground" />
              <p className="text-xl font-bold uppercase tracking-wider text-muted-foreground">Your cart is empty</p>
              <Button onClick={closeCart} size="lg" className="rounded-none">Continue Shopping</Button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 border-b border-border pb-6 last:border-0 last:pb-0">
                <div className="w-20 h-20 bg-white border border-border shrink-0 flex items-center justify-center p-1">
                  {item.product.media && item.product.media.length > 0 ? (
                    <img src={item.product.media[0].src} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                  ) : (
                    <span className="text-[8px] font-bold uppercase text-muted-foreground">Image</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm uppercase tracking-wider leading-tight pr-4 line-clamp-2"><Link href={`/products/${item.product.slug}`} onClick={closeCart} className="hover:text-[var(--color-brand)]">{item.product.name}</Link></h3>
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-red-500 transition-colors shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-3">
                    {item.flavor} / {item.size}
                  </p>
                  <div className="flex justify-between items-end mt-auto">
                    <div className="flex items-center border border-border shrink-0">
                      <button aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-muted transition-colors"><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                      <button aria-label="Increase quantity" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-muted transition-colors"><Plus className="h-3 w-3" /></button>
                    </div>
                    <span className="font-bold tracking-tighter">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-muted/10">
            <div className="flex justify-between text-sm font-bold uppercase tracking-wider mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-xl">₹{cartTotal}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-6 font-medium">Shipping calculated at checkout</p>
            <div className="flex flex-col gap-3">
              <Button asChild size="lg" className="w-full rounded-none py-6 text-lg" onClick={closeCart}>
                <Link href="/checkout">Checkout — ₹{cartTotal}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full rounded-none border-2" onClick={closeCart}>
                <Link href="/cart">View Cart</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
