import Image from 'next/image';
import { ShieldCheck, Globe, Star, Clock } from 'lucide-react';

export default function About() {
  const trustPoints = [
    { icon: <Globe size={20} />, title: "English Speaking", desc: "Fluent chauffeurs for clear communication." },
    { icon: <ShieldCheck size={20} />, title: "Certified Safety", desc: "Vetted drivers and GPS-tracked luxury fleet." },
    { icon: <Clock size={20} />, title: "24/7 Monitoring", desc: "We track your flight for perfect pickup timing." }
  ];

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* IMAGE BLOCK WITH FLOATING BADGE */}
        <div className="relative order-2">
          <div className="relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl border border-slate-100">
          <Image 
  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=75&w=1200" 
  fill 
  sizes="(max-width: 1024px) 100vw, 50vw"
  className="object-cover" 
  alt="Professional Chauffeur Service Cairo"
  loading="lazy" // This is far down the page, so lazy load it
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
              Navigating Cairo shouldn't be a challenge. At <strong>VIP Limousine Egypt</strong>, we specialize in bridging the gap for international executives and travelers.
            </p>
            <p>
              From the <strong>Cairo International Airport (CAI)</strong> arrivals terminal to the 
              <strong> New Administrative Capital</strong>, our mission is to provide a seamless, 
              secure, and ultra-luxurious experience using the world’s most prestigious vehicles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
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
    </section>
  );
}