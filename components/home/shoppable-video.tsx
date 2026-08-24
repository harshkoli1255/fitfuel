"use client"
import React, { useState, useRef } from 'react'
import { Play, Pause, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/types'
import { getPrimaryProductImage } from '@/lib/utils/product-media'

interface ShoppableVideoProps {
  videoSrc: string
  posterSrc: string
  product: Product
  title: string
  subtitle: string
}

export function ShoppableVideo({ videoSrc, posterSrc, product, title, subtitle }: ShoppableVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        const playPromise = videoRef.current.play()
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true)
          }).catch(error => {
            console.error("Video playback failed:", error)
            setIsPlaying(false)
          })
        } else {
          setIsPlaying(true)
        }
      }
    }
  }

  return (
    <div className="relative group w-full aspect-[9/16] sm:aspect-[4/5] bg-muted border border-border overflow-hidden rounded-xl">
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loop
        muted
        playsInline
      />
      
      {/* Play/Pause Overlay Button */}
      <button 
        onClick={togglePlay}
        className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors z-10"
      >
        <div className={`h-16 w-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transition-transform ${isPlaying ? 'scale-75 opacity-0 group-hover:opacity-100' : 'scale-100 opacity-100'}`}>
          {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current ml-1" />}
        </div>
      </button>

      {/* Shoppable Product Card Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-display font-bold text-xl sm:text-2xl uppercase tracking-tighter mb-1">{title}</h3>
        <p className="text-white/80 text-xs sm:text-sm font-medium mb-4">{subtitle}</p>
        
        <Link href={`/products/${product.slug}`} className="flex items-center gap-4 bg-white p-3 rounded-lg hover:bg-[var(--color-brand)] hover:text-white transition-colors group/card">
          <div className="h-12 w-12 bg-muted rounded overflow-hidden shrink-0">
            {product ? (
              <img src={getPrimaryProductImage(product)} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm uppercase tracking-wide truncate">{product.name}</p>
            <p className="font-bold text-[var(--color-brand)] group-hover/card:text-white transition-colors">₹{product.variants[0]?.price}</p>
          </div>
          <div className="h-8 w-8 shrink-0 bg-black text-white group-hover/card:bg-white group-hover/card:text-black flex items-center justify-center rounded transition-colors">
            <ExternalLink className="h-4 w-4" />
          </div>
        </Link>
      </div>
    </div>
  )
}
