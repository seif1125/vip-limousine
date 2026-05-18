// app/terms/page.js
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Scale, Clock, Ban, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';

// 1. Dynamic Localized SEO Metadata for Server Components
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr ? 'الشروط والأحكام | VIP Limousine Egypt' : 'Terms & Conditions | VIP Limousine Egypt',
    description: isAr 
      ? 'راجع سياسات الحجز، شروط الدفع، وإرشادات السفر التنفيذي. تضمن شركة VIP Limousine Egypt نقلاً فاخراً آمناً وموثوقاً.'
      : 'Review our booking policies, payment terms, and executive travel guidelines. VIP Limousine Egypt guarantees safe and reliable luxury transport.',
    alternates: {
      canonical: 'https://viplimoegypt.com/terms',
    }
  };
}

export default async function TermsPage({ params }) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  // Fetch application context settings
  let emails = { supportMail: "info@viplimoegypt.com" };
  let phones = { hotline: "12345" };
  
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/app-settings');
    const data = await res.json();
    if (data?.data?.contactSettings) {
      emails = data.data.contactSettings.emails || emails;
      phones = data.data.contactSettings.phones || phones;
    }
  } catch (error) {
    console.error("Failed to fetch contact settings:", error);
  }

  // 2. Localized Structured Data for Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": isAr ? "الشروط والأحكام - VIP Limousine Egypt" : "Terms and Conditions - VIP Limousine Egypt",
    "description": isAr ? "الاتفاقية العامة والإطار القانوني للسفر الفاخر في مصر." : "General agreement and legal framework for elite travel in Egypt.",
    "url": "https://viplimoegypt.com/terms"
  };

  // 3. Translation Dictionaries
  const dict = {
    en: {
      backHome: "Back to Home",
      titleMain: "Terms",
      titleSub: "Conditions",
      badge: "Last Updated: March 2026 • VIP Limousine Egypt",
      cardTitle: "General Agreement",
      cardSub: "Legal framework for elite travel",
      intro: "By utilizing the services of VIP LIMO Egypt, you agree to comply with the following terms and conditions. These policies ensure the highest level of safety, luxury, and reliability for all our distinguished guests.",
      clarificationTitle: "Need Clarification?",
      clarificationText: "If you have questions regarding our executive travel policies or require a customized corporate contract, please reach out to our legal department.",
      footerText: "VIP LIMO EGYPT — Authorized Executive Transportation",
      sections: [
        {
          icon: <Clock size={20} aria-hidden="true" />,
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
      ]
    },
    ar: {
      backHome: "العودة إلى الرئيسية",
      titleMain: "الشروط",
      titleSub: "والأحكام",
      badge: "آخر تحديث: مارس ٢٠٢٦ • VIP Limousine Egypt",
      cardTitle: "الاتفاقية العامة",
      cardSub: "الإطار القانوني لخدمات السفر الفاخر",
      intro: "باستخدامك لخدمات VIP LIMO Egypt، فإنك توافق على الالتزام بالشروط والأحكام التالية. تضمن هذه السياسات أعلى مستويات الأمان والرفاهية والموثوقية لجميع ضيوفنا المتميزين.",
      clarificationTitle: "هل تحتاج إلى توضيح؟",
      clarificationText: "إذا كانت لديك أي أسئلة بخصوص سياسات السفر التنفيذية لدينا أو كنت بحاجة إلى عقد مخصص للشركات، يرجى التواصل مع الإدارة القانونية لدينا.",
      footerText: "VIP LIMO EGYPT — النقل التنفيذي المعتمد",
      sections: [
        {
          icon: <Clock size={20} aria-hidden="true" />,
          title: "الحجوزات والإلغاء",
          content: "يجب إجراء الحجوزات قبل ٢٤ ساعة على الأقل لضمان التوفر. قد تخضع الإلغاءات التي تتم خلال ١٢ ساعة من وقت النقل المحدد لرسوم إلغاء بنسبة ٥٠٪. سيتم فرض الأجرة كاملة في حالة عدم الحضور."
        },
        {
          icon: <CreditCard size={20} aria-hidden="true" />,
          title: "شروط الدفع",
          content: "نقبل جميع بطاقات الائتمان الرئيسية، والتحويلات البنكية، والمدفوعات النقدية. بالنسبة لحسابات الشركات، تكون دورات الفوترة شهرية. جميع الأسعار تشمل تكاليف الوقود وخدمات السائق المحترف ما لم ينص على خلاف ذلك."
        },
        {
          icon: <ShieldCheck size={20} aria-hidden="true" />,
          title: "سلوك الركاب",
          content: "تحتفظ VIP LIMO بالحق في إنهاء أي خدمة دون رد المبالغ المدفوعة إذا اعتبر السائق سلوك الراكب غير منضبط أو غير آمن. التدخين والمواد غير القانونية محظورة تماماً داخل جميع المركبات."
        },
        {
          icon: <Ban size={20} aria-hidden="true" />,
          title: "الأضرار والمسؤولية",
          content: "العميل مسؤول مسؤولية كاملة عن أي أضرار تلحق بالمركبة من قبله أو من قبل ضيوفه (خارج نطاق الاستهلاك الطبيعي). نحن لسنا مسؤولين عن أي تأخيرات ناتجة عن ظروف خارجة عن إرادتنا، مثل الأحوال الجوية القاسية أو إغلاق الطرق."
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

      {/* Header Section */}
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
            {t.titleMain} <span className="text-[#C5A25D]">{t.titleSub}</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">
            {t.badge}
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
              <h2 className="text-xl font-black italic uppercase text-slate-900">{t.cardTitle}</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.cardSub}</p>
            </div>
          </div>

          <div className="space-y-12">
            <p className="text-slate-600 leading-relaxed italic">
              {t.intro}
            </p>

            {/* Content List Block Layout */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 m-0 p-0">
              {t.sections.map((section, index) => (
                <li key={index} className="space-y-4 list-none m-0 p-0">
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

            {/* Assistance Segment */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 mt-12">
              <h3 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                {t.clarificationTitle}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                {t.clarificationText}
              </p>
              <div className="flex flex-wrap gap-6">
                {emails?.supportMail && (
                  <Link 
                    href={`mailto:${emails.supportMail}`} 
                    aria-label={`Email us at ${emails.supportMail}`}
                    className="text-[10px] font-black uppercase tracking-widest text-[#C5A25D] hover:text-slate-900 transition-colors"
                  >
                    {emails.supportMail}
                  </Link>
                )}
                {phones?.hotline && (
                  <Link 
                    href={`tel:${phones.hotline}`} 
                    aria-label={`Call us at ${phones.hotline}`}
                    className="text-[10px] font-black uppercase tracking-widest text-[#C5A25D] hover:text-slate-900 transition-colors"
                  >
                    {phones.hotline}
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
              {t.footerText}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}