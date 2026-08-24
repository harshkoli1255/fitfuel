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
import { DealBanner } from '@/components/home/deal-banner'

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
      <DealBanner />

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
              videoSrc="https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4" 
              posterSrc="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
              product={featuredProducts[0]}
              title="Form Check"
              subtitle="Master the perfect deadlift form."
            />
            <ShoppableVideo 
              videoSrc="https://videos.pexels.com/video-files/4754030/4754030-hd_1080_1920_30fps.mp4" 
              posterSrc="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"
              product={featuredProducts[1]}
              title="Pre-Workout Routine"
              subtitle="How the pros get ready."
            />
            <ShoppableVideo 
              videoSrc="https://videos.pexels.com/video-files/6843232/6843232-hd_1080_1920_25fps.mp4" 
              posterSrc="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop"
              product={featuredProducts[2]}
              title="Post-Workout Recovery"
              subtitle="Optimize your gains."
            />
            <ShoppableVideo 
              videoSrc="https://videos.pexels.com/video-files/3196163/3196163-hd_1920_1080_25fps.mp4" 
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
            {[
              {
                id: 1,
                slug: 'maximize-gains-recovery',
                title: 'The Ultimate Guide to Maximize Your Gains and Recovery',
                category: 'Nutrition & Training',
                image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80'
              },
              {
                id: 2,
                slug: 'creatine-myths-busted',
                title: '5 Creatine Myths Busted: What Science Actually Says',
                category: 'Supplements Science',
                image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80'
              },
              {
                id: 3,
                slug: 'perfect-preworkout',
                title: 'How to Choose the Perfect Pre-Workout for Your Goals',
                category: 'Buyer\'s Guide',
                image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80'
              }
            ].map(blog => (
              <Link href={`/blogs/${blog.slug}`} key={blog.id} className="group cursor-pointer flex flex-col">
                <div className="aspect-video w-full bg-muted border border-border mb-6 group-hover:border-[var(--color-brand)] transition-colors flex items-center justify-center overflow-hidden relative rounded-xl">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 font-bold uppercase tracking-widest text-[10px] z-10 bg-background/95 px-3 py-1 rounded">Featured</span>
                </div>
                <p className="text-xs text-[var(--color-brand)] font-bold uppercase tracking-widest mb-3">{blog.category}</p>
                <h3 className="font-display font-bold text-xl uppercase tracking-tighter mb-3 group-hover:text-[var(--color-brand)] transition-colors leading-tight line-clamp-2">{blog.title}</h3>
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
