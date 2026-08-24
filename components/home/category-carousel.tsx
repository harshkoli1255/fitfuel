"use client"
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Category } from '@/types'

interface CategoryCarouselProps {
  categories: Category[]
}

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
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
          {categories.map(category => (
            <div key={category.id} className="pl-4 flex-[0_0_40%] sm:flex-[0_0_25%] md:flex-[0_0_20%] lg:flex-[0_0_16.666%] min-w-0">
              <Link href={`/categories/${category.slug}`} className="group/cat flex flex-col gap-4 items-center">
                <div className="aspect-square w-full bg-card rounded-full flex items-center justify-center border-2 border-border group-hover/cat:border-[var(--color-brand)] group-hover/cat:shadow-lg transition-all overflow-hidden relative">
                  {category.image ? (
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover/cat:scale-110 transition-transform duration-500" />
                  ) : (
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Image</span>
                  )}
                </div>
                <h3 className="text-center font-bold text-xs sm:text-sm uppercase tracking-wide group-hover/cat:text-[var(--color-brand)] transition-colors line-clamp-2 px-2">{category.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={scrollPrev} 
        disabled={!canScrollPrev}
        className="absolute top-[40%] -translate-y-1/2 -left-4 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background border-2 border-border text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] disabled:opacity-0 shadow-xl"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button 
        onClick={scrollNext} 
        disabled={!canScrollNext}
        className="absolute top-[40%] -translate-y-1/2 -right-4 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background border-2 border-border text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] disabled:opacity-0 shadow-xl"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
