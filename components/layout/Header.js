"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Mail, Menu, X, Globe } from 'lucide-react';
import { Facebook, Instagram, TikTok, Youtube ,Snapchat} from '@/constants';
// Import from your i18n routing
import { Link, usePathname, useRouter } from '@/i18n/routing'; 
import { useLocale } from 'next-intl';


export default function Header({ settings }) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const isAr = locale === 'ar';

  // Navigation Links - Now localized via your JSON messages or simple logic
  const navLinks = [
    { name: isAr ? "الرئيسية" : "Home", href: "/" },
    { name: isAr ? "الأسطول" : "Fleet", href: "/fleet" },
    { name: isAr ? "الشروط" : "Terms", href: "/terms" },
    { name: isAr ? "الخصوصية" : "Privacy", href: "/privacy" },
  ];

  const socialLinks = [
    { icon: <Facebook />, href: settings?.socials?.facebook },
    { icon: <Instagram />, href: settings?.socials?.instagram },
    { icon: <Youtube />, href: settings?.socials?.youtube },
    { icon: <TikTok size={20} />, href: settings?.socials?.tiktok },
    { icon: <Mail size={20} />, href: `mailto:${settings?.emails?.supportMail}` },
    {icon: <Snapchat size={20} />, href: settings?.socials?.snapchat} ,
    {icon: <Globe size={20} />, href: settings?.emails?.threads} ,
    // Placeholder for language switcher
  ];

  // Helper to switch language
  const toggleLanguage = () => {
    const nextLocale = isAr ? 'en' : 'ar';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header className="sticky top-0 z-[100] w-full" dir={isAr ? 'rtl' : 'ltr'}>
      {/* MAIN NAV */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO SECTION */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <Image src="/logo.png" alt="VIP Limousine" width={38} height={38} priority />
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-black tracking-tighter text-[#0F172A] leading-none uppercase">
                VIP LIMOUSINE
              </span>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#C5A25D] hidden sm:block">
                {isAr ? "خدمة الليموزين رقم 1 في مصر" : "Egypt's NO:1 Limousine service"}
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex gap-10 text-[11px] font-black uppercase tracking-widest text-[#0F172A]">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-[#C5A25D] transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* ACTIONS (Language + Socials) */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Language Switcher Button */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#C5A25D] transition-all duration-300"
            >
              <Globe size={14} />
              {isAr ? "English" : "عربي"}
            </button>

            <div className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-4 text-[#0F172A]">
              {socialLinks.map((social, idx) => (
                social.href && (
                  <Link key={idx} href={social.href} target="_blank" className="hover:text-[#C5A25D] transition-colors">
                    {social.icon}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex items-center gap-4 lg:hidden">
             {/* Mobile Language Switcher (Compact) */}
             <button 
              onClick={toggleLanguage}
              className="text-[10px] font-black uppercase tracking-widest text-[#C5A25D] border-2 border-[#C5A25D] px-3 py-1 rounded-lg"
            >
              {isAr ? "EN" : "عربي"}
            </button>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#0F172A]"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 top-20 bg-white z-50 lg:hidden transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8 space-y-8">
          
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black uppercase italic tracking-tighter text-[#0F172A] hover:text-[#C5A25D]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="h-px bg-slate-100 w-full" />

          {/* MOBILE SOCIALS */}
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                {isAr ? "تواصل معنا" : "Contact us"}
            </p>
            <div className="flex flex-wrap gap-6 text-[#0F172A]">
                {socialLinks.map((social, idx) => (
                  social.href && (
                    <Link 
                      key={idx} 
                      href={social.href} 
                      target="_blank" 
                      className="p-3 bg-slate-50 rounded-xl hover:text-[#C5A25D]"
                    >
                      {social.icon}
                    </Link>
                  )
                ))}
            </div>
          </div>

          <div className="mt-auto pb-10">
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                © {new Date().getFullYear()} {isAr ? "VIP ليموزين مصر" : "VIP Limousine Egypt"}.
             </p>
          </div>
        </div>
      </div>
    </header>
  );
}