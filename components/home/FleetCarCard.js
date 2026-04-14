"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Wifi, Map, Gauge, Users, Briefcase, Camera, Star, DollarSign } from 'lucide-react';

export default function FleetCard({ car }) {
  // SEO: Descriptive alt text for better Image Search ranking
  const imageAlt = `Rent ${car.name} ${car.model} in Egypt - ${car.type} Luxury Car Rental`;

  return (
    <article 
      className="group relative bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-[0_20px_50px_rgba(197,162,93,0.15)] transition-all duration-500 hover:-translate-y-2 border border-slate-50 flex flex-col h-full"
      itemScope 
      itemType="https://schema.org/Product"
    >
      {/* IMAGE SECTION - Performance Optimized */}
      <div className="relative h-64 w-full overflow-hidden rounded-[2rem] bg-slate-50 shrink-0">
        <Image 
          src={car.images?.[0] || car.image}
          alt={imageAlt}
          fill
          // Performance: Sizes attribute prevents downloading oversized images on mobile
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          // SEO/Performance: priority={car.featured} would be good if this is LCP
          loading="lazy" 
          itemProp="image"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col items-start gap-2 z-10">
          <span className="bg-white/90 backdrop-blur-md text-[#C5A25D] text-[9px] font-black px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
            {car.category.name}
          </span>
          {car.featured && (
            <div className="bg-[#C5A25D]/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest flex items-center gap-1.5">
              <Star size={10} fill="currentColor" /> Featured
            </div>
          )}
        </div>

        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-2 z-10">
          <Camera size={12} className="text-[#C5A25D]" />
          {car.images?.length || 1} PHOTOS
        </div>
      </div>

      {/* CONTENT SECTION - SEO Optimized */}
      <div className="px-4 py-6 flex flex-col flex-grow">
        <header className="mb-3">
          <h3 
            className="text-xl font-black italic uppercase tracking-tight text-slate-900 group-hover:text-[#C5A25D] transition-colors line-clamp-1"
            itemProp="name"
          >
            {car.name}
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Model <span itemProp="model">{car.model}</span>
          </p>
        </header>

        <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2 flex-grow" itemProp="description">
          {car.description}
        </p>

        {/* PRICE SECTION - Structured Data */}
        {car.price && (
          <div 
            className="shrink-0 flex items-center mt-auto mb-4"
            itemProp="offers" 
            itemScope 
            itemType="https://schema.org/Offer"
          >
            <meta itemProp="priceCurrency" content="USD" />
            <div className="text-xl font-black italic text-[#C5A25D] leading-none">
              <DollarSign size={14} className="inline-block" />
              <span itemProp="price">{car.price}</span>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 block">
              &nbsp;/ Per Day
            </span>
            <link itemProp="availability" href="https://schema.org/InStock" />
          </div>
        )}

        {/* SPECS GRID */}
        <div className="flex items-center justify-between py-4 border-t border-slate-50">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-slate-600" aria-label={`${car.specs.passengers} Passengers`}>
              <Users size={14} className="text-[#C5A25D]" />
              <span className="text-[10px] font-black">{car.specs.passengers}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600" aria-label={`${car.specs.luggage} Luggage Capacity`}>
              <Briefcase size={14} className="text-[#C5A25D]" />
              <span className="text-[10px] font-black">{car.specs.luggage}</span>
            </div>
          </div>

          <div className="flex gap-3 text-slate-300">
            {car.specs.wifi && <Wifi size={14} className="group-hover:text-[#C5A25D] transition-colors" />}
            {car.specs.fourWheel && <Gauge size={14} className="group-hover:text-[#C5A25D] transition-colors" />}
            {car.specs.gps && <Map size={14} className="group-hover:text-[#C5A25D] transition-colors" />}
          </div>
        </div>

        {/* CTA */}
        <Link 
          href={`/fleet/${car._id}`}
          className="mt-4 block w-full text-center py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-slate-200 hover:bg-[#C5A25D] hover:shadow-[#C5A25D]/30 hover:-translate-y-1"
          aria-label={`Book the ${car.name}`}
        >
          Book This Vehicle
        </Link>
      </div>
    </article>
  );
}