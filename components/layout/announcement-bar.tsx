export function AnnouncementBar() {
  return (
    <div className="bg-[var(--color-brand)] text-white py-2 text-xs sm:text-sm font-bold tracking-widest overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-marquee uppercase">
        <span className="mx-8">FREE SHIPPING ON ORDERS ABOVE ₹499</span>
        <span className="mx-8">100% AUTHENTIC PRODUCTS</span>
        <span className="mx-8">EASY RETURNS & REFUNDS</span>
        {/* Duplicate for infinite loop */}
        <span className="mx-8">FREE SHIPPING ON ORDERS ABOVE ₹499</span>
        <span className="mx-8">100% AUTHENTIC PRODUCTS</span>
        <span className="mx-8">EASY RETURNS & REFUNDS</span>
      </div>
    </div>
  )
}
