"use client"
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Brand } from '@/types'
import Image from 'next/image'

interface BrandCarouselProps {
  brands: Brand[]
}

export function BrandCarousel({ brands }: BrandCarouselProps) {
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
          {brands.map(brand => (
            <div key={brand.id} className="pl-4 flex-[0_0_40%] sm:flex-[0_0_25%] md:flex-[0_0_20%] lg:flex-[0_0_16.666%] min-w-0">
              <Link href={`/brands/${brand.slug}`} className="group/brand flex flex-col gap-3 items-center">
                <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center border border-border group-hover/brand:border-[var(--color-brand)] group-hover/brand:shadow-lg transition-all overflow-hidden relative p-3">
                  {brand.logo ? (
                    <Image
                      unoptimized
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain p-4 group-hover/brand:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 40vw, 16vw"
                    />
                  ) : (
                    <span className="text-xs font-bold text-muted-foreground text-center px-2">{brand.name}</span>
                  )}
                </div>
                <p className="text-xs font-bold text-center group-hover/brand:text-[var(--color-brand)] transition-colors">{brand.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={scrollPrev} 
        disabled={!canScrollPrev}
        className="absolute top-[45%] -translate-y-1/2 -left-4 h-10 w-10 sm:h-12 sm:w-12 bg-background border-2 border-border text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] disabled:opacity-0 shadow-xl"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button 
        onClick={scrollNext} 
        disabled={!canScrollNext}
        className="absolute top-[45%] -translate-y-1/2 -right-4 h-10 w-10 sm:h-12 sm:w-12 bg-background border-2 border-border text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] disabled:opacity-0 shadow-xl"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
