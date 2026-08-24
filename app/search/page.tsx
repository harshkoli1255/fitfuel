import { Metadata } from 'next';
import { getProducts } from '@/lib/data/products';
import { ProductCard } from '@/components/products/product-card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Search - FitFuel',
  description: 'Search for premium sports nutrition products.',
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';
  const products = getProducts();
  
  // Basic search implementation for demonstration
  const searchResults = query
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.brandId.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white border-b py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Search Results</h1>
          
          <form className="max-w-2xl mx-auto relative" action="/search" method="GET">
            <input 
              type="text" 
              name="q"
              defaultValue={query}
              placeholder="Search for Vitamins, Whey Protein, Creatine..." 
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-full focus:border-orange-500 focus:ring-0 outline-none text-lg transition-colors"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full hover:bg-orange-500 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-grow">
        {query ? (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-gray-600">Showing {searchResults.length} results for <span className="font-bold text-gray-900">"{query}"</span></p>
              
              {searchResults.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="border-gray-300 rounded text-sm py-1 pl-2 pr-6 outline-none">
                    <option>Relevance</option>
                    <option>Price, low to high</option>
                    <option>Price, high to low</option>
                    <option>Best Selling</option>
                  </select>
                </div>
              )}
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {searchResults.slice(0, 48).map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-xl border border-dashed">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
                <p className="text-gray-500 mb-6">We couldn't find any products matching your search.</p>
                <Link href="/shop" className="bg-orange-500 text-white font-bold px-8 py-3 rounded-full hover:bg-gray-900 transition-colors uppercase tracking-wider text-sm">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24">
            <h2 className="text-xl font-bold text-gray-400">Enter a search term to begin</h2>
          </div>
        )}
      </div>
    </div>
  );
}
