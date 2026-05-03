// app/terms/page.js
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Scale, Clock, Ban, CreditCard, ChevronLeft } from 'lucide-react';


// 1. Dynamic SEO Metadata (Only works on Server Components)
export const metadata = {
  title: 'Terms & Conditions | VIP Limousine Egypt',
  description: 'Review our booking policies, payment terms, and executive travel guidelines. VIP Limousine Egypt guarantees safe and reliable luxury transport.',
  alternates: {
    canonical: 'https://viplimoegypt.com/terms',
  }
};

export default async function TermsPage() {
  const  socials  = await fetch(process.env.NEXT_PUBLIC_API_URL + '/app-settings').then(res => res.json()).then(data => data.data.contactSettings); 
const { emails, phones } = socials; // Destructure for easier access

// Assuming the first item contains the relevant contact info
  // 2. Structured Data for better Google indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms and Conditions - VIP Limousine Egypt",
    "description": "General agreement and legal framework for elite travel in Egypt.",
    "url": "https://viplimoegypt.com/terms"
  };

  const sections = [
    {
      icon: <Clock size={20} aria-hidden="true" />, // Added aria-hidden for accessibility
      title: "Booking & Cancellations",
      content: "Reservations should be made at least 24 hours in advance to guarantee availability. Cancellations made within 12 hours of the scheduled pickup time may be subject to a 50% cancellation fee. No-shows will be charged the full fare."
    },
    {
      icon: <CreditCard size={20} aria-hidden="true" />,
      title: "Payment Terms",
      content: "We accept all major credit cards, bank transfers, and cash payments. For corporate accounts, billing cycles are monthly. All rates are inclusive of fuel and professional chauffeur services unless otherwise stated."
    },
    {
      icon: <ShieldCheck size={20} aria-hidden="true" />,
      title: "Passenger Conduct",
      content: "VIP LIMO reserves the right to terminate any service without refund if the chauffeur deems a passenger's behavior as unruly or unsafe. Smoking and illegal substances are strictly prohibited in all vehicles."
    },
    {
      icon: <Ban size={20} aria-hidden="true" />,
      title: "Damages & Liability",
      content: "The client is responsible for any damage caused to the vehicle by them or their guests (beyond normal wear and tear). We are not liable for delays caused by circumstances beyond our control, such as extreme weather or road closures."
    }
  ];

  return (
    <main className="bg-white min-h-screen pb-24">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Section */}
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
            Terms <span className="text-[#C5A25D]">&</span> Conditions
          </h1>
          <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">
            Last Updated: March 2026 • VIP Limousine Egypt
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 -mt-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-50 p-8 md:p-16">
          
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-slate-100">
            <div className="w-12 h-12 bg-[#C5A25D]/10 rounded-2xl flex items-center justify-center text-[#C5A25D]" aria-hidden="true">
              <Scale size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black italic uppercase text-slate-900">General Agreement</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Legal framework for elite travel</p>
            </div>
          </div>

          <div className="space-y-12">
            <p className="text-slate-600 leading-relaxed italic">
              By utilizing the services of VIP LIMO Egypt, you agree to comply with the following terms and conditions. These policies ensure the highest level of safety, luxury, and reliability for all our distinguished guests.
            </p>

            {/* Rendered as an unordered list for better screen reader flow */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {sections.map((section, index) => (
                <li key={index} className="space-y-4 list-none">
                  <div className="flex items-center gap-3 text-[#C5A25D]">
                    {section.icon}
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {section.content}
                  </p>
                </li>
              ))}
            </ul>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 mt-12">
              <h3 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                Need Clarification?
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                If you have questions regarding our executive travel policies or require a customized corporate contract, please reach out to our legal department.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link 
                  href={`mailto:${emails.supportMail}`} 
                  aria-label={`Email us at ${emails.supportMail}`}
                  className="text-[10px] font-black uppercase tracking-widest text-[#C5A25D] hover:text-slate-900 transition-colors"
                >
                  {emails.supportMail}
                </Link>
                <Link 
                  href={`tel:${phones.hotline}`} 
                  aria-label={`Call us at ${phones.hotline}`}
                  className="text-[10px] font-black uppercase tracking-widest text-[#C5A25D] hover:text-slate-900 transition-colors"
                >
                  {phones.hotline}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
              VIP LIMO EGYPT — Authorized Executive Transportation
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}