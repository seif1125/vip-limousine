"use client";
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing'; 
import { useLocale } from 'next-intl';
import Image from 'next/image';

export default function Hero({ banners }) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      direction: isAr ? 'rtl' : 'ltr' 
    }, 
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section 
      className="relative h-[85vh] w-full bg-navy-950 overflow-hidden" 
      aria-label="VIP Banner"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {banners.map((slide, index) => {
            const title = isAr ? (slide.title_ar || slide.title_en) : slide.title_en;
            const subtitle = isAr ? (slide.subtitle_ar || slide.subtitle_en) : slide.subtitle_en;
            const buttonText = isAr ? (slide.buttonText_ar || slide.buttonText_en) : slide.buttonText_en;
            
            // Check if backdrop is a video stream link
            const isVideo = slide.bannerType === 'video' || slide.imageUrl?.toLowerCase().includes('.mp4');

            return (
              <div className="relative flex-[0_0_100%] min-w-0 h-full" key={slide._id}>
                
                {/* Media Backdrop Container */}
                <div className="absolute inset-0 z-0">
                  {isVideo ? (
                    <video
                      src={slide.imageUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      fill
                      src={slide.imageUrl} 
                      alt={title} 
                      priority={index === 0}
                      className="object-cover" 
                      quality={85}
                    />
                  )}
                  
                  {/* Dynamic Gradient Mask for Text Readability */}
                  <div className={`absolute inset-0 bg-gradient-to-75 from-[#0F172A] via-[#0F172A]/70 to-transparent ${isAr ? 'bg-gradient-to-l' : 'bg-gradient-to-r'}`} />
                </div>
                
                {/* Content Overlay */}
                <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
                  <div className="max-w-2xl space-y-6">
                    <h1 className="text-5xl md:text-7xl font-black text-[#C5A25D] italic uppercase tracking-tighter leading-none">
                      {title}
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed">
                      {subtitle}
                    </p>
                    <div className="pt-4">
                      <Link 
                        href={slide.buttonUrl || "/fleet"} 
                        className="inline-flex items-center gap-3 bg-[#C5A25D] text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-[#0F172A] transition-all shadow-xl"
                      >
                        {buttonText} 
                        {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <button 
        onClick={scrollPrev} 
        className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-white/20 text-white hover:bg-[#C5A25D] transition-all`}
      >
        {isAr ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>
      <button 
        onClick={scrollNext} 
        className={`absolute ${isAr ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-white/20 text-white hover:bg-[#C5A25D] transition-all`}
      >
        {isAr ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>
    </section>
  );
}