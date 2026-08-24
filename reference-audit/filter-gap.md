# Filter Gap Analysis — FitFuel vs Nutristar

## Current State
- Desktop filter sidebar exists with: Category, Brand, Price Range (checkbox), Availability, Rating, Offers
- **MobileToggle** renders a button that does nothing — no mobile filter drawer exists
- Price filter uses checkbox-based labels (under-1000, 1000-3000, over-3000) not a numeric range
- Filters update URL params correctly — this is working
- Sorting is working via URL params
- Filter sidebar is hidden on mobile (`hidden md:block`) with no replacement

## Critical Gaps
1. **Mobile filter drawer is MISSING**: The MobileToggle button renders with no state logic or drawer component
2. **Price filter**: Checkbox buckets are coarse. Should have numeric input fields (minPrice, maxPrice) 
3. **Filter count badge**: The mobile toggle button should show count of active filters
4. **No "Clear All" on mobile**: Mobile users can't clear filters without editing the URL manually
5. **No active filter display**: Desktop sidebar has "Clear All" but no indication of which filters are active inline

## Nutristar Reference
- Filter sidebar with smooth accordion expand/collapse per section
- Mobile: bottom sheet that slides up from bottom, locks scroll, shows applied count on trigger
- Price filter has both range presets AND custom min/max inputs
- Brand filter shows product counts in parentheses: `GNC (47)`
- Active filters shown as removable chips above the product grid
