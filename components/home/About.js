"use client";
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useLocale } from 'next-intl';
import { trustPoints, services, branches, whyChooseUs } from '@/constants';

export default function About() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section 
      id="about" 
      className="py-24 bg-white overflow-hidden" 
      dir={isAr ? 'rtl' : 'ltr'}
    >
      
      {/* PART 1: INTRODUCTION */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        
        {/* IMAGE BLOCK */}
        <div className={`relative ${isAr ? 'order-2' : 'order-1'}`}>
          <div className="relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl border border-slate-100">
            <Image 
              src="/about.avif" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover" 
              alt={isAr ? "خدمة سائق محترف في القاهرة" : "Professional Chauffeur Service Cairo"}
            />
          </div>
          <div className={`absolute -bottom-6 ${isAr ? '-left-6' : '-right-6'} bg-[#0F172A] p-10 rounded-[32px] shadow-2xl border-t-4 border-[#C5A25D]`}>
            <div className="flex items-center gap-1 mb-2 text-[#C5A25D]">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="text-3xl font-black text-white italic tracking-tighter uppercase">
               {isAr ? "5 نجوم" : "5-Star"}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               {isAr ? "معايير عالمية" : "Global Standard"}
            </p>
          </div>
        </div>

        {/* CONTENT BLOCK */}
        <div className={`space-y-8 ${isAr ? 'order-1' : 'order-2'}`}>
          <div className="space-y-4">
            <p className="text-[#C5A25D] font-black text-xs uppercase tracking-[0.5em]">
              {isAr ? "المعيار الذهبي في مصر" : "The Gold Standard of Egypt"}
            </p>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter text-[#0F172A] leading-none">
              {isAr ? <>سائقون نخبة <br /> واستقبال وتوديع</> : <>Elite Chauffeur <br /> & Meet-and-Greet</>}
            </h2>
          </div>
          
          <div className="text-slate-600 text-lg leading-relaxed font-medium space-y-4">
            <p>
              {isAr 
                ? "التنقل في مصر لا يجب أن يكون تحديًا. في في آي بي ليموزين مصر، نحن متخصصون في تذليل العقبات أمام التنفيذيين الدوليين والمسافرين المميزين." 
                : "Navigating Egypt shouldn't be a challenge. At VIP Limousine Egypt, we specialize in bridging the gap for international executives and discerning travelers."}
            </p>
          </div>

          {/* TRUST POINTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            {trustPoints.map((item, i) => (
              <div key={i} className="space-y-3 group">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#C5A25D] group-hover:bg-[#0F172A] group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-black text-[11px] uppercase tracking-widest text-[#0F172A]">
                    {isAr ? item.title_ar : item.title_en}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 leading-tight mt-1">
                    {isAr ? item.desc_ar : item.desc_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 2: WHY CHOOSE US */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className={`max-w-3xl mb-16 space-y-6 ${isAr ? 'text-right' : 'text-left'}`}>
          <p className="text-[#C5A25D] font-black text-xs uppercase tracking-[0.5em]">
            {isAr ? "فرق في آي بي" : "The VIP Difference"}
          </p>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-[#0F172A] leading-none">
            {isAr ? <>لماذا تختارنا <br /> لليموزين السيارات في مصر؟</> : <>Why Choose Us For <br /> Car Hire in Egypt?</>}
          </h2>
          <div className={`w-24 h-1 bg-[#C5A25D] rounded-full opacity-50 ${isAr ? 'mr-0' : 'ml-0'}`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 group">
              <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center text-[#C5A25D] mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-black text-[#0F172A] uppercase tracking-tight mb-3">
                {isAr ? item.title_ar : item.title_en}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-bold">
                {isAr ? item.desc_ar : item.desc_en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PART 3: SERVICES */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[#0F172A]">
              {isAr ? "خدمات ليموزين السيارات لدينا" : "Our Car Limousine Services"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] shadow-sm group">
                <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center text-[#C5A25D] mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-black text-[#0F172A] uppercase tracking-tight mb-4">
                  {isAr ? service.title_ar : service.title_en}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {isAr ? service.desc_ar : service.desc_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 4: BRANCHES */}
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[#0F172A] mb-12">
          {isAr ? "استكشف مصر بأسطولنا" : "Explore Egypt with Our Fleet"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((branch, i) => (
            <div key={i} className="group block relative h-80 rounded-[40px] overflow-hidden">
              <Image 
                src={branch.image} 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={isAr ? branch.name_ar : branch.name_en}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 to-transparent" />
              <h3 className={`absolute bottom-8 ${isAr ? 'right-8' : 'left-8'} text-2xl font-black text-white italic uppercase`}>
                {isAr ? branch.name_ar : branch.name_en}
              </h3>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}