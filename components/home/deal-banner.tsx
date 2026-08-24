'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function DealBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    endDate.setHours(23, 59, 59, 999);
    
    const targetTime = endDate.getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return (
      <section className="py-16 bg-[#ff4500] text-black border-y-8 border-black overflow-hidden relative min-h-[300px]">
         <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[250px]">
         </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#ff4500] text-black border-y-8 border-black overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply pointer-events-none" />
      <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-4">Deal of the Week</h2>
          <p className="text-xl font-bold uppercase tracking-widest mb-8 opacity-80">Up to 40% off premium isolates</p>
          <Link href="/collections/deals">
            <Button size="lg" className="rounded-none bg-black text-white hover:bg-white hover:text-black border-2 border-black font-bold text-lg px-8 py-6 uppercase tracking-wider">
              Claim Offer
            </Button>
          </Link>
        </div>
        <div className="flex gap-2 sm:gap-4 text-center">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col items-center bg-white p-3 sm:p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] border-4 border-black w-16 sm:w-24">
              <span className="font-display font-black text-2xl sm:text-4xl leading-none">{unit.value.toString().padStart(2, '0')}</span>
              <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest mt-2">{unit.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
