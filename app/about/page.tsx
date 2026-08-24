import { CheckCircle2, ShieldCheck, Trophy, Truck } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="bg-foreground text-background py-24 mb-16 text-center border-b-8 border-[var(--color-brand)]">
        <div className="container max-w-4xl">
          <h1 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter mb-6">About FitFuel</h1>
          <p className="text-xl md:text-2xl font-medium text-muted/80 max-w-2xl mx-auto">
            India's most trusted destination for authentic sports nutrition, vitamins, and wellness supplements.
          </p>
        </div>
      </div>

      <div className="container max-w-6xl">
        {/* Mission Statement */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
          <div className="md:w-1/2">
            <h2 className="font-display font-bold text-4xl uppercase tracking-tighter mb-6">Our Mission</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground font-medium border-l-4 border-[var(--color-brand)] pl-6">
              <p className="mb-4">FitFuel was born out of a simple need: uncompromising quality and 100% authenticity in sports nutrition. We believe that what you put into your body directly correlates with what you get out of it.</p>
              <p>We source only the highest quality products directly from brands and official importers, ensuring you receive exactly what is on the label—nothing more, nothing less. Say goodbye to fake supplements.</p>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="aspect-square bg-muted border border-border flex items-center justify-center p-8">
               <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" alt="Gym" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-card border border-border p-8 md:p-16 text-center">
          <h2 className="font-display font-bold text-4xl uppercase tracking-tighter mb-12">Why Choose FitFuel?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-16 w-16 text-[var(--color-brand)] mb-6" />
              <h3 className="font-bold text-lg uppercase tracking-wider mb-2">100% Authentic</h3>
              <p className="text-sm text-muted-foreground">Sourced directly from brands and official importers with proof of authenticity.</p>
            </div>
            <div className="flex flex-col items-center">
              <Trophy className="h-16 w-16 text-[var(--color-brand)] mb-6" />
              <h3 className="font-bold text-lg uppercase tracking-wider mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">We curate only the highest-rated and clinically proven supplements.</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle2 className="h-16 w-16 text-[var(--color-brand)] mb-6" />
              <h3 className="font-bold text-lg uppercase tracking-wider mb-2">Expert Curation</h3>
              <p className="text-sm text-muted-foreground">Every product is vetted by our team of nutrition and fitness experts.</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-16 w-16 text-[var(--color-brand)] mb-6" />
              <h3 className="font-bold text-lg uppercase tracking-wider mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Express shipping across India with real-time tracking on all orders.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
