import { Star, Quote, BriefcaseBusiness } from 'lucide-react';
import Image from 'next/image';

export default function Testimonials(testimonials) {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <Quote className="mx-auto text-[#C5A25D]" size={60} />
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[#0F172A]">
            Trusted by the World's Executives
          </h2>
          <p className="text-[#C5A25D] text-xs font-black uppercase tracking-[0.3em]">Over 5,000 successful trips across Egypt</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.testimonials.map((t) => (
            <div 
              key={t._id} 
              className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#C5A25D" className="text-[#C5A25D]" />
                  ))}
                </div>
                <p className="text-slate-600 font-semibold italic mb-8 leading-relaxed text-lg">
                  "{t.comment}"
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy-950 rounded-full flex items-center justify-center text-white font-black text-xs italic">
                    <Image
                    src={t.image}
                    alt={t.name}
                    width={20}
                    height={20}
                    className="w-full h-full rounded-full"
                    lazy="true"
                    />
                  </div>
                  <div>
                    <p className="font-black text-[#0F172A] uppercase text-[11px] tracking-widest">{t.name}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase flex items-center gap-1">
                      <BriefcaseBusiness size={10} /> {t.title} - {t.origin}
                    </p>
                  </div>
                </div>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}