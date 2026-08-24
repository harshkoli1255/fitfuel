"use client"
import Link from 'next/link'
import { User, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MegaMenu } from './mega-menu'
import { MobileNav } from './mobile-nav'
import { HeaderCart } from './header-cart'
import { HeaderSearch, MobileSearch } from './header-search'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = pathname === '/'

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out ${
        isScrolled || !isHome
          ? 'bg-background border-b border-border shadow-sm py-2 sm:py-0' 
          : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-transparent py-2'
      }`}
    >
      <div className={`container flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-16 sm:h-20'}`}>
        
        {/* Mobile Menu Trigger & Logo */}
        <div className="flex items-center gap-4 lg:hidden">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display font-bold text-2xl tracking-tighter text-foreground uppercase">Fit<span className="text-[var(--color-brand)]">Fuel</span></span>
          </Link>
        </div>

        {/* Desktop Logo & Nav */}
        <div className="hidden lg:flex items-center h-full">
          <Link href="/" className="flex items-center gap-2 mr-8">
            <span className="font-display font-bold text-3xl tracking-tighter text-foreground uppercase">Fit<span className="text-[var(--color-brand)]">Fuel</span></span>
          </Link>
          <MegaMenu />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 h-full">
          <HeaderSearch />
          <MobileSearch />
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-foreground h-10 w-10" asChild aria-label="Account">
            <Link href="/account"><User className="h-5 w-5" /></Link>
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground h-10 w-10" asChild aria-label="Wishlist">
            <Link href="/account/wishlist"><Heart className="h-5 w-5" /></Link>
          </Button>
          <HeaderCart />
        </div>
      </div>
    </header>
  )
}
