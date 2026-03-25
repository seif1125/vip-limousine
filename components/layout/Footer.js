"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Send, MessageSquare, ShieldCheck,CopyrightIcon } from 'lucide-react';
import MOCK_DATA from '@/lib/mockData';

// Custom Social SVGs to bypass Lucide missing brand icons
const FacebookIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export default function Footer() {
  const { socials } = MOCK_DATA;
  const currentYear = new Date().getFullYear();
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    // Future logic for your process.env.NEXT_PUBLIC_API_URL goes here
    setTimeout(() => setStatus("Message Sent!"), 1500);
  };

  return (
    <footer className="bg-[#0F172A] text-white pt-14 pb-2 border-t border-white/5">
      <div className="max-w-7xl border-b border-slate-500 mx-auto px-6 pb-4 grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-12 ">
        
        {/* BRAND COLUMN */}
        <div className="space-y-6 border-0 border-b-2 pb-4 lg:border-r-2 lg:pb-0 lg:border-b-0 border-slate-500 pr-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={50} height={50} className="brightness-110" />
            <div className="flex flex-col">
              <span className="text-2xl font-black italic uppercase">VIP LIMO</span>
              <span className="text-[9px] font-bold text-[#C5A25D] tracking-[0.2em] uppercase">
                Egypt's NO:1 Limousine service
              </span>
            </div>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            Experience the pinnacle of luxury travel. We are Egypt's premier limousine service, dedicated to providing unparalleled comfort, style, and professionalism for discerning travelers.
          </p>
        
        </div>

        {/* LOCATIONS COLUMN */}
        <div className='border-0 border-b-2 pb-4 lg:border-r-2 lg:pb-0 lg:border-b-0 border-slate-500 pr-6'>
          <h4 className="text-[#C5A25D] font-black text-xs uppercase tracking-[0.3em] mb-8 italic">Key Hubs</h4>
          <ul className="space-y-6">
            {socials.locations.map((loc, i) => (
              <li key={i}>
                <Link href={loc.href} target="_blank" className="flex items-start gap-3 group">
                  <MapPin size={18} className="text-[#C5A25D] shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold group-hover:text-[#C5A25D] transition-colors">{loc.en}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-tighter" dir="rtl">{loc.ar}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT COLUMN */}
        <div className='border-0 border-b-2 pb-4 lg:border-r-2 lg:pb-0 lg:border-b-0 border-slate-500 pr-6'>
          <h4 className="text-[#C5A25D] font-black text-xs uppercase tracking-[0.3em] mb-8 italic">Get In Touch</h4>
          <div className="space-y-6">
            <Link href={`tel:${socials.contact.tel}`} className="flex items-center gap-4 group">
               <Phone size={18} className="text-[#C5A25D]" />
               <span className="text-sm font-black group-hover:text-white transition-colors">{socials.contact.tel}</span>
            </Link>
            <Link href={`mailto:${socials.contact.email}`} className="flex items-center gap-4 group">
               <Mail size={18} className="text-[#C5A25D]" />
               <span className="text-sm font-black truncate group-hover:text-white transition-colors">{socials.contact.email}</span>
            </Link>
            {/* WhatsApp beneath Mail as requested */}
            <Link href={`https://wa.me/${socials.contact.whatsapp.replace(/\+/g, '')}`} target="_blank" className="flex items-center gap-4 group">
               <MessageSquare size={18} className="text-[#C5A25D]" />
               <span className="text-sm font-black group-hover:text-white transition-colors uppercase italic tracking-wider">Chat on WhatsApp</span>
            </Link>
          </div>
        </div>

        {/* FORM COLUMN: GET IN TOUCH */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl">
          <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4">Quick Inquiry</h4>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input 
              required
              type="email" 
              placeholder="EMAIL ADDRESS" 
              className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-3 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-[#C5A25D] transition-colors"
            />
            <textarea 
              required
              placeholder="HOW CAN WE HELP?" 
              rows="3"
              className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-3 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-[#C5A25D] transition-colors resize-none"
            ></textarea>
            <button className="w-full bg-[#C5A25D] hover:bg-white hover:text-[#0F172A] text-white py-3 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
              {status ? status : <><Send size={12} /> Send Request</>}
            </button>
          </form>
        </div>
      </div>

      {/* SUB-FOOTER */}
      <div className="max-w-7xl mx-auto px-6 pt-4 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8 text-slate-500">
      
        
        <p className="text-[9px] font-black tracking-[0.3em] uppercase flex lg:flex-row flex-col items-center lg:text-start text-center">
          <CopyrightIcon className='text-[#C5A25D] lg:mr-2' size={10} /> {currentYear} VIP LIMOUSINE. ALL RIGHTS RESERVED.
        </p>

        <div className="text-[9px] font-bold tracking-widest uppercase text-slate-700">
          developed by <a href="https://seif1125.github.io/Seif-Amro-Portfolio/" target="_blank" className="text-[#C5A25D] hover:text-[#C5A25D]/80 transition-colors">Seif Amr</a>
        </div>
      </div>
    </footer>
  );
}