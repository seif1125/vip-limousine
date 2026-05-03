import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700', '900'], display: 'swap' });

const locales = ['en', 'ar'];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app-settings`, { next: { revalidate: 3600 } });
    const { data } = await res.json();
    const meta = data.appSettings.metadata;

    return {
      metadataBase: new URL(meta.domainUrl),
      title: { default: meta.defaultTitle, template: meta.titleTemplate },
      description: meta.description,
    };
  } catch (error) {
    return { title: "VIP Limousine Egypt" }; 
  }
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  // SAFEGUARD: If an invalid locale slips through middleware, default to 'en' 
  // so the layout doesn't crash while trying to fetch missing translation files.
  const validLocale = locales.includes(locale) ? locale : 'en';

  // Fetch translations based on the validated locale
  const messages = await getMessages();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app-settings`, { next: { revalidate: 3600 } });
  const { data } = await res.json();
  const { appSettings, contactSettings } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": appSettings.schemaData.businessType,
    "name": appSettings.schemaData.businessName,
  };

  return (
    <html lang={validLocale} dir={validLocale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${montserrat.className} bg-slate-50 text-[#0F172A] antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        
        <NextIntlClientProvider messages={messages}>
          <Header settings={contactSettings} locale={validLocale} />
          <main>{children}</main>
          <Footer settings={contactSettings} locale={validLocale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}