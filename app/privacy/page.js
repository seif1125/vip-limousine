import React from 'react';
import Link from 'next/link';
import { Lock, EyeOff, Smartphone, Database, ChevronLeft, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | VIP Limousine Egypt',
  description: 'Our commitment to VIP discretion, data protection, and secure booking protocols for luxury travel in Egypt.',
  alternates: {
    canonical: 'https://viplimoegypt.com/privacy',
  }
};

export default function PrivacyPage() {
  // 2. Structured Data (JSON-LD) for better Google Trust (E-E-A-T)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - VIP Limousine Egypt",
    "description": "Data protection and discretion protocol for VIP Limousine Egypt.",
    "url": "https://viplimoegypt.com/privacy"
  };

  const policies = [
    {
      icon: <EyeOff size={20} aria-hidden="true" />,
      title: "Absolute Discretion",
      content: "As a premium limousine service, we prioritize the anonymity of our guests. We do not disclose the identities, pick-up locations, or destinations of our VIP clients to any third parties."
    },
    {
      icon: <Database size={20} aria-hidden="true" />,
      title: "Data Collection",
      content: "We collect only essential information required for booking: name, contact number, email, and travel details. This data is used solely to facilitate your luxury transport experience."
    },
    {
      icon: <Smartphone size={20} aria-hidden="true" />,
      title: "GPS & Safety Tracking",
      content: "Our vehicles are equipped with live GPS tracking for safety and logistics. This data is encrypted and accessible only by our dispatch center to ensure timely arrivals and passenger security."
    },
    {
      icon: <Lock size={20} aria-hidden="true" />,
      title: "Secure Payments",
      content: "All financial transactions are processed through encrypted, PCI-compliant payment gateways. VIP LIMO does not store your credit card details on our local servers."
    }
  ];

  return (
    <main className="bg-white min-h-screen pb-24">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Dark Header Section */}
      <div className="bg-[#0F172A] pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link 
            href="/" 
            aria-label="Return to homepage"
            className="inline-flex items-center gap-2 text-[#C5A25D] text-[10px] font-black uppercase tracking-[0.3em] mb-8 hover:opacity-70 transition-opacity"
          >
            <ChevronLeft size={14} aria-hidden="true" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-6">
            Privacy <span className="text-[#C5A25D]">Policy</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">
            Data Protection & Discretion Protocol • 2026
          </p>
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-4xl mx-auto px-6 -mt-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-50 p-8 md:p-16">
          
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-slate-100">
            <div className="w-12 h-12 bg-[#C5A25D]/10 rounded-2xl flex items-center justify-center text-[#C5A25D]" aria-hidden="true">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black italic uppercase text-slate-900">Your Privacy is Our Standard</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Data Compliance</p>
            </div>
          </div>

          <div className="space-y-16">
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed italic border-l-2 border-[#C5A25D] pl-6 py-2">
                At VIP LIMO, we understand that privacy is the ultimate luxury. This policy outlines how we handle your personal information with the same care and precision we apply to our chauffeur services.
              </p>
            </div>

            {/* Rendered as an unordered list for Semantic HTML */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {policies.map((item, index) => (
                <li key={index} className="space-y-4 list-none">
                  <div className="flex items-center gap-3 text-[#C5A25D]">
                    {item.icon}
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {item.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 text-center border-t border-slate-50 pt-10">
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.5em]">
              Security • Discretion • Excellence
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}