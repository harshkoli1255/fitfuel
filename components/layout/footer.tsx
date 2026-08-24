import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 sm:py-20 mt-auto">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <span className="font-display font-bold text-3xl tracking-tighter uppercase mb-6 block text-background">Fit<span className="text-[var(--color-brand)]">Fuel</span></span>
          <p className="text-muted-foreground text-sm max-w-xs">
            Premium sports nutrition, supplements and wellness essentials delivered to your door. Fuel your ambition.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold uppercase tracking-wider mb-6 text-[var(--color-brand)]">Shop</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/shop" className="hover:text-background transition-colors">All Products</Link></li>
            <li><Link href="/categories/protein" className="hover:text-background transition-colors">Whey Protein</Link></li>
            <li><Link href="/categories/creatine" className="hover:text-background transition-colors">Creatine</Link></li>
            <li><Link href="/categories/pre-workout" className="hover:text-background transition-colors">Pre-Workout</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-wider mb-6 text-[var(--color-brand)]">Company</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-background transition-colors">About Us</Link></li>
            <li><Link href="/authenticity" className="hover:text-background transition-colors">Authenticity</Link></li>
            <li><Link href="/blogs" className="hover:text-background transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-background transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-wider mb-6 text-[var(--color-brand)]">Support</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/faq" className="hover:text-background transition-colors">FAQ</Link></li>
            <li><Link href="/account/orders" className="hover:text-background transition-colors">Track Order</Link></li>
            <li><Link href="/bulk-purchase" className="hover:text-background transition-colors">Bulk Purchase</Link></li>
            <li><Link href="/sell-with-us" className="hover:text-background transition-colors">Sell With FitFuel</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t border-muted-foreground/20 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} FitFuel. All rights reserved.</p>
      </div>
    </footer>
  )
}
