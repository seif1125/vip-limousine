import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Montserrat } from 'next/font/google';
import api from '@/lib/api';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700', '900'], display: 'swap' });

// DYNAMIC METADATA
export async function generateMetadata() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app-settings`, { next: { revalidate: 3600 } });
    const { data } = await res.json();
    const meta = data.appSettings.metadata;

    return {
      metadataBase: new URL(meta.domainUrl),
      title: {
        default: meta.defaultTitle,
        template: meta.titleTemplate
      },
      description: meta.description,
      keywords: meta.keywords,
      openGraph: {
        title: meta.defaultTitle,
        description: meta.description,
        url: meta.domainUrl,
        images: [{ url: meta.ogImage }],
      },
    };
  } catch (error) {
    return { title: "VIP Limousine Egypt" }; // Fallback
  }
}

export default async function RootLayout({ children }) {
  // Fetch settings once for the entire app
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app-settings`, { 
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  const { data } = await res.json();
  
  const { appSettings, contactSettings } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": appSettings.schemaData.businessType,
    "name": appSettings.schemaData.businessName,
    "areaServed": appSettings.schemaData.areaServed,
    "description": appSettings.metadata.description
  };

  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-slate-50 text-[#0F172A] antialiased`}>
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
        {/* Pass data to Client Components as props */}
        <Header settings={contactSettings} />
        <main>{children}</main>
        <Footer settings={contactSettings} />
      </body>
    </html>
  );
}