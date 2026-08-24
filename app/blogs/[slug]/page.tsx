import { Metadata } from 'next';
import Link from 'next/link';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return {
    title: `${params.slug.replace(/-/g, ' ').toUpperCase()} - FitFuel Blog`,
    description: 'Read the latest health and fitness articles, supplement guides, and training tips.',
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const title = params.slug.replace(/-/g, ' ').toUpperCase();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-orange-500">News</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium capitalize">{params.slug.replace(/-/g, ' ')}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              August 24, 2026
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              FitFuel Team
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
        
        {/* Article Content */}
        <article className="md:w-2/3 lg:w-3/4 bg-white p-8 rounded-2xl shadow-sm border">
          <div className="aspect-[21/9] bg-gray-100 rounded-xl overflow-hidden mb-8">
             <img 
                src="https://cdn.shopify.com/s/files/1/0876/6105/2198/files/Performance_Stack_Front.png" 
                alt={title} 
                className="w-full h-full object-contain bg-white" 
              />
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="lead text-xl text-gray-900 font-medium mb-6">
              When it comes to achieving your health and fitness goals, consistency is key. However, combining the right nutrition with a targeted supplement stack can dramatically enhance your results. In this article, we delve deep into the science of performance and recovery.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Importance of Baseline Metrics</h2>
            <p className="mb-4">
              Before introducing any new supplement into your regimen, establishing a metabolic and physical baseline is crucial. This allows you to track progress accurately and determine which elements of your diet and training are driving the most significant adaptations.
            </p>
            <p className="mb-6">
              Many athletes jump straight into complex stacks without optimizing their macronutrients. Ensure your protein intake is adequate (typically 1.6-2.2g per kg of body weight) and that your hydration levels remain consistent throughout the day.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Optimizing Your Supplement Protocol</h2>
            <p className="mb-4">
              A well-structured supplement protocol shouldn't replace a solid diet, but rather fill the gaps and provide targeted support where whole foods fall short. Key pillars include:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Pre-Workout:</strong> Focus on compounds that enhance blood flow and mental clarity.</li>
              <li><strong>Intra-Workout:</strong> Amino acids (BCAAs or EAAs) to support endurance and prevent muscle breakdown.</li>
              <li><strong>Post-Workout:</strong> Rapid-absorbing protein and carbohydrates to replenish glycogen stores.</li>
            </ul>

            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 my-8">
              <h3 className="text-lg font-bold text-orange-900 mb-2">Pro Tip</h3>
              <p className="text-orange-800 m-0">Always consult with a healthcare professional before starting any new supplement regimen, especially if you have underlying health conditions.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
            <p className="mb-4">
              Maximizing your gains requires a holistic approach. By combining intense, progressive training with optimal nutrition and a carefully curated supplement stack, you can push past plateaus and achieve your ultimate physique. Stay consistent, track your progress, and trust the process.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t flex flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer">Fitness</span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer">Nutrition</span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer">Supplements</span>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="md:w-1/3 lg:w-1/4 space-y-8">
          
          {/* Recent Posts */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold text-lg text-gray-900 mb-4 border-b pb-2">Recent Posts</h3>
            <div className="space-y-4">
              <Link href="/blogs/understanding-creatine" className="block group">
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2 mb-1">Understanding Creatine: Myths and Facts</h4>
                <p className="text-xs text-gray-500">August 18, 2026</p>
              </Link>
              <Link href="/blogs/whey-vs-isolate" className="block group">
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2 mb-1">Whey Protein vs. Isolate: Which is Right for You?</h4>
                <p className="text-xs text-gray-500">August 12, 2026</p>
              </Link>
            </div>
          </div>

          {/* Featured Product Ad */}
          <div className="bg-gray-900 p-6 rounded-2xl text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2 text-orange-400">Premium Stack</h3>
              <p className="text-sm text-gray-300 mb-6">Upgrade your nutrition with our best-selling stack.</p>
              <Link href="/shop" className="bg-white text-gray-900 font-bold px-6 py-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors inline-block">
                Shop Now
              </Link>
            </div>
            <div className="absolute inset-0 opacity-20">
               <img 
                  src="https://cdn.shopify.com/s/files/1/0876/6105/2198/files/Performance_Stack_Front.png" 
                  alt="Premium Stack" 
                  className="w-full h-full object-cover blur-sm" 
                />
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}
