"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Wifi, Map, Gauge, Users, Briefcase, Camera, Star , DollarSignIcon } from 'lucide-react';

export default function FleetCard({ car }) {
  return (
    <div className="group relative bg-white rounded-[2.5rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(197,162,93,0.15)] transition-all duration-500 hover:-translate-y-2 border border-slate-50 flex flex-col h-full">
      
      {/* Image Container with Enlarge Effect */}
      <div className="relative h-70 w-full overflow-hidden rounded-4xl bg-slate-50 shrink-0">
      <Image 
  src={`${car.images[0] || car.image}?auto=format&fit=crop&q=75&w=800`} // Force compression via URL
  alt={`${car.name} - ${car.type} in Egypt`}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Critical for Performance
  className="object-cover transition-transform duration-1000 group-hover:scale-110"
/>
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
          <div className="bg-white/90 backdrop-blur-md text-[#C5A25D] text-[9px] font-black px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
            {car.type}
          </div>
          {/* Featured Badge */}
          {car.featured && (
            <div className="bg-[#C5A25D]/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest flex items-center gap-1.5">
              <Star size={10} fill="currentColor" /> Featured
            </div>
          )}
        </div>

        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-2">
          <Camera size={12} className="text-[#C5A25D]" />
          {car.images?.length || 0} PHOTOS
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-6 flex flex-col ">
        <div className="mb-3 gap-4">
          <div>
            <h3 className="text-xl line-clamp-1 font-black italic uppercase tracking-tight text-slate-900 group-hover:text-[#C5A25D] transition-colors line-clamp-1">
              {car.name}
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Model {car.model} 
            </span>
          </div>
          
       
        </div>

        <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2 flex-grow">
          {car.description}
        </p>

        {/* Specs Grid */}
        <div className="flex items-center justify-between py-4 border-t border-slate-50 mt-auto">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Users size={14} className="text-[#C5A25D]" />
              <span className="text-[10px] font-black">{car.specs.passengers}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Briefcase size={14} className="text-[#C5A25D]" />
              <span className="text-[10px] font-black">{car.specs.luggage}</span>
            </div>
          </div>

          {/* Quick Icons for Booleans */}
          <div className="flex gap-3">
            {car.specs.wifi && <Wifi size={14} className="text-slate-300 group-hover:text-[#C5A25D] transition-colors" />}
            {car.specs.fourWheel && <Gauge size={14} className="text-slate-300 group-hover:text-[#C5A25D] transition-colors" />}
            {car.specs.gps && <Map size={14} className="text-slate-300 group-hover:text-[#C5A25D] transition-colors" />}
          </div>
        </div>
        {/* Price Display */}
{car.price && (
  <div className="shrink-0 flex items-center  mt-4 mb-3">
    <div className="text-xl  font-black italic text-[#C5A25D] leading-none">
    <DollarSignIcon size={12} className="inline-block font-black text-[#C5A25D]" />   {car.price}  
    </div>

    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 block">
    &nbsp;/ Per Day
    </span>
  </div>
)}

        {/* Action Link (Hover state separated from the main card) */}
        <Link 
          href={`/fleet/${car.id}`}
          className="mt-4 block w-full text-center py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-slate-200 hover:bg-[#C5A25D] hover:shadow-[#C5A25D]/30 hover:-translate-y-1"
        >
          Book This Vehicle
        </Link>
      </div>
    </div>
  );
}