"use client";
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
export default function Hero({ banners }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="relative h-[85vh] w-full bg-navy-950 overflow-hidden" aria-label="VIP Banner">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {banners.map((slide) => (
            <div className="relative flex-[0_0_100%] min-w-0 h-full" key={slide.id}>
              {/* Image with Navy Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
               fill
               src={slide.imageUrl} 
               alt={slide.title} 
               priority={slide.id === banners[0].id} // Only prioritize the FIRST slide
               placeholder="blur"
               blurDataURL="data:image/png;base64,..." // Add a tiny base64 placeholder
               className="object-cover" 
               quality={85}
              
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/60 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
                <div className="max-w-2xl space-y-6">
                  <p className="text-[#C5A25D] font-black text-xs uppercase tracking-[0.5em] animate-fade-in">
                    International Executive Travel
                  </p>
                  <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                    {slide.title}
                  </h1>
                  <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="pt-4">
                    <Link href={slide.buttonUrl} className="inline-flex items-center gap-3 bg-[#C5A25D] text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-[#0F172A] transition-all shadow-xl">
                      {slide.buttonText} <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-white/20 text-white hover:bg-[#C5A25D] transition-all">
        <ChevronLeft size={24} />
      </button>
      <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-white/20 text-white hover:bg-[#C5A25D] transition-all">
        <ChevronRight size={24} />
      </button>
    </section>
  );
}