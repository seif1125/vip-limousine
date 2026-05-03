"use client";
import React from 'react';
import { Link } from '@/i18n/routing'; // Use localized Link
import { useLocale } from 'next-intl';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import FleetCarCard from './FleetCarCard';

export default function FeaturedFleet({ featuredCars }) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section 
      className="py-20 bg-transparent" 
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className={isAr ? 'text-right' : 'text-left'}>
            <h2 className="text-[#C5A25D] font-black text-[10px] uppercase tracking-[0.4em] mb-2 italic">
              {isAr ? "مجموعة النخبة" : "Executive Selection"}
            </h2>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">
              {isAr ? (
                <>
                  <span className="text-[#C5A25D]">الأسطول</span> المتميز
                </>
              ) : (
                <>
                  Featured <span className="text-[#C5A25D]">Fleet</span>
                </>
              )}
            </h2>
          </div>

          <Link 
            href="/fleet" 
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#C5A25D] transition-colors"
          >
            {isAr ? "عرض جميع السيارات" : "See All Vehicles"}
            {isAr ? (
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            )}
          </Link>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {featuredCars?.map((car) => (
            <FleetCarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}