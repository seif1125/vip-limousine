"use client";
import React, { useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search, Star, ChevronLeft, ChevronRight, Car } from 'lucide-react';
import FleetCarCard from '../home/FleetCarCard';

export default function FleetClient({ fleet }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get values from URL or defaults
  const currentCategory = searchParams.get('type') || 'All';
  const searchQuery = searchParams.get('q') || '';
  const isFeatured = searchParams.get('featured') === 'true';
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const itemsPerPage = 12;

  // Helper to update URL
  const updateParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === 'All' || value === false) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    // Reset page on filter change
    if (!newParams.page) params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredFleet = useMemo(() => {
    return fleet.filter((car) => {
      const matchesCategory = currentCategory === "All" || car.type === currentCategory;
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            car.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFeatured = isFeatured ? car.featured === true : true;
      return matchesCategory && matchesSearch && matchesFeatured;
    });
  }, [currentCategory, searchQuery, isFeatured, fleet]);

  const totalPages = Math.ceil(filteredFleet.length / itemsPerPage);
  const paginatedFleet = filteredFleet.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <main className="bg-[#F8FAFC] min-h-screen pb-32">
      <section className="bg-[#0F172A] pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-6">
            Elite <span className="text-[#C5A25D]">Fleet</span>
          </h1>
          
          {/* SEO Optimized Search Form */}
          <form onSubmit={(e) => e.preventDefault()} className="max-w-xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#C5A25D]" size={18} />
            <input 
              type="text"
              placeholder="Search by car name or type..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white focus:border-[#C5A25D] outline-none transition-all"
              value={searchQuery}
              onChange={(e) => updateParams({ q: e.target.value })}
            />
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-3 flex flex-wrap items-center gap-4 border border-slate-100">
          <div className="flex flex-wrap gap-2">
            {["All", ...new Set(fleet.map(car => car.type))].map((cat) => (
              <button
                key={cat}
                onClick={() => updateParams({ type: cat })}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  currentCategory === cat ? "bg-[#C5A25D] text-white" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button 
            onClick={() => updateParams({ featured: !isFeatured })}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
              isFeatured ? "border-[#C5A25D] text-[#C5A25D] bg-[#C5A25D]/5" : "border-slate-100 text-slate-400"
            }`}
          >
            <Star size={14} fill={isFeatured ? "#C5A25D" : "transparent"} /> Featured
          </button>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedFleet.map((car) => (
            <FleetCarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Pagination links are now "real" URLs */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-4">
            <button 
              disabled={currentPage === 1}
              aria-label="Previous Page"
              onClick={() => updateParams({ page: currentPage - 1 })}
              className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => updateParams({ page: i + 1 })}
                  className={`w-12 h-12 rounded-xl text-[10px] font-black ${
                    currentPage === i + 1 ? "bg-[#0F172A] text-white" : "bg-white text-slate-400 border border-slate-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              disabled={currentPage === totalPages}
              aria-label="Next Page"
              onClick={() => updateParams({ page: currentPage + 1 })}
              className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}