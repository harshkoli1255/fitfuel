"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Minus, Plus, Trash2 } from "lucide-react"

export function CartView() {
  const { items, updateQuantity, removeItem, cartTotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="border-2 border-dashed border-border p-16 text-center bg-muted/30">
            <p className="text-muted-foreground font-bold uppercase tracking-widest mb-6">Your cart is currently empty.</p>
            <Link href="/shop"><Button className="rounded-none" size="lg">Continue Shopping</Button></Link>
          </div>
        </div>
        <div className="w-full lg:w-96 shrink-0">
          <div className="border-2 border-border p-8 bg-card sticky top-24 opacity-50">
            <h2 className="font-display font-bold text-3xl uppercase tracking-tighter mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm font-bold uppercase tracking-wider mb-8">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>-</span>
              </div>
              <div className="flex justify-between border-t-2 border-border pt-4 text-xl">
                <span>Total</span>
                <span>₹0</span>
              </div>
            </div>
            <Button size="lg" className="w-full rounded-none" disabled>Proceed to Checkout</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="flex-1">
        <div className="border-2 border-border p-6 sm:p-8 bg-card space-y-8">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 sm:gap-6 border-b border-border pb-8 last:border-0 last:pb-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white border border-border shrink-0 flex items-center justify-center p-2">
                {item.product.media && item.product.media.length > 0 ? (
                  <img src={item.product.media[0].src} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                ) : (
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Image</span>
                )}
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold uppercase tracking-wider text-sm sm:text-base pr-4 line-clamp-2">{item.product.name}</h3>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-red-500 transition-colors shrink-0">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-widest mb-4 space-y-1">
                  {item.flavor && <p>Flavor: {item.flavor}</p>}
                  {item.size && <p>Size: {item.size}</p>}
                </div>
                <div className="flex justify-between items-end mt-auto">
                  <div className="flex items-center border-2 border-border shrink-0">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2 hover:bg-muted transition-colors"><Minus className="h-4 w-4" /></button>
                    <span className="w-10 text-center font-bold text-base">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2 hover:bg-muted transition-colors"><Plus className="h-4 w-4" /></button>
                  </div>
                  <span className="font-bold text-xl sm:text-2xl tracking-tighter">₹{item.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-96 shrink-0">
        <div className="border-2 border-border p-8 bg-card sticky top-24">
          <h2 className="font-display font-bold text-3xl uppercase tracking-tighter mb-6">Order Summary</h2>
          <div className="space-y-4 text-sm font-bold uppercase tracking-wider mb-8">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className={cartTotal > 499 ? "text-[var(--color-brand)]" : ""}>{cartTotal > 499 ? 'FREE' : '₹50'}</span>
            </div>
            {cartTotal <= 499 && (
              <p className="text-xs text-muted-foreground font-medium lowercase first-letter:capitalize">Add ₹{500 - cartTotal} more for free shipping.</p>
            )}
            <div className="flex justify-between border-t-2 border-border pt-4 text-2xl font-display">
              <span>Total</span>
              <span>₹{cartTotal > 499 ? cartTotal : cartTotal + 50}</span>
            </div>
          </div>
          <Link href="/checkout"><Button size="lg" className="w-full rounded-none py-7 text-lg">Checkout Now</Button></Link>
        </div>
      </div>
    </div>
  )
}
