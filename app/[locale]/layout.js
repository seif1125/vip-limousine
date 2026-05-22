import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['400', '700', '900'], 
  display: 'swap' 
});

const locales = ['en', 'ar'];

// دالة توليد الـ Metadata الديناميكية
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'en';

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app-settings`, { next: { revalidate: 3600 } });
    const { data } = await res.json();
    const meta = data.appSettings.metadata;

    // استخراج الحقول بناءً على اللغة الحالية
    const title = meta[`defaultTitle_${currentLocale}`];
    const template = meta[`titleTemplate_${currentLocale}`];
    const description = meta[`description_${currentLocale}`];
    const keywords = meta[`keywords_${currentLocale}`];

    return {
      metadataBase: new URL(meta.domainUrl),
      title: {
        default: title,
        template: template,
      },
      description: description,
      keywords: keywords,
      icons: {
        icon: '/icon.png',         // Points to your public/icon.png or app/icon.png
        shortcut: '/icon.png',
        apple: '/icon.png',
      },
      openGraph: {
        title: title,
        description: description,
        url: meta.domainUrl,
        siteName: currentLocale === 'ar' ? 'في آي بي ليموزين مصر' : 'VIP Limousine Egypt',
        images: [
          {
            url: meta.ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: currentLocale === 'ar' ? 'ar_EG' : 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: [meta.ogImage],
      },
      alternates: {
        canonical: `${meta.domainUrl}/${currentLocale}`,
        languages: {
          en: `${meta.domainUrl}/en`,
          ar: `${meta.domainUrl}/ar`,
        },
      },
    };
  } catch (error) {
    console.log('error fetching metadata:', error);
    return {
      title: "VIP Limousine Egypt",
      description: "Premium Car Limousine & Chauffeur Services",
    };
  }
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : 'en';

  // جلب الترجمات
  const messages = await getMessages();

  // جلب بيانات الإعدادات
  let appSettings = null;
  let contactSettings = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app-settings`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const response = await res.json();
      appSettings = response.data.appSettings;
      contactSettings = response.data.contactSettings;
    }
  } catch (error) {
    console.error("Layout Fetch Error:", error);
  }

  // إعداد الـ JSON-LD Schema
  const schema = appSettings?.schemaData;
  const metadata = appSettings?.metadata;
  
  const jsonLd = schema ? {
    "@context": "https://schema.org",
    "@type": schema.businessType,
    "name": schema[`businessName_${validLocale}`],
    "description": metadata[`description_${validLocale}`],
    "title": metadata[`defaultTitle_${validLocale}`],
    "url": metadata.domainUrl,
    "logo": `${metadata.domainUrl}/logo.png`,
    "image": metadata.ogImage,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": validLocale === 'ar' ? "القاهرة" : "Cairo",
      "addressCountry": "EG"
    },
    "areaServed": schema[`areaServed_${validLocale}`]?.map(area => ({
      "@type": "City",
      "name": area
    })),
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": contactSettings?.phones?.hotline,
      "contactType": "customer service",
      "availableLanguage": ["Arabic", "English"]
    }
  } : null;

  return (
    <html lang={validLocale} dir={validLocale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${montserrat.className} bg-slate-50 text-[#0F172A] antialiased`}>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}

        <NextIntlClientProvider messages={messages}>
          <Header settings={contactSettings} locale={validLocale} />
          <main>{children}</main>
          <Footer settings={contactSettings} locale={validLocale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}