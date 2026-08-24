import { Metadata } from 'next';
import { getProducts } from '@/lib/data/products';
import { getCategories } from '@/lib/data/categories';
import { getBrands } from '@/lib/data/brands';
import { ProductCard } from '@/components/products/product-card';
import { SortSelect } from '@/components/shop/shop-filters';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Search - FitFuel',
  description: 'Search for premium sports nutrition products.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q: query = '', sort = 'recommended' } = await searchParams;
  const products = getProducts();
  const categories = getCategories();
  const brands = getBrands();
  
  const searchResults = query
    ? products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.brandId.toLowerCase().includes(query.toLowerCase()) ||
        p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  // Apply sort
  const sorted = [...searchResults];
  if (sort === 'price-asc') sorted.sort((a, b) => (Number(a.variants[0]?.price) || 0) - (Number(b.variants[0]?.price) || 0));
  if (sort === 'price-desc') sorted.sort((a, b) => (Number(b.variants[0]?.price) || 0) - (Number(a.variants[0]?.price) || 0));
  if (sort === 'best-selling') sorted.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
  if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);

  // Category matches
  const categoryMatches = query 
    ? categories.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
    : [];
  
  // Brand matches
  const brandMatches = query
    ? brands.filter(b => b.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-card border-b border-border py-8">
        <div className="container text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-6 uppercase tracking-tighter">
            {query ? `Results for "${query}"` : 'Search Products'}
          </h1>
          
          <form className="max-w-2xl mx-auto relative" action="/search" method="GET">
            <input 
              type="text" 
              name="q"
              defaultValue={query}
              placeholder="Search for Vitamins, Whey Protein, Creatine..." 
              className="w-full px-6 py-4 border-2 border-border bg-background rounded-none font-bold focus:border-[var(--color-brand)] focus:ring-0 outline-none text-base transition-colors"
            />
            <button type="submit" className="absolute right-0 top-0 bottom-0 px-6 bg-foreground text-background hover:bg-[var(--color-brand)] transition-colors font-bold uppercase tracking-widest text-sm">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="container py-12 flex-grow">
        {query ? (
          <div>
            {/* Category & Brand quick links */}
            {(categoryMatches.length > 0 || brandMatches.length > 0) && (
              <div className="mb-8 flex flex-wrap gap-3">
                {categoryMatches.map(c => (
                  <Link key={c.id} href={`/categories/${c.slug}`} className="px-4 py-2 border border-border font-bold text-sm uppercase tracking-widest hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors">
                    📂 {c.name}
                  </Link>
                ))}
                {brandMatches.map(b => (
                  <Link key={b.id} href={`/brands/${b.slug}`} className="px-4 py-2 border border-border font-bold text-sm uppercase tracking-widest hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors">
                    🏷️ {b.name}
                  </Link>
                ))}
              </div>
            )}

            <div className="mb-8 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing <span className="font-bold text-foreground">{sorted.length}</span> results for <span className="font-bold text-foreground">"{query}"</span>
              </p>
              
              {sorted.length > 0 && (
                <Suspense fallback={<div />}>
                  <SortSelect currentSort={sort} />
                </Suspense>
              )}
            </div>

            {sorted.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {sorted.slice(0, 48).map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 border border-dashed border-border">
                <h2 className="text-2xl font-display font-bold text-foreground mb-2 uppercase tracking-tighter">No results found</h2>
                <p className="text-muted-foreground mb-8">We couldn&apos;t find any products matching your search.</p>
                <Link href="/shop" className="bg-foreground text-background font-bold px-8 py-4 uppercase tracking-widest text-sm hover:bg-[var(--color-brand)] transition-colors">
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24">
            <h2 className="text-xl font-bold text-muted-foreground uppercase tracking-widest">Enter a search term to begin</h2>
          </div>
        )}
      </div>
    </div>
  );
}
