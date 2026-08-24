import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authenticity - FitFuel',
  description: 'Certified authenticity in every product. Sourced exclusively through brand & authorized importers only.',
};

const topBrands = [
  { name: '1UP Nutrition', logo: '/placeholder.jpg' },
  { name: 'Optimum Nutrition', logo: '/placeholder.jpg' },
  { name: 'BPI Sports', logo: '/placeholder.jpg' },
  { name: 'Muscletech', logo: '/placeholder.jpg' },
];

const partnerImporters = [
  { name: 'Parag', logo: '/placeholder.jpg' },
  { name: 'MPN', logo: '/placeholder.jpg' },
  { name: 'Arena', logo: '/placeholder.jpg' },
  { name: 'UniGlobal', logo: '/placeholder.jpg' },
];

export default function AuthenticityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="border-b bg-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">Authenticity</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-20">
        
        {/* Certified Authenticity Section */}
        <section className="bg-orange-50 rounded-2xl p-8 flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase">Certified Authenticity In Every Product</h2>
            <p className="text-gray-700">Sourced Exclusively Through Brand & Authorized Importers Only!</p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl text-center shadow-sm flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-500">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Guaranteed</h3>
              <p className="text-sm text-gray-600">Brand-certified and verified by importers.</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-sm flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-500">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">No Middleman</h3>
              <p className="text-sm text-gray-600">Fast, direct shipping right to your address.</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-sm flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-500">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Retail Invoice</h3>
              <p className="text-sm text-gray-600">Tax-paid retail invoice with every order.</p>
            </div>
          </div>
        </section>

        {/* Top International Brands */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 uppercase text-center md:text-left">We Collaborate With Top International Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topBrands.map((brand, idx) => (
              <div key={idx} className="bg-white border rounded-xl h-32 flex items-center justify-center p-6 hover:shadow-md transition-shadow">
                <span className="font-bold text-gray-400">{brand.name} Logo</span>
              </div>
            ))}
          </div>
        </section>

        {/* Influencer Videos (Mocked as image cards for now) */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-[9/16] bg-gray-900 rounded-xl overflow-hidden relative group cursor-pointer">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <p className="text-white text-sm font-bold uppercase line-clamp-2">Influencer Story {i}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Supply Chain */}
        <section className="bg-pink-50 rounded-2xl p-8 flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2 space-y-8">
            <div className="flex gap-4">
              <div className="mt-1 text-orange-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assurance in Distribution</h3>
                <p className="text-gray-700">FitFuel collaborates closely with leading sports nutrition brands and enforces rigorous quality control throughout the distribution process.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 text-orange-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">We Guarantee That Damaged Products Are Never Shipped.</h3>
                <p className="text-gray-700">We uphold strict quality control in our warehouse to ensure that damaged or subpar products are never shipped to our customers.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 text-orange-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Logistic Partners</h3>
                <p className="text-gray-700">We partner exclusively with top-tier logistics providers, including FedEx, Blue Dart, Delhivery, etc.</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase">Strong Control On Supply Chain</h2>
            <p className="text-gray-700 mb-8">We invest a lot of time, effort, and resources into our supply chain to ensure authenticity. This dedication distinguishes us, as the chances of finding counterfeit products increase when buying from resellers.</p>
            {/* Diagram Mockup */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-pink-100 flex items-center justify-between text-xs font-bold text-center text-gray-500">
              <div>INTERNATIONAL<br/>BRAND</div>
              <div>➔</div>
              <div>IMPORTER</div>
              <div>➔</div>
              <div>DISTRIBUTOR</div>
              <div>➔</div>
              <div>RETAILER</div>
              <div>➔</div>
              <div>FITFUEL</div>
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section className="bg-orange-50 rounded-2xl p-12 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 uppercase">Authenticity Certificates</h2>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-gray-700">Select Brand:</span>
            <select className="border-gray-300 rounded-md py-2 px-4 bg-white shadow-sm focus:ring-orange-500 focus:border-orange-500 outline-none min-w-[200px]">
              <option>Muscletech</option>
              <option>Optimum Nutrition</option>
              <option>MyProtein</option>
            </select>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-yellow-400 inline-block mb-6">
            <div className="w-full max-w-[600px] h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-medium">
              [Certificate Document Image]
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Brand Authorization Letter</h3>
          <p className="text-gray-700 mt-2 max-w-2xl">
            This is to certify that "FitFuel Private Limited" is authorized to sell "Muscletech" products on their official website www.fitfuel.in
          </p>
        </section>

        {/* Distributors */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 uppercase text-center md:text-left">Our Partner Importers/Distributors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partnerImporters.map((partner, idx) => (
              <div key={idx} className="bg-white border rounded-xl h-32 flex items-center justify-center p-6 hover:shadow-md transition-shadow">
                <span className="font-bold text-gray-400">{partner.name} Logo</span>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback */}
        <section className="bg-pink-50 rounded-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <div className="w-full h-full min-h-[400px] bg-gray-200 relative">
               {/* Customer Image Mockup */}
               <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold">
                 [Customer Photo]
               </div>
            </div>
          </div>
          <div className="md:w-1/2 p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 uppercase">Feedback That Counts</h2>
            <div className="text-6xl text-gray-900 font-serif leading-none mb-4">"</div>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              My experience is great with FitFuel. All the products I've ordered, were bang on results. One thing is for sure products from FitFuel are authentic and value for money. Product range is also good. This is the first and only App that comes to my mind while thinking of a new supplement. I always look forward to buying my supplements from FitFuel.
            </p>
            <p className="font-bold text-gray-900 text-xl mb-8">Deepak Nayak</p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
