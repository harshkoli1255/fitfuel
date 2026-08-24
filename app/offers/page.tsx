import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Offers & Coupons - FitFuel',
  description: 'Discover the latest discounts, promo codes, and special offers on premium supplements.',
};

const offers = [
  {
    title: 'Welcome Bonus',
    code: 'NEW10',
    description: 'Get Flat 10% OFF on your first order. Minimum cart value ₹1499.',
    validUntil: 'Dec 31, 2026',
    color: 'bg-green-500'
  },
  {
    title: 'Festive Mega Sale',
    code: 'FEST20',
    description: 'Get 20% OFF on all MuscleBlaze and Optimum Nutrition products.',
    validUntil: 'Oct 31, 2026',
    color: 'bg-orange-500'
  },
  {
    title: 'Free Shaker Offer',
    code: 'FREEGEAR',
    description: 'Get a premium 600ml shaker free with orders above ₹3000.',
    validUntil: 'Nov 15, 2026',
    color: 'bg-blue-500'
  }
];

export default function OffersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="border-b bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 uppercase">Latest Offers & Coupons</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Apply these verified promo codes at checkout to save big on your favorite sports nutrition brands.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {offers.map((offer, idx) => (
            <div key={idx} className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className={`${offer.color} p-6 text-white flex flex-col items-center justify-center text-center relative overflow-hidden`}>
                {/* Decorative circles */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full transform -translate-y-1/2"></div>
                
                <h2 className="text-xl font-bold mb-2 uppercase tracking-wide">{offer.title}</h2>
                <div className="bg-white/20 px-6 py-2 rounded-full border border-white/40 backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-colors">
                  <span className="font-mono text-2xl font-bold tracking-widest">{offer.code}</span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-700 mb-6 flex-grow">{offer.description}</p>
                
                <div className="flex items-center justify-between text-sm pt-4 border-t border-dashed">
                  <span className="text-gray-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Valid till {offer.validUntil}
                  </span>
                  <Link href="/shop" className="text-orange-500 font-bold hover:text-orange-600 transition-colors uppercase">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Terms & Conditions Apply</h3>
          <p className="text-sm text-gray-500">Offers are valid only for registered users on FitFuel.in. Only one coupon code can be applied per order. FitFuel reserves the right to modify or cancel offers at any time without prior notice.</p>
        </div>
      </div>
    </div>
  );
}
