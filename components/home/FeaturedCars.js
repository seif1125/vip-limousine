"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Wifi, Map, Gauge, Users, Briefcase, ChevronRight, Camera } from 'lucide-react';
import FleetCarCard from './FleetCarCard';
import MOCK_DATA from '@/lib/mockData';

export default function FeaturedFleet() {
  const featuredCars = MOCK_DATA.fleet.filter(car => car.featured);

  return (
    <section className="py-20 bg-transparent"> {/* Background removed */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-[#C5A25D] font-black text-[10px] uppercase tracking-[0.4em] mb-2 italic">
              Executive Selection
            </h2>
            <span className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">
              Featured <span className="text-[#C5A25D]">Fleet</span>
            </span>
          </div>
          <Link 
            href="/fleet" 
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#C5A25D] transition-colors"
          >
            See All Vehicles <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {featuredCars.map((car) => (
            <FleetCarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}