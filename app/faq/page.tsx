import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - FitFuel',
  description: 'Frequently asked questions about FitFuel products, shipping, and authenticity.',
};

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center uppercase tracking-tight">Frequently Asked Questions</h1>
      <p className="text-gray-500 text-center mb-12">Find answers to the most common questions about our products and services.</p>

      <div className="space-y-6">        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center justify-between cursor-pointer">
            Can I return or exchange a product?
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Yes, we have a hassle-free 7-day return policy. Products can be returned or exchanged only if they are delivered in a damaged condition or if the wrong item is shipped. The product must be sealed, unopened, and in its original packaging. Please record an unboxing video to facilitate quick claims.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center justify-between cursor-pointer">
            Why does the powder mix differently this time?
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Slight variations in taste, mixability, or color can occur between different batches of the same product. This is completely normal and often due to variations in raw materials (e.g., changes in milk seasons for whey). As long as the authenticity is verified, the nutritional profile remains identical.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center justify-between cursor-pointer">
            Do you offer Cash on Delivery (COD)?
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Yes, Cash on Delivery is available for most pin codes across India. A nominal COD handling fee might apply depending on the order value. Simply select "Cash on Delivery" at checkout and verify your phone number via OTP to confirm the order.
          </p>
        </div>
      </div>
    </div>
  );
}
