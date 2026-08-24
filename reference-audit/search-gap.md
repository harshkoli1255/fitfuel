# Search Gap Analysis — FitFuel vs Nutristar

## Current FitFuel State
- Search dropdown has hardcoded `style={{ width: '600px' }}` causing overflow on smaller viewports (just fixed to responsive width)
- Dropdown appears to be positioned correctly on desktop but OVERFLOWS on mobile
- Product images in search: using `getPrimaryProductImage()` correctly
- Popular choices tags: working
- No loading state shown during query typing
- No keyboard navigation (Tab/ArrowDown/ArrowUp/Enter)
- No ESC key to close
- Results only filter by `p.name.toLowerCase().includes(query.toLowerCase())` — no brand or category suggestions
- No "View all results" keyboard-accessible flow

## Nutristar Reference Behaviors
- Search opens as a wide overlay panel constrained to the viewport width
- Shows trending/popular searches when no query
- Shows product images, name, brand, and price in suggestions
- Dropdown is max-width constrained and never overflows
- Keyboard accessible: arrow keys, enter, escape
- Has a clear loading indicator when fetching

## Gaps to Fix
1. **CRITICAL**: Search dropdown overflows viewport on mobile — fixed width removed, replaced with `w-[min(600px,calc(100vw-2rem))]`
2. Add ESC key to close search dropdown
3. Add ArrowUp/ArrowDown keyboard navigation through results
4. Add brand and category to search suggestions
5. The search container on header is `hidden lg:block` — no search on mobile except in hamburger. Add a mobile search trigger.
