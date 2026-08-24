# FitFuel Current Bug Inventory

| Bug | Route | Reproduction Steps | Root Cause | Files Involved | Fix Status |
|---|---|---|---|---|---|
| Search Bar Overflow | `*` (Header) | Open site on mobile (< 768px). Click search bar. | Hardcoded `style={{ width: '600px' }}` on search dropdown. | `components/layout/header-search.tsx` | Pending |
| Broken Favorite Button | `*` (Product Cards, PDP) | Click heart icon on any product. | No global state management for wishlist. The buttons are likely static UI. | `components/products/product-card.tsx`, `app/products/[slug]/page.tsx`, `components/layout/header.tsx` | Pending |
| Brands Page Poor Organization | `/brands` | Visit `/brands` and observe the layout. | Rendered as a simple grid. Missing A-Z grouping, alphabetical navigation, and "Featured" section. | `app/brands/page.tsx` | Pending |
| Missing Brand Logos | `/brands`, `/` | Visit `/brands` and homepage "Popular Brands". | `Brand` model has `logo` but UI renders a placeholder `<span>Logo</span>` or empty div. | `app/brands/page.tsx`, `components/home/brand-carousel.tsx` | Pending |
| Brand Click -> No Products | `/brands/[slug]` | Click a brand like "MuscleBlaze" on homepage/brand page. | Filter logic mismatch between URL slug, `getProductsByBrand(brand.id)`, and product dataset. (Partially addressed, needs regression verification). | `app/brands/[slug]/page.tsx`, `lib/data/brands.ts` | Pending Validation |
| Search Media Crashes | `/search`, Header | Open search overlay or view search results. | Search passed raw `ProductMedia` objects to Next `Image` component `src` instead of resolving the primary image URL string. | `components/layout/header-search.tsx`, `app/search/page.tsx`, `lib/utils/product-media.ts` | Fixed (needs regression check) |
| Missing Search Product Images | `/search`, Header | Type query, view suggestions. | `header-search.tsx` previously failed to resolve product media for suggestions correctly. | `components/layout/header-search.tsx` | Pending Validation |
| Mobile Hamburger Menu | `*` (Mobile Header) | Open menu on 320px screen. | Z-index/overflow issues and body scroll not locking. | `components/layout/header.tsx`, `components/layout/mobile-nav.tsx` | Pending |
| Product Overview Parsing | `/products/[slug]` | View the description text. | Raw string contains `***SPLIT***` delimiters meant for separating description paragraphs, brand info, ingredients, and directions. | `app/products/[slug]/page.tsx` | Pending |
