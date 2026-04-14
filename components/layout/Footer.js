"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, Phone, MessageSquare, CopyrightIcon, 
  Send, X, Building2, User 
} from 'lucide-react';


// ... (keep your imports)

// 1. MOVE THE FORM OUTSIDE THE MAIN COMPONENT
const InquiryForm = ({ isModal = false, formData={company:'',name:'',message:''}, onChange, onSubmit }) => (
  <div className={`${!isModal ? 'bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl' : ''}`}>
    <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4">
      Company Inquiry
    </h4>
    <form className="space-y-3" onSubmit={onSubmit}>
      <div className="relative">
        <Building2 size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input 
          required name="company" type="text" placeholder="COMPANY NAME"
          value={formData.company}
          onChange={onChange}
          className="w-full bg-[#0F172A] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-[#C5A25D] transition-colors"
        />
      </div>
      <div className="relative">
        <User size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input 
          required name="name" type="text" placeholder="YOUR NAME"
          value={formData.name}
          onChange={onChange}
          className="w-full bg-[#0F172A] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-[#C5A25D] transition-colors"
        />
      </div>
      <textarea 
        required name="message" placeholder="HOW CAN WE HELP?" rows="3"
        value={formData.message}
        onChange={onChange}
        className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-3 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-[#C5A25D] transition-colors resize-none"
      ></textarea>
      <button className="w-full bg-[#C5A25D] hover:bg-white hover:text-[#0F172A] text-white py-4 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
        <Send size={12} /> Send via WhatsApp
      </button>
    </form>
  </div>
);
export default function Footer({ settings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ company: '', name: '', message: '' });
  const currentYear = new Date().getFullYear();

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    const { company, name, message } = formData;
    
    // Constructing a professional structured message
    const text = `*Company Inquiry - VIP Limousine Egypt*\n\n` +
                 `*Company:* ${company}\n` +
                 `*Contact Name:* ${name}\n` +
                 `*Message:* ${message}`;
    
    const whatsappUrl = `https://wa.me/${settings.phones.whatsapp1.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // The Inquiry Form component (used in Footer and Modal)


  return (
    <footer className="bg-[#0F172A] text-white pt-14 pb-2 border-t border-white/5 relative">
      
      {/* MOBILE STICKY BUBBLE */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-[#C5A25D] text-white p-4 rounded-full shadow-2xl animate-bounce hover:animate-none active:scale-95 transition-transform"
        aria-label="Open Inquiry"
      >
        <MessageSquare size={24} />
      </button>

      {/* MOBILE MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 md:hidden">
          <div className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative bg-[#1E293B] w-full max-w-sm p-8 rounded-[32px] border border-white/10 shadow-2xl">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-slate-400"><X size={20} /></button>
            {/* PASS PROPS HERE */}
            <InquiryForm 
              isModal={true} 
              formData={formData} 
              onChange={handleChange} 
              onSubmit={handleWhatsAppRedirect} 
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* BRAND */}
        <div className="space-y-6 lg:border-r border-slate-700 pr-6">
          <Image src="/logo.png" alt="VIP Limousine Logo" width={50} height={50} />
          <p className="text-slate-400 text-sm leading-relaxed">The gold standard for executive transport and premium chauffeur services across Egypt.</p>
        </div>

        {/* LOCATIONS */}
        <div className="lg:border-r border-slate-700 pr-6">
          <h4 className="text-[#C5A25D] font-black text-xs uppercase mb-8">Key Hubs</h4>
          <ul className="space-y-4">
            {settings.locations.map((loc) => (
              <li key={loc._id}>
                <Link href={loc.href} target="_blank" className="flex items-start gap-3 group">
                  <MapPin size={16} className="text-[#C5A25D] shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold group-hover:text-[#C5A25D]">{loc.en}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{loc.workingHours.en}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACTS */}
        <div className="lg:border-r border-slate-700 pr-6">
          <h4 className="text-[#C5A25D] font-black text-xs uppercase mb-8">Get In Touch</h4>
          <div className="space-y-6">
            <Link href={`tel:${settings.phones.whatsapp1}`} className="flex items-center gap-4 group">
               <Phone size={18} className="text-[#C5A25D] group-hover:scale-110 transition-transform" />
               <span className="text-sm font-black">{settings.phones.whatsapp1}</span>
            </Link>
            <Link href={`https://wa.me/${settings.phones.whatsapp1.replace(/\D/g, '')}`} className="flex items-center gap-4 group">
               <MessageSquare size={18} className="text-[#C5A25D] group-hover:scale-110 transition-transform" />
               <span className="text-sm font-black">WhatsApp Concierge</span>
            </Link>
          </div>
        </div>

        {/* DESKTOP FORM */}
        <div className="hidden md:block">
        <InquiryForm 
    formData={formData} 
    onChange={handleChange} 
    onSubmit={handleWhatsAppRedirect} 
  />
        </div>
      </div>

      {/* COPYRIGHT AREA */}
      <div className="max-w-7xl mx-auto px-6 pt-4 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8 text-slate-500">
        <p className="text-[9px] font-black tracking-[0.3em] uppercase flex lg:flex-row flex-col items-center lg:text-start text-center">
          <CopyrightIcon className='text-[#C5A25D] lg:mr-2 mb-2 lg:mb-0' size={10} /> 
          {currentYear} VIP LIMOUSINE EGYPT. ALL RIGHTS RESERVED.
        </p>

        <div className="text-[9px] font-bold tracking-widest uppercase text-slate-700">
          Crafted by <a href="https://seif1125.github.io/Seif-Amro-Portfolio/" target="_blank" className="text-[#C5A25D] hover:text-white transition-colors">Seif Amr</a>
        </div>
      </div> 
    </footer>
  );
}
{/* */}


