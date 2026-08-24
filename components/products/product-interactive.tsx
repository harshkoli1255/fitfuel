"use client"
import { useState } from "react"
import { Heart, Minus, Plus, ShieldCheck, Truck } from "lucide-react"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect } from 'react'

export function ProductInteractive({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || null)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const [mainRef, mainApi] = useEmblaCarousel({ loop: true })
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })
  const [activeImage, setActiveImage] = useState(0)

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return
      mainApi.scrollTo(index)
    },
    [mainApi, thumbApi]
  )

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return
    setActiveImage(mainApi.selectedScrollSnap())
    thumbApi.scrollTo(mainApi.selectedScrollSnap())
  }, [mainApi, thumbApi, setActiveImage])

  useEffect(() => {
    if (!mainApi) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect()
    mainApi.on('select', onSelect)
    mainApi.on('reInit', onSelect)
  }, [mainApi, onSelect])

  const scrollPrev = useCallback(() => mainApi && mainApi.scrollPrev(), [mainApi])
  const scrollNext = useCallback(() => mainApi && mainApi.scrollNext(), [mainApi])

  const handleAddToCart = () => {
    if (!selectedVariant) return
    addItem({
      id: `${product.id}-${selectedVariant.flavor || 'default'}-${selectedVariant.size || 'default'}`,
      product,
      flavor: selectedVariant.flavor || '',
      size: selectedVariant.size || '',
      quantity,
      price: selectedVariant.price
    })
  }

  if (!selectedVariant) return null

  const images = product.media && product.media.length > 0 
    ? product.media 
    : [{ src: "/placeholder", alt: "Main Image" }]

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* GALLERY */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* Main Carousel */}
        <div className="relative group bg-white border border-border">
          <div className="overflow-hidden aspect-square" ref={mainRef}>
            <div className="flex h-full touch-pan-y">
              {images.map((mediaObj, i) => (
                <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full flex items-center justify-center p-8">
                  {mediaObj.src === "/placeholder" ? (
                    <span className="text-muted-foreground font-bold uppercase tracking-widest">Main Image</span>
                  ) : (
                    <img 
                      src={mediaObj.src} 
                      alt={mediaObj.alt || `${product.name} - Image ${i + 1}`} 
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.15] cursor-zoom-in" 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-background border-2 border-border text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-[var(--color-brand)] shadow-xl z-10">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-background border-2 border-border text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-[var(--color-brand)] shadow-xl z-10">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Thumbnails Carousel */}
        <div className="overflow-hidden" ref={thumbRef}>
          <div className="flex gap-4 touch-pan-y py-2">
            {images.map((mediaObj, i) => (
              <button 
                key={i} 
                onClick={() => onThumbClick(i)}
                className={`flex-[0_0_20%] sm:flex-[0_0_15%] aspect-square shrink-0 bg-white border-2 cursor-pointer transition-all p-2 ${activeImage === i ? 'border-[var(--color-brand)] opacity-100' : 'border-border hover:border-foreground opacity-60 hover:opacity-100'} flex items-center justify-center overflow-hidden`}
              >
                {mediaObj.src === "/placeholder" ? (
                  <span className="text-[10px] text-muted-foreground font-bold uppercase">Img {i+1}</span>
                ) : (
                  <img src={mediaObj.src} alt={mediaObj.alt || ""} className="w-full h-full object-contain mix-blend-multiply" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* INFO & ACTIONS */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="mb-6 border-b border-border pb-6">
          <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tighter mb-3 leading-none">{product.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            <span className="text-[var(--color-brand)]">Brand ID: {product.brandId}</span>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <div className="flex items-center gap-1 text-yellow-500">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
              <span className="text-muted-foreground ml-1">({product.reviewCount} Reviews)</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-end gap-4 mb-2">
            <span className="font-display font-bold text-5xl tracking-tighter">₹{selectedVariant.price}</span>
            {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
              <>
                <span className="text-xl text-muted-foreground line-through pb-1">₹{selectedVariant.compareAtPrice}</span>
                <span className="bg-[var(--color-brand)] text-white text-xs font-bold px-2 py-1 uppercase tracking-wider pb-2">
                  Save {Math.round(((selectedVariant.compareAtPrice - selectedVariant.price) / selectedVariant.compareAtPrice) * 100)}%
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Inclusive of all taxes</p>
        </div>

        {/* VARIANTS */}
        <div className="mb-8 space-y-6">
          {product.variants[0]?.flavor && (
            <div>
              <h3 className="font-bold text-xs uppercase tracking-widest mb-3">Flavor: <span className="text-muted-foreground">{selectedVariant.flavor}</span></h3>
              <div className="flex flex-wrap gap-3">
                {Array.from(new Set(product.variants.map(v => v.flavor))).map(flavor => {
                  const isActive = selectedVariant.flavor === flavor
                  return (
                    <button 
                      key={flavor}
                      onClick={() => {
                        const newVar = product.variants.find(v => v.flavor === flavor && v.size === selectedVariant.size) || product.variants.find(v => v.flavor === flavor)
                        if(newVar) setSelectedVariant(newVar)
                      }}
                      className={`border-2 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${isActive ? 'border-[var(--color-brand)] bg-[var(--color-brand)] text-white' : 'border-border hover:border-foreground'}`}
                    >
                      {flavor}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {product.variants[0]?.size && (
            <div>
              <h3 className="font-bold text-xs uppercase tracking-widest mb-3">Size: <span className="text-muted-foreground">{selectedVariant.size}</span></h3>
              <div className="flex flex-wrap gap-3">
                {Array.from(new Set(product.variants.map(v => v.size))).map(size => {
                  const isActive = selectedVariant.size === size
                  return (
                    <button 
                      key={size}
                      onClick={() => {
                        const newVar = product.variants.find(v => v.size === size && v.flavor === selectedVariant.flavor) || product.variants.find(v => v.size === size)
                        if(newVar) setSelectedVariant(newVar)
                      }}
                      className={`border-2 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${isActive ? 'border-[var(--color-brand)] bg-[var(--color-brand)] text-white' : 'border-border hover:border-foreground'}`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap sm:flex-nowrap gap-4 mb-4">
          <div className="flex items-center border-2 border-border shrink-0 w-full sm:w-auto justify-between sm:justify-start">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-4 hover:bg-muted transition-colors"><Minus className="h-4 w-4" /></button>
            <span className="w-12 text-center font-bold text-lg">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-4 hover:bg-muted transition-colors"><Plus className="h-4 w-4" /></button>
          </div>
          <Button size="lg" className="flex-1 rounded-none text-lg py-7 w-full" onClick={handleAddToCart}>Add to Cart</Button>
          <Button size="icon" variant="outline" className="h-auto w-16 shrink-0 rounded-none border-2 py-4 hidden sm:flex"><Heart className="h-6 w-6" /></Button>
        </div>
        
        <Button size="lg" variant="secondary" className="w-full rounded-none text-lg mb-8 bg-foreground text-background hover:bg-foreground/90 py-7">Buy It Now</Button>

        {/* TRUST SIGNALS */}
        <div className="grid grid-cols-2 gap-4 border-t border-border pt-8 mt-auto">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-[var(--color-brand)] shrink-0" />
            <p className="text-xs font-bold uppercase tracking-wider">100% Authentic<br/><span className="text-muted-foreground">Guaranteed</span></p>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="h-8 w-8 text-[var(--color-brand)] shrink-0" />
            <p className="text-xs font-bold uppercase tracking-wider">Free Shipping<br/><span className="text-muted-foreground">Over ₹499</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
