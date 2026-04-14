"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Menu, X } from 'lucide-react';
import { Facebook, Instagram, TikTok, Youtube } from '@/constants';

export default function Header({ settings }) {
  const [isOpen, setIsOpen] = useState(false);

  // Static internal navigation
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Fleet", href: "/fleet" },
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
  ];

  // Dynamic social links mapping API data to constant icons
  const socialLinks = [
    { icon: <Facebook />, href: settings?.socials?.facebook, label: "Facebook" },
    { icon: <Instagram />, href: settings?.socials?.instagram, label: "Instagram" },
    { icon: <Youtube />, href: settings?.socials?.youtube, label: "Youtube" },
    { icon: <TikTok size={20} />, href: settings?.socials?.tiktok, label: "TikTok" },
    { icon: <Mail size={20} />, href: `mailto:${settings?.emails?.supportMail}`, label: "Mail" },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full">
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
                Egypt's NO:1 Limousine service
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION (Static) */}
          <nav className="hidden lg:flex gap-10 text-[11px] font-black uppercase tracking-widest text-[#0F172A]">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-[#C5A25D] transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* DESKTOP SOCIALS (Dynamic) */}
          <div className="hidden lg:flex text-[#0F172A] items-center gap-5">
            {socialLinks.map((social, idx) => (
              social.href && (
                <Link 
                  key={idx} 
                  href={social.href} 
                  target="_blank" 
                  className="hover:text-[#C5A25D] transition-colors"
                >
                  {social.icon}
                </Link>
              )
            ))}
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#0F172A] hover:text-[#C5A25D] transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
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

          {/* MOBILE SOCIALS (Dynamic) */}
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Connect with us</p>
            <div className="flex flex-wrap gap-6 text-[#0F172A]">
                {socialLinks.map((social, idx) => (
                  social.href && (
                    <Link 
                      key={idx} 
                      href={social.href} 
                      target="_blank" 
                      className="p-3 bg-slate-50 rounded-xl hover:text-[#C5A25D] hover:bg-slate-100 transition-all"
                    >
                      {social.icon}
                    </Link>
                  )
                ))}
            </div>
          </div>

          <div className="mt-auto pb-10">
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                © {new Date().getFullYear()} VIP Limousine Egypt.
             </p>
          </div>
        </div>
      </div>
    </header>
  );
}