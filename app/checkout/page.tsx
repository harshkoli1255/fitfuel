"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const { items, cartTotal } = useCart()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "", firstName: "", lastName: "", address: "", city: "", postalCode: ""
  })
  const [orderComplete, setOrderComplete] = useState(false)

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(s => s + 1)
  }

  const handleComplete = () => {
    setOrderComplete(true)
    // Clear cart logic would go here in a real app
  }

  if (orderComplete) {
    return (
      <div className="container py-32 text-center max-w-2xl">
        <h1 className="font-display font-bold text-6xl uppercase tracking-tighter mb-6 text-[var(--color-brand)]">Order Confirmed!</h1>
        <p className="text-xl text-muted-foreground font-medium mb-12">Thank you for your purchase. Your premium fuel is being prepared for dispatch.</p>
        <Button size="lg" className="rounded-none px-12 py-6 text-lg" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-16 max-w-6xl">
      <h1 className="font-display font-bold text-5xl uppercase tracking-tighter mb-12 text-center">Checkout</h1>
      
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-12 order-2 lg:order-1">
          {/* STEP 1: CONTACT */}
          <section className={`transition-opacity ${step < 1 ? 'opacity-50 pointer-events-none' : ''}`}>
            <h2 className="font-display font-bold text-2xl uppercase tracking-tighter mb-6 flex items-center gap-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 1 ? 'bg-[var(--color-brand)] text-white' : 'bg-muted text-muted-foreground'}`}>1</span> 
              Contact
            </h2>
            {step === 1 ? (
              <form onSubmit={handleNext}>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email Address" className="w-full border-2 border-border p-4 font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] mb-4 bg-transparent" />
                <Button size="lg" className="rounded-none">Continue to Shipping</Button>
              </form>
            ) : (
              <div className="flex justify-between items-center border-2 border-border p-4 bg-muted/20">
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Email</p>
                  <p className="font-bold">{formData.email}</p>
                </div>
                <button onClick={() => setStep(1)} className="text-sm font-bold uppercase tracking-wider text-[var(--color-brand)] hover:underline">Edit</button>
              </div>
            )}
          </section>

          {/* STEP 2: SHIPPING */}
          <section className={`transition-opacity ${step < 2 ? 'opacity-50 pointer-events-none' : ''}`}>
            <h2 className="font-display font-bold text-2xl uppercase tracking-tighter mb-6 flex items-center gap-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-[var(--color-brand)] text-white' : 'bg-muted text-muted-foreground'}`}>2</span> 
              Shipping
            </h2>
            {step === 2 ? (
              <form onSubmit={handleNext} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="First Name" className="w-full border-2 border-border p-4 font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] bg-transparent" />
                  <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} placeholder="Last Name" className="w-full border-2 border-border p-4 font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] bg-transparent" />
                  <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Address" className="sm:col-span-2 w-full border-2 border-border p-4 font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] bg-transparent" />
                  <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="City" className="w-full border-2 border-border p-4 font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] bg-transparent" />
                  <input required type="text" value={formData.postalCode} onChange={e => setFormData({...formData, postalCode: e.target.value})} placeholder="Postal Code" className="w-full border-2 border-border p-4 font-bold uppercase tracking-wider focus:outline-none focus:border-[var(--color-brand)] bg-transparent" />
                </div>
                <Button size="lg" className="rounded-none mt-4">Continue to Payment</Button>
              </form>
            ) : step > 2 ? (
              <div className="flex justify-between items-center border-2 border-border p-4 bg-muted/20">
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Ship To</p>
                  <p className="font-bold">{formData.address}, {formData.city} {formData.postalCode}</p>
                </div>
                <button onClick={() => setStep(2)} className="text-sm font-bold uppercase tracking-wider text-[var(--color-brand)] hover:underline">Edit</button>
              </div>
            ) : null}
          </section>

          {/* STEP 3: PAYMENT */}
          <section className={`transition-opacity ${step < 3 ? 'opacity-50 pointer-events-none' : ''}`}>
            <h2 className="font-display font-bold text-2xl uppercase tracking-tighter mb-6 flex items-center gap-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 3 ? 'bg-[var(--color-brand)] text-white' : 'bg-muted text-muted-foreground'}`}>3</span> 
              Payment
            </h2>
            {step === 3 && (
              <div className="border-2 border-border p-8 bg-muted/30 text-center">
                <p className="font-bold uppercase tracking-wider text-muted-foreground mb-6">Mock Payment Environment</p>
                <Button size="lg" className="w-full rounded-none py-6 text-lg" onClick={handleComplete} disabled={items.length === 0}>
                  {items.length === 0 ? "Cart is empty" : "Complete Order"}
                </Button>
              </div>
            )}
          </section>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-muted/30 p-8 border-2 border-border h-fit sticky top-24 order-1 lg:order-2">
          <h2 className="font-display font-bold text-2xl uppercase tracking-tighter mb-6">Order Summary</h2>
          
          {items.length === 0 ? (
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Your cart is empty.</p>
          ) : (
            <div className="space-y-4 mb-8">
              {items.map(item => (
                <div key={item.id} className="flex justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-card border border-border shrink-0 flex items-center justify-center relative">
                      <span className="text-[10px] font-bold text-muted-foreground">Img</span>
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center font-bold">{item.quantity}</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-tight line-clamp-2 uppercase tracking-wider pr-4">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">{item.flavor} / {item.size}</p>
                    </div>
                  </div>
                  <span className="font-bold shrink-0">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4 text-sm font-bold uppercase tracking-wider pt-6 border-t-2 border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className={cartTotal > 499 ? "text-[var(--color-brand)]" : ""}>{cartTotal > 499 ? 'FREE' : '₹50'}</span>
            </div>
            <div className="flex justify-between text-3xl font-display mt-4 border-t-2 border-border pt-4">
              <span>Total</span>
              <span>₹{cartTotal > 0 ? (cartTotal > 499 ? cartTotal : cartTotal + 50) : 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
