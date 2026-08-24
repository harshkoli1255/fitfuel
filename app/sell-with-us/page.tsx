import { Button } from "@/components/ui/button"

export default function SellWithUsPage() {
  return (
    <div className="container py-24 max-w-3xl text-center">
      <h1 className="font-display font-bold text-6xl uppercase tracking-tighter mb-8">Sell With FitFuel</h1>
      <p className="text-xl text-muted-foreground font-medium mb-12 max-w-2xl mx-auto">
        Join India&apos;s fastest-growing premium sports nutrition marketplace. Reach thousands of highly targeted fitness enthusiasts.
      </p>
      <div className="border-2 border-[var(--color-brand)] p-12 bg-muted/30">
        <h2 className="font-display font-bold text-3xl uppercase tracking-tighter mb-6">Partner Application</h2>
        <p className="text-muted-foreground font-medium mb-8">Please email your brand deck and FSSAI certification to partners@fitfuel.com. Our merchandising team will review your application within 48 hours.</p>
        <Button size="lg" className="rounded-none px-12">Email Us</Button>
      </div>
    </div>
  )
}
