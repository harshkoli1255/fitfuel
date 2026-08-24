import Link from 'next/link'
import { ArrowRight, ShieldCheck, Truck, RotateCcw, HeadphonesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getFeaturedProducts } from '@/lib/data/products'
import { getCategories } from '@/lib/data/categories'
import { getBrands } from '@/lib/data/brands'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { ProductCarousel } from '@/components/home/product-carousel'
import { CategoryCarousel } from '@/components/home/category-carousel'
import { BrandCarousel } from '@/components/home/brand-carousel'
import { ShoppableVideo } from '@/components/home/shoppable-video'

export default function Home() {
  const featuredProducts = getFeaturedProducts()
  const categories = getCategories()
  const brands = getBrands()

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <HeroCarousel />

      {/* TRUST SECTION */}
      <section className="border-b border-border bg-card">
        <div className="container py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <ShieldCheck className="h-10 w-10 text-[var(--color-brand)]" />
              <h3 className="font-bold text-sm uppercase tracking-wider">100% Authentic</h3>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Truck className="h-10 w-10 text-[var(--color-brand)]" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Fast Delivery</h3>
            </div>
            <div className="flex flex-col items-center gap-3">
              <RotateCcw className="h-10 w-10 text-[var(--color-brand)]" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Easy Returns</h3>
            </div>
            <div className="flex flex-col items-center gap-3">
              <HeadphonesIcon className="h-10 w-10 text-[var(--color-brand)]" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Expert Support</h3>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tighter">Shop by Category</h2>
            <Link href="/shop" className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-muted-foreground hover:text-[var(--color-brand)] transition-colors pb-2 border-b-2 border-transparent hover:border-[var(--color-brand)]">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <CategoryCarousel categories={categories} />
          
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tighter">Bestsellers</h2>
            <Link href="/collections/best-sellers" className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-muted-foreground hover:text-[var(--color-brand)] transition-colors pb-2 border-b-2 border-transparent hover:border-[var(--color-brand)]">
              View Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <ProductCarousel products={featuredProducts} />
          
        </div>
      </section>

      {/* DEAL OF THE WEEK (Promotional Section) */}
      <section className="py-16 bg-[var(--color-brand)] text-black border-y-8 border-black overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply pointer-events-none" />
        <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-4">Deal of the Week</h2>
            <p className="text-xl font-bold uppercase tracking-widest mb-8 opacity-80">Up to 40% off premium isolates</p>
            <Button size="lg" className="rounded-none bg-black text-white hover:bg-white hover:text-black border-2 border-black font-bold text-lg px-8 py-6 uppercase tracking-wider">
              Claim Offer
            </Button>
          </div>
          <div className="flex gap-4 sm:gap-6 text-center">
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit, i) => (
              <div key={unit} className="flex flex-col items-center bg-white p-4 sm:p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-4 border-black w-20 sm:w-28">
                <span className="font-display font-black text-3xl sm:text-5xl leading-none">{[2, 14, 30, 45][i]}</span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-2">{unit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING BRANDS OR DEALS THAT DELIVER */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tighter">New Arrivals</h2>
            <Link href="/collections/new-arrivals" className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-muted-foreground hover:text-[var(--color-brand)] transition-colors pb-2 border-b-2 border-transparent hover:border-[var(--color-brand)]">
              View Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <ProductCarousel products={[...featuredProducts].reverse()} />
          
        </div>
      </section>

      {/* SHOPPABLE VIDEO REELS */}
      <section className="py-24 bg-foreground border-y-8 border-[var(--color-brand)] overflow-hidden">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tighter text-background">FitFuel TV</h2>
            <Link href="/shop" className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-muted hover:text-[var(--color-brand)] transition-colors pb-2 border-b-2 border-transparent hover:border-[var(--color-brand)]">
              View All Reels <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ShoppableVideo 
              videoSrc="https://www.w3schools.com/html/mov_bbb.mp4" 
              posterSrc="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
              product={featuredProducts[0]}
              title="Form Check"
              subtitle="Master the perfect deadlift form."
            />
            <ShoppableVideo 
              videoSrc="https://www.w3schools.com/html/mov_bbb.mp4" 
              posterSrc="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"
              product={featuredProducts[1]}
              title="Pre-Workout Routine"
              subtitle="How the pros get ready."
            />
            <ShoppableVideo 
              videoSrc="https://www.w3schools.com/html/mov_bbb.mp4" 
              posterSrc="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop"
              product={featuredProducts[2]}
              title="Post-Workout Recovery"
              subtitle="Optimize your gains."
            />
            <ShoppableVideo 
              videoSrc="https://www.w3schools.com/html/mov_bbb.mp4" 
              posterSrc="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop"
              product={featuredProducts[3]}
              title="Athlete Spotlight"
              subtitle="Day in the life of a champion."
            />
          </div>
        </div>
      </section>

      {/* POPULAR BRANDS */}
      <section className="py-20 bg-muted/30 border-y border-border overflow-hidden">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tighter">Popular Brands</h2>
            <Link href="/brands" className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-muted-foreground hover:text-[var(--color-brand)] transition-colors pb-2 border-b-2 border-transparent hover:border-[var(--color-brand)]">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <BrandCarousel brands={brands} />
        </div>
      </section>

      {/* FEATURED BLOGS */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tighter">FitFuel Knowledge</h2>
            <Link href="/blogs" className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-muted-foreground hover:text-[var(--color-brand)] transition-colors pb-2 border-b-2 border-transparent hover:border-[var(--color-brand)]">
              Read Blog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <Link href="/blogs/the-ultimate-guide" key={i} className="group cursor-pointer flex flex-col">
                <div className="aspect-video w-full bg-muted border-2 border-border mb-6 group-hover:border-[var(--color-brand)] transition-colors flex items-center justify-center overflow-hidden relative">
                  <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=600&q=80`} alt="Blog" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-50" />
                  <span className="absolute text-muted-foreground font-bold uppercase tracking-widest text-xs z-10 bg-background/80 px-3 py-1">Featured Article</span>
                </div>
                <p className="text-xs text-[var(--color-brand)] font-bold uppercase tracking-widest mb-3">Nutrition & Training</p>
                <h3 className="font-display font-bold text-2xl uppercase tracking-tighter mb-3 group-hover:text-[var(--color-brand)] transition-colors leading-tight line-clamp-2">The Ultimate Guide to Maximize Your Gains and Recovery</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-32 bg-foreground text-background border-t-8 border-[var(--color-brand)]">
        <div className="container max-w-4xl text-center">
          <h2 className="font-display font-bold text-5xl sm:text-7xl uppercase tracking-tighter mb-6">Join The Squad</h2>
          <p className="text-muted-foreground text-lg sm:text-xl mb-12 max-w-2xl mx-auto font-medium">Get exclusive access to new drops, fitness guides, and member-only discounts.</p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <input type="email" placeholder="YOUR EMAIL ADDRESS" className="flex-1 bg-background text-foreground px-8 py-5 font-bold uppercase tracking-wider border-none focus:outline-none focus:ring-4 focus:ring-[var(--color-brand)]" />
            <Button size="lg" className="shrink-0 py-5 px-10 rounded-none text-lg">Subscribe</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-8 uppercase tracking-widest font-bold">By joining, you agree to our Privacy Policy</p>
        </div>
      </section>
    </div>
  )
}
