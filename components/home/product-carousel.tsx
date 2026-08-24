"use client"
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/products/product-card'
import { Product } from '@/types'

interface ProductCarouselProps {
  products: Product[]
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 touch-pan-y py-4">
          {products.map(product => (
            <div key={product.id} className="pl-4 flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_30%] lg:flex-[0_0_25%] min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={scrollPrev} 
        disabled={!canScrollPrev}
        className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 h-12 w-12 bg-background border-2 border-border text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] disabled:opacity-0 shadow-xl"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={scrollNext} 
        disabled={!canScrollNext}
        className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 h-12 w-12 bg-background border-2 border-border text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] disabled:opacity-0 shadow-xl"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}
