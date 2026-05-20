"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import { Facebook, Instagram, TikTok, Youtube ,Snapchat,whats, Whatsapp} from '@/constants';
import { 
  MapPin, Phone, 
  Send, User, Mail, Loader2,X ,MessageCircle,Globe, 
} from 'lucide-react';

const InquiryForm = ({ isModal = false, formData, onChange, onSubmit, onEmailSubmit, isAr, isProcessing }) => (
  <div className={`${!isModal ? 'bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl' : ''}`}>
    <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4">
      {isAr ? "استفسار شخصي" : "Personal Inquiry"}
    </h4>
    <form className="space-y-3" onSubmit={onSubmit}>
      {/* 1. NAME FIELD */}
      <div className="relative">
        <User size={12} className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-500`} />
        <input 
          required name="name" type="text" placeholder={isAr ? "الاسم" : "YOUR NAME"}
          value={formData.name}
          onChange={onChange}
          className={`w-full bg-[#0F172A] border border-white/10 rounded-lg ${isAr ? 'pr-10' : 'pl-10'} pr-4 py-3 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-[#C5A25D] transition-colors`}
        />
      </div>

      {/* 2. EMAIL FIELD */}
      <div className="relative">
        <Mail size={12} className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-500`} />
        <input 
          required name="email" type="email" placeholder={isAr ? "البريد الإلكتروني" : "EMAIL ADDRESS"}
          value={formData.email}
          onChange={onChange}
          className={`w-full bg-[#0F172A] border border-white/10 rounded-lg ${isAr ? 'pr-10' : 'pl-10'} pr-4 py-3 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-[#C5A25D] transition-colors`}
        />
      </div>

      {/* 3. MOBILE NUMBER FIELD (OPTIONAL) */}
      <div className="relative">
        <Phone size={12} className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-500`} />
        <input 
          name="phone" type="tel" placeholder={isAr ? "رقم الهاتف (اختياري)" : "MOBILE NUMBER (OPTIONAL)"}
          value={formData.phone}
          onChange={onChange}
          className={`w-full bg-[#0F172A] border border-white/10 rounded-lg ${isAr ? 'pr-10' : 'pl-10'} pr-4 py-3 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-[#C5A25D] transition-colors`}
        />
      </div>

      {/* 4. MESSAGE FIELD */}
      <textarea 
        required name="message" placeholder={isAr ? "كيف يمكننا مساعدتك؟" : "HOW CAN WE HELP?"} rows="3"
        value={formData.message}
        onChange={onChange}
        className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-3 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:border-[#C5A25D] transition-colors resize-none"
      ></textarea>
      
      <div className="flex flex-col gap-2 pt-1">
        <button 
          type="submit" 
          className="w-full bg-[#C5A25D] hover:bg-white hover:text-[#0F172A] text-white py-3 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
        >
          <Send size={12} /> {isAr ? "أرسل عبر واتساب" : "Send via WhatsApp"}
        </button>
        
        <button 
          type="button"
          onClick={onEmailSubmit}
          disabled={isProcessing}
          className="w-full bg-slate-800 hover:bg-[#C5A25D] hover:text-[#0F172A] border border-white/10 text-white py-3 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
        >
          {isProcessing ? <Loader2 size={12} className="animate-spin" /> : <Mail size={12} />} 
          {isAr ? "إرسال عبر البريد" : "Send via Email"}
        </button>
      </div>
    </form>
  </div>
);

export default function Footer({ settings }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const locale = useLocale();
  const isAr = locale === 'ar';
  const currentYear = new Date().getFullYear();
  
  // Safely grab socialLinks array from settings prop

  const socialLinks = [
    { icon: <Facebook />, href: settings?.socials?.facebook },
    { icon: <Instagram />, href: settings?.socials?.instagram },
    { icon: <Youtube />, href: settings?.socials?.youtube },
    { icon: <TikTok size={20} />, href: settings?.socials?.tiktok },
    { icon: <Mail size={20} />, href: `mailto:${settings?.emails?.supportMail}` },
    {icon: <Snapchat size={20} />, href: settings?.socials?.snapchat} ,
    {icon: <Globe size={20} />, href: settings?.emails?.threads} ,
    {icon: <Whatsapp size={20} />, href: `https://wa.me/${settings.phones.whatsapp1.replace(/\D/g, '')}`} ,
    // Placeholder for language switcher
  ];

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    const text = isAr 
      ? `استفسار شخصي - في آي بي ليموزين مصر\n\nالاسم: ${formData.name}\nالبريد الإلكتروني: ${formData.email}\nرقم الهاتف: ${formData.phone || 'لم يتم التحديد'}\nالرسالة: ${formData.message}`
      : `Personal Inquiry - VIP Limousine Egypt\n\nName: ${formData.name}\nEmail: ${formData.email}\nMobile: ${formData.phone || 'N/A'}\nMessage: ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/${settings.phones.whatsapp1.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailSubmit = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, locale })
      });
      
      const result = await response.json();
      if (result.success) {
        alert(isAr ? "تم إرسال الاستفسار بنجاح" : "Inquiry sent successfully!");
        setFormData({ name: '', email: '', phone: '', message: '' });
        setIsModalOpen(false);
      } else {
        alert(isAr ? "حدث خطأ ما." : "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert(isAr ? "خطأ في الاتصال بالخادم." : "Failed to connect to the server.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* MOBILE FLOATING BUTTON & TOOLTIP */}
      <div className="md:hidden fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <div 
          className="relative bg-[#0F172A] border border-[#C5A25D]/50 text-white text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-full shadow-xl animate-pulse cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {isAr ? "تواصل معنا الآن" : "Contact Us Now"}
          <div className="absolute top-1/2 -translate-y-1/2 -right-[5px] w-2 h-2 bg-[#0F172A] border-t border-r border-[#C5A25D]/50 rotate-45"></div>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C5A25D] text-[#0F172A] p-4 rounded-full shadow-2xl shadow-black/50 hover:scale-105 transition-transform"
          aria-label="Open Inquiry Form"
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* MOBILE MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:hidden" dir={isAr ? 'rtl' : 'ltr'}>
          <div className="relative w-full max-w-md bg-[#0F172A] rounded-2xl border border-white/10 shadow-2xl p-6">
            <button 
              onClick={() => setIsModalOpen(false)}
              className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} text-slate-400 hover:text-white transition-colors`}
            >
              <X size={20} />
            </button>
            <InquiryForm 
              isModal={true}
              formData={formData} 
              onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} 
              onSubmit={handleWhatsAppRedirect} 
              onEmailSubmit={handleEmailSubmit}
              isProcessing={isProcessing}
              isAr={isAr} 
            />
          </div>
        </div>
      )}

      {/* FOOTER STRUCTURE */}
      <footer className="bg-[#0F172A] text-white pt-14 pb-2 border-t border-white/5 relative" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-6 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-right">
          {/* BRAND */}
          <div className="space-y-6 lg:border-l border-slate-700 md:px-6">
            <Image src="/logo.png" alt="VIP Limousine Logo" width={50} height={50} className="mx-auto md:mx-0" />
            <p className="text-slate-400 text-sm leading-relaxed">
              {isAr ? "المعيار الذهبي للنقل التنفيذي وخدمات السائقين المميزة في جميع أنحاء مصر." : "The gold standard for executive transport and premium chauffeur services across Egypt."}
            </p>
          </div>

          {/* LOCATIONS */}
          <div className="lg:border-l border-slate-700 md:px-6">
            <h4 className="text-[#C5A25D] font-black text-xs uppercase mb-8">{isAr ? "الفروع الرئيسية" : "Key Hubs"}</h4>
            <ul className="space-y-4">
              {settings.locations.map((loc) => (
                <li key={loc._id}>
                  <Link href={loc.href} target="_blank" className="flex items-start gap-3 group justify-center md:justify-start">
                    <MapPin size={16} className="text-[#C5A25D] shrink-0 mt-1" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold group-hover:text-[#C5A25D]">{isAr ? loc.ar : loc.en}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{isAr ? loc.workingHours.ar : loc.workingHours.en}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACTS */}
          <div className="lg:border-l border-slate-700 md:px-6">
            <h4 className="text-[#C5A25D] font-black text-xs uppercase mb-8">{isAr ? "تواصل معنا" : "Get In Touch"}</h4>
            <div className="space-y-6">
              <Link href={`tel:${settings.phones.whatsapp1}`} className="flex items-center gap-4 justify-center md:justify-start group">
                 <Phone size={18} className="text-[#C5A25D]" />
                 <span className="text-sm font-black">{settings.phones.whatsapp1}</span>
              </Link>
             

              {/* SOCIAL INTERACTION CONTAINER */}
              <div className="pt-2 flex flex-col items-center md:items-start gap-3">
                <span className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">
                  {isAr ? "تابعنا على" : "Visit Us On"}
                </span>
                
                <div className="flex items-center gap-4 text-slate-400">
                  {socialLinks.map((social, idx) => (
                    social.href && (
                      <Link key={idx} href={social.href} target="_blank" className="hover:text-[#C5A25D] transition-colors">
                        {social.icon}
                      </Link>
                    )
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* DESKTOP FORM */}
          <div className="hidden md:block">
            <InquiryForm 
              formData={formData} 
              onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} 
              onSubmit={handleWhatsAppRedirect} 
              onEmailSubmit={handleEmailSubmit}
              isProcessing={isProcessing}
              isAr={isAr} 
            />
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="max-w-7xl mx-auto px-6 pt-4 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8 text-slate-500">
          <p className="text-[9px] font-black tracking-[0.3em] uppercase">
             © {currentYear} {isAr ? "في آي بي ليموزين مصر. جميع الحقوق محفوظة." : "VIP LIMOUSINE EGYPT. ALL RIGHTS RESERVED."}
          </p>
        </div> 
      </footer>
    </>
  );
}