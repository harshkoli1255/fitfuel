import Link from 'next/link'

export default function AccountDashboard() {
  return (
    <div className="container py-16">
      <h1 className="font-display font-bold text-5xl uppercase tracking-tighter mb-12">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-12">
        <aside className="w-full md:w-64 shrink-0 border-2 border-border bg-card p-6 h-fit">
          <nav className="space-y-4 text-sm font-bold uppercase tracking-wider">
            <Link href="/account" className="block text-[var(--color-brand)]">Dashboard</Link>
            <Link href="/account/orders" className="block text-muted-foreground hover:text-foreground">Orders</Link>
            <Link href="/account/wishlist" className="block text-muted-foreground hover:text-foreground">Wishlist</Link>
            <Link href="/account/addresses" className="block text-muted-foreground hover:text-foreground">Addresses</Link>
            <Link href="/login" className="block text-muted-foreground hover:text-foreground mt-8 pt-4 border-t-2 border-border">Logout</Link>
          </nav>
        </aside>

        <div className="flex-1 space-y-8">
          <div className="border-2 border-border p-8 bg-muted/30">
            <h2 className="font-display font-bold text-3xl uppercase tracking-tighter mb-4">Welcome back, Athlete!</h2>
            <p className="text-muted-foreground font-medium mb-6">From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
          </div>

          <h2 className="font-display font-bold text-3xl uppercase tracking-tighter">Recent Orders</h2>
          <div className="border-2 border-dashed border-border p-12 text-center text-muted-foreground font-bold uppercase tracking-wider">
            No orders placed yet.
          </div>
        </div>
      </div>
    </div>
  )
}
