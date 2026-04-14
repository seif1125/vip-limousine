import Image from 'next/image';

import { 
   Star, 
   CarFront,  
   Map as MapIcon, // Rename this to avoid collision with .map()
   ShieldCheck,
   Globe,
   Clock,
   PlaneTakeoff
} from 'lucide-react';


import { trustPoints, services, branches ,whyChooseUs } from '@/constants';

export default function About() {
  // Trust points from your original code

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      
      {/* =========================================
          PART 1: THE INTRODUCTION (Original Layout)
          ========================================= */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        
        {/* IMAGE BLOCK WITH FLOATING BADGE */}
        <div className="relative order-2">
          <div className="relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl border border-slate-100">
            <Image 
              src="/about.avif" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover" 
              alt="Professional Chauffeur Service Cairo"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-[#0F172A] p-10 rounded-[32px] shadow-2xl border-t-4 border-[#C5A25D]">
            <div className="flex items-center gap-1 mb-2 text-[#C5A25D]">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="text-3xl font-black text-white italic tracking-tighter uppercase">5-Star</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Standard</p>
          </div>
        </div>

        {/* CONTENT BLOCK */}
        <div className="space-y-8 order-1 lg:order-2">
          <div className="space-y-4">
            <p className="text-[#C5A25D] font-black text-xs uppercase tracking-[0.5em]">The Gold Standard of Egypt</p>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter text-[#0F172A] leading-none">
              Elite Chauffeur <br /> & Meet-and-Greet
            </h2>
          </div>
          
          <div className="text-slate-600 text-lg leading-relaxed font-medium space-y-4">
            <p>
              Navigating Egypt shouldn't be a challenge. At <strong>VIP Limousine Egypt</strong>, we specialize in bridging the gap for international executives and discerning travelers.
            </p>
            <p>
              From the arrivals terminal to the serene beaches of the Red Sea, our mission is to provide a seamless, 
              secure, and ultra-luxurious experience using the world’s most prestigious vehicles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            {trustPoints.map((item, i) => (
              <div key={i} className="space-y-3 group">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#C5A25D] group-hover:bg-[#0F172A] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-black text-[11px] uppercase tracking-widest text-[#0F172A]">{item.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400 leading-tight mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-16 space-y-6">
          <p className="text-[#C5A25D] font-black text-xs uppercase tracking-[0.5em]">
            The VIP Difference
          </p>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-[#0F172A] leading-none">
            Why Choose Us For <br className="hidden sm:block" /> Car Hire in Egypt?
          </h2>
          <div className="w-24 h-1 bg-[#C5A25D] rounded-full opacity-50" />
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            We are dedicated to providing the best car rental experience in Egypt. 
            We stand out because of our commitment to supporting our clients anytime 
            & looking after their safety.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, i) => (
            <div 
              key={i} 
              className="bg-slate-50 p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
            >
              {/* ICON CONTAINER */}
              <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center text-[#C5A25D] mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              
              {/* TEXT CONTENT */}
              <h3 className="text-lg font-black text-[#0F172A] uppercase tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-bold">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* =========================================
          PART 2: OUR SERVICES (Elementor Reference)
          ========================================= */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <p className="text-[#C5A25D] font-black text-xs uppercase tracking-[0.5em]">What We Offer</p>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[#0F172A]">
              Our Car Rental Services
            </h2>
            <div className="w-24 h-1 bg-[#C5A25D] mx-auto rounded-full opacity-50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center text-[#C5A25D] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-black text-[#0F172A] uppercase tracking-tight mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================
          PART 3: EXPLORE BY BRANCH (Image Grid)
          ========================================= */}
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <p className="text-[#C5A25D] font-black text-xs uppercase tracking-[0.5em]">Locations</p>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[#0F172A]">
              Explore Egypt with Our Fleet 
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {branches.map((branch, i) => (
  <div
    key={i} 
  
    className="group block relative h-100 rounded-4xl overflow-hidden"
  >
    <Image 
      src={branch.image} 
      fill 
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover transition-transform duration-700" 
      alt={`VIP Car Rental branch in ${branch.name}, Egypt`}
      loading="lazy" 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 to-transparent" />
    <h3 className="absolute bottom-8 left-8 text-2xl font-black text-white italic uppercase">{branch.name}</h3>
  </div>
))}
        </div>
      </div>

    </section>
  );
}