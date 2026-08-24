# Homepage Gap Analysis — FitFuel vs Nutristar

## Current Structure (FitFuel)
1. HeroCarousel (3 slides, auto-play, good)
2. Trust section (4 icons)
3. Shop by Category (CategoryCarousel — good, images working from nutristar CDN)
4. Bestsellers (ProductCarousel — good)
5. DealBanner component
6. New Arrivals (ProductCarousel — good)
7. FitFuel TV (4 shoppable videos)
8. Popular Brands (BrandCarousel) — **brand logos showing as placeholder images**
9. FitFuel Knowledge (3 blog cards — placeholder images and broken hrefs all `/blogs/the-ultimate-guide`)
10. Newsletter section

## Critical Gaps
1. **Brand carousel logos**: brand-carousel.tsx checks `brand.logo` but ui-avatars.com logos render as a URL, not an image source that displays well in the current circular container. The `<img>` tag is there but `mix-blend-multiply` is causing it to be invisible on white backgrounds.
2. **Blog cards**: All three link to the same slug and use `photo-${1500000000000 + i * 100000}` which generates broken Unsplash URLs
3. **BrandCarousel**: Does NOT show brand name below the logo — it's rendered with just the image inside the card, no label
4. **Mobile hero**: Hero is 80vh with large text — on 320px the buttons may stack and overflow

## Nutristar Reference Structure
- Hero: large slides with gradient overlay + product imagery + CTAs
- Shop by Category: icon + name, horizontal scroll on mobile
- Bestsellers: product card carousel, swipeable
- Deal of the Day: countdown timer + product with big discount price
- Shop by Goal/Benefit: separate section for "Weight Loss", "Muscle Gain" etc
- Brands: logo + name shown prominently, white background cards
- Blog/Knowledge: real article thumbnails and links
