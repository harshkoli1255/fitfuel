import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Health and Fitness Blog - FitFuel",
  description: "Read the latest health and fitness articles, supplement guides, and training tips.",
}

const blogs = [
  {
    title: "The Ultimate Guide to Maximize Your Gains",
    slug: "the-ultimate-guide-to-maximize-your-gains",
    excerpt: "Discover the scientific principles behind muscle hypertrophy and optimal recovery protocols used by professional athletes.",
    category: "Nutrition & Training",
    date: "August 24, 2026",
    image: "https://cdn.shopify.com/s/files/1/0876/6105/2198/files/ai_6a58bf01becc4_Heritage_90_png_652623e3-f85c-48f3-a73a-729caac60e00.jpg",
  },
  {
    title: "Understanding Creatine: Myths and Facts",
    slug: "understanding-creatine",
    excerpt: "Creatine is one of the most researched supplements in the world. We break down the science, the dosage, and the results.",
    category: "Supplements",
    date: "August 18, 2026",
    image: "https://cdn.shopify.com/s/files/1/0876/6105/2198/files/Performance_Stack_Front.png",
  },
  {
    title: "Whey Protein vs. Isolate: Which is Right for You?",
    slug: "whey-vs-isolate",
    excerpt: "Confused about which protein powder to buy? Learn the differences in macronutrients, absorption rates, and best use cases.",
    category: "Nutrition",
    date: "August 12, 2026",
    image: "https://cdn.shopify.com/s/files/1/0876/6105/2198/files/Performance_Stack_Side.png",
  }
]

export default function BlogsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="border-b bg-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">Health and Fitness Blog</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <Link href={`/blogs/${blog.slug}`} key={i} className="group cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border">
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 bg-white" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-orange-500 font-bold uppercase tracking-wider bg-orange-50 px-2 py-1 rounded">{blog.category}</span>
                  <span className="text-xs text-gray-500 font-medium">{blog.date}</span>
                </div>
                <h2 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-orange-500 transition-colors leading-tight line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="mt-auto pt-4">
                  <span className="text-sm font-bold text-gray-900 group-hover:text-orange-500 flex items-center gap-1">
                    Read Article 
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
