import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700', '900'], display: 'swap' });

  export const metadata = {
    metadataBase: new URL('https://viplimoegypt.com'), // Replace with your domain
    title: {
      default: "VIP Limousine Egypt | Egypt's NO:1 Limousine service",
      template: '%s | VIP Limousine Egypt'
    },
    description: 'Premium chauffeur services in Cairo, Alexandria, and the New Capital. Luxury fleet including Mercedes S-Class and Maybach for executives.',
    keywords: ['Cairo Airport Transfer', 'Limousine Service Egypt', 'Chauffeur Cairo', 'Luxury Car Rental Egypt'],
    openGraph: {
      title: 'VIP Limousine Egypt',
      description: "Egypt's NO:1 Limousine service",
      url: 'https://viplimoegypt.com',
      siteName: 'VIP Limousine',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
  };


export default function RootLayout({ children }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "VIP Limousine Egypt",
    "description": "Premium English-speaking chauffeur services for international guests in Egypt.",
    "areaServed": ["Cairo", "Giza", "New Capital", "Alexandria"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Limousine Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Airport Meet & Greet" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Executive Business Travel" } }
      ]
    }
  };

  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-slate-50 text-[#0F172A] antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}