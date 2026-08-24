import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - FitFuel',
  description: 'Get in touch with FitFuel for support, bulk inquiries, or brand partnerships.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 uppercase">Contact Us</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">We're here to help! Whether you have a question about an order, want to inquire about bulk purchases, or just want to say hi, feel free to drop us a message.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Contact Details */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Phone / WhatsApp</h3>
                  <p className="text-gray-600">+91 99999 88888</p>
                  <p className="text-xs text-gray-500 mt-1">Mon - Sat: 10:00 AM to 6:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">support@fitfuel.in</p>
                  <p className="text-xs text-gray-500 mt-1">We aim to reply within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Corporate Office</h3>
                  <p className="text-gray-600">FitFuel Headquarters, New Delhi, India 110001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-orange-500 transition-colors uppercase tracking-wider text-sm">
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
