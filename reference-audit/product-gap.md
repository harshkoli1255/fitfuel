# Product Page Gap Analysis — FitFuel vs Nutristar

## Critical Issues
1. **brandId shown raw**: PDP shows `Brand ID: bfs` instead of the actual brand name
2. **Description contains `***SPLIT***`**: The raw description field from JSON has `***SPLIT***` as a delimiter for different text sections. This raw delimiter is being rendered as prose text in the product overview section
3. **No wishlist on PDP**: The heart icon on desktop is static/not connected to wishlist state
4. **Product name is all-caps uppercase in CSS**: The font style makes even normal-case product names look shouted on small screens
5. **No breadcrumb navigation**: Nutristar has Home > Category > Brand > Product breadcrumbs

## Description Parsing Issue
The `generated-products.json` encodes 5 segments per product separated by `***SPLIT***`:
1. Product description (main)
2. Brand story / about brand
3. Ingredients
4. Directions for use
5. Manufacturer

Current code just does `dangerouslySetInnerHTML={{ __html: product.description }}` on the raw string.

## PDP Improvements Needed
- Show actual brand name (lookup from brandId)
- Parse `***SPLIT***` into correct sections
- Connect wishlist heart button to useWishlist()
- Add breadcrumb navigation
- Show brand section below product overview using parsed brand info
- Show proper ingredients from parsed data (not placeholder text)
- Show directions from parsed data (not placeholder text)
