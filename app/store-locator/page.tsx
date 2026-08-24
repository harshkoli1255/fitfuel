import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Store Locator - FitFuel',
  description: 'Find a FitFuel verified store near you.',
};

export default function StoreLocatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 uppercase">Store Locator</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Find an official FitFuel store or authorized retail partner near you to purchase 100% genuine supplements offline.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar / List */}
        <div className="md:w-1/3 bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col h-[600px]">
          <div className="p-4 border-b bg-gray-50">
            <div className="relative">
              <input type="text" placeholder="Search by city or pincode" className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="overflow-y-auto flex-grow divide-y">
            {[1, 2, 3, 4, 5].map((store) => (
              <div key={store} className="p-4 hover:bg-orange-50 transition-colors cursor-pointer group">
                <h3 className="font-bold text-gray-900 group-hover:text-orange-500 mb-1">FitFuel New Delhi - Branch {store}</h3>
                <p className="text-sm text-gray-600 mb-2">123, Connaught Place, Block B, New Delhi, 110001</p>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Open Now
                  </span>
                  <span className="text-gray-500">10:00 AM - 9:00 PM</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Area */}
        <div className="md:w-2/3 bg-gray-200 border rounded-2xl h-[600px] flex items-center justify-center relative overflow-hidden">
           {/* Map Placeholder */}
           <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=New+Delhi&zoom=12&size=800x600&scale=2&maptype=roadmap&key=mock')] bg-cover bg-center opacity-30 mix-blend-multiply"></div>
           <div className="relative z-10 text-center bg-white p-6 rounded-xl shadow-lg border">
             <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
             </svg>
             <h3 className="font-bold text-gray-900 text-lg">Map Integration Pending</h3>
             <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">Google Maps API key is required to render the interactive store locator map.</p>
           </div>
        </div>

      </div>
    </div>
  );
}
