import React from 'react';
import Link from 'next/link';
import { Lock, EyeOff, Smartphone, Database, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

// 1. Dynamic Localized Metadata for SEO (E-E-A-T)
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr ? 'سياسة الخصوصية | VIP Limousine Egypt' : 'Privacy Policy | VIP Limousine Egypt',
    description: isAr 
      ? 'التزامنا بالسرية التامة للـ VIP، وحماية البيانات، وبروتوكولات الحجز الآمن للسفر الفاخر في مصر.' 
      : 'Our commitment to VIP discretion, data protection, and secure booking protocols for luxury travel in Egypt.',
    alternates: {
      canonical: 'https://viplimoegypt.com/privacy',
    }
  };
}

export default async function PrivacyPage({ params }) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  // 2. Structured Data (JSON-LD) Localized
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": isAr ? "سياسة الخصوصية - VIP Limousine Egypt" : "Privacy Policy - VIP Limousine Egypt",
    "description": isAr ? "بروتوكول حماية البيانات والخصوصية لشركة VIP Limousine Egypt." : "Data protection and discretion protocol for VIP Limousine Egypt.",
    "url": "https://viplimoegypt.com/privacy"
  };

  // 3. Localized Copy Dictionary
  const dict = {
    en: {
      backHome: "Back to Home",
      titleMain: "Privacy",
      titleSub: "Policy",
      badge: "Data Protection & Discretion Protocol • 2026",
      cardTitle: "Your Privacy is Our Standard",
      cardSub: "Global Data Compliance",
      introQuote: "At VIP LIMO, we understand that privacy is the ultimate luxury. This policy outlines how we handle your personal information with the same care and precision we apply to our chauffeur services.",
      footerText: "Security • Discretion • Excellence",
      policies: [
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
      ]
    },
    ar: {
      backHome: "العودة إلى الرئيسية",
      titleMain: "سياسة",
      titleSub: "الخصوصية",
      badge: "بروتوكول حماية البيانات والسرية التامة • ٢٠٢٦",
      cardTitle: "خصوصيتكم هي معيارنا الثابت",
      cardSub: "الامتثال العالمي لحماية البيانات",
      introQuote: "في VIP LIMO، نحن ندرك أن الخصوصية هي الرفاهية القصوى. تحدد هذه السياسة كيفية تعاملنا مع معلوماتكم الشخصية بذات العناية والدقة الفائقة التي نطبقها في خدمات السائق الخاص لدينا.",
      footerText: "أمان • سرية • تميز",
      policies: [
        {
          icon: <EyeOff size={20} aria-hidden="true" />,
          title: "السرية التامة",
          content: "بصفتنا خدمة ليموزين فاخرة، فإننا نضع سرية ضيوفنا في مقدمة أولوياتنا. لا نقوم مطلقاً بالكشف عن هويات عملائنا الـ VIP، أو مواقع تقلهم، أو وجهاتهم لأي أطراف ثالثة."
        },
        {
          icon: <Database size={20} aria-hidden="true" />,
          title: "جمع البيانات",
          content: "نحن نجمع فقط المعلومات الأساسية المطلوبة لإتمام الحجز: الاسم، ورقم الاتصال، والبريد الإلكتروني، وتفاصيل الرحلة. وتُستخدم هذه البيانات حصرياً لتسهيل تجربة النقل الفاخرة الخاصة بك."
        },
        {
          icon: <Smartphone size={20} aria-hidden="true" />,
          title: "نظام الـ GPS وتتبع السلامة",
          content: "جميع مركباتنا مجهزة بنظام تتبع GPS مباشر لضمان السلامة والدعم اللوجستي. هذه البيانات مشفرة بالكامل ولا يمكن الوصول إليها إلا من قبل مركز التحكم لدينا لضمان أمن الركاب والوصول الدقيق."
        },
        {
          icon: <Lock size={20} aria-hidden="true" />,
          title: "المدفوعات الآمنة",
          content: "يتم معالجة جميع المعاملات المالية من خلال بوابات دفع مشفرة ومتوافقة مع معايير PCI العالمية. لا تقوم شركة VIP LIMO بتخزين تفاصيل بطاقتك الائتمانية على خوادمنا المحلية."
        }
      ]
    }
  };

  const t = dict[locale] || dict.en;

  return (
    <main className="bg-white min-h-screen pb-24" dir={isAr ? 'rtl' : 'ltr'}>
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
            {isAr ? <ChevronRight size={14} aria-hidden="true" /> : <ChevronLeft size={14} aria-hidden="true" />}
            {t.backHome}
          </Link>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-6">
            {isAr ? (
              <>
                {t.titleMain} <span className="text-[#C5A25D]">{t.titleSub}</span>
              </>
            ) : (
              <>
                {t.titleMain} <span className="text-[#C5A25D]">{t.titleSub}</span>
              </>
            )}
          </h1>
          <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">
            {t.badge}
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
              <h2 className="text-xl font-black italic uppercase text-slate-900">{t.cardTitle}</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.cardSub}</p>
            </div>
          </div>

          <div className="space-y-16">
            <div className="prose prose-slate max-w-none">
              <p className={`text-slate-600 leading-relaxed italic py-2 
                ${isAr ? 'border-r-2 border-[#C5A25D] pr-6 pl-0' : 'border-l-2 border-[#C5A25D] pl-6 pr-0'}`}
              >
                {t.introQuote}
              </p>
            </div>

            {/* Rendered as an unordered list for Semantic HTML Layout */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 m-0 p-0">
              {t.policies.map((item, index) => (
                <li key={index} className="space-y-4 list-none m-0 p-0">
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
              {t.footerText}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}