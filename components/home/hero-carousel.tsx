"use client"
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: "Fuel Your Ambition.",
    subtitle: "Premium sports nutrition, supplements and wellness essentials delivered to your door.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    cta1: { text: "Shop Now", link: "/shop" },
    cta2: { text: "Explore Categories", link: "/categories/sports-nutrition" }
  },
  {
    id: 2,
    title: "Power Your Performance.",
    subtitle: "High-quality whey protein and pre-workouts formulated for maximum gains.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop",
    cta1: { text: "View Proteins", link: "/categories/proteins" },
    cta2: { text: "Shop Pre-Workout", link: "/categories/pre-workout" }
  },
  {
    id: 3,
    title: "Recover & Rebuild.",
    subtitle: "Essential BCAAs, glutamine, and recovery formulas for serious athletes.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
    cta1: { text: "Shop Recovery", link: "/categories/recovery" },
    cta2: { text: "Explore All", link: "/shop" }
  }
]

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative w-full h-[80vh] min-h-[600px] overflow-hidden border-b-[12px] border-[var(--color-brand)] bg-foreground" ref={emblaRef}>
      <div className="flex h-full touch-pan-y">
        {slides.map((slide, index) => (
          <div className="relative flex-[0_0_100%] min-w-0 h-full" key={slide.id}>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 z-10" />
            
            <div className="container relative z-20 h-full flex items-center">
              <div className={`max-w-2xl transform transition-all duration-700 ease-out ${index === selectedIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h1 className="font-display font-bold text-6xl md:text-8xl uppercase tracking-tighter leading-[0.9] mb-6 text-white drop-shadow-lg">
                  {slide.title.split('.').map((part, i, arr) => 
                    i === arr.length - 2 ? <span key={i} className="text-[var(--color-brand)]">{part}.</span> : <React.Fragment key={i}>{part}</React.Fragment>
                  )}
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-md mb-10 font-medium">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="w-full sm:w-auto text-base rounded-none" asChild>
                    <Link href={slide.cta1.link}>{slide.cta1.text}</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base rounded-none text-white border-white hover:bg-white hover:text-black" asChild>
                    <Link href={slide.cta2.link}>{slide.cta2.text}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute z-30 bottom-8 right-8 flex gap-2">
        <button onClick={scrollPrev} className="h-12 w-12 bg-white/10 hover:bg-[var(--color-brand)] border border-white/20 text-white flex items-center justify-center transition-colors backdrop-blur">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={scrollNext} className="h-12 w-12 bg-white/10 hover:bg-[var(--color-brand)] border border-white/20 text-white flex items-center justify-center transition-colors backdrop-blur">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute z-30 bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 transition-all ${index === selectedIndex ? 'w-8 bg-[var(--color-brand)]' : 'w-2 bg-white/50 hover:bg-white'} rounded-full`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
