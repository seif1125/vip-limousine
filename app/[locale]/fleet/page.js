import FleetClient from '@/components/fleet/FleetClient';
import { Suspense } from 'react';
import { getAllFleet } from '@/lib/api';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FleetPage' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: { canonical: `https://viplimoegypt.com/${locale}/fleet` }
  };
}

export default async function FleetPage({ params }) {
  const { locale } = await params;
  // Ensure locale is set for the current request
  setRequestLocale(locale);
  
  const t = await getTranslations('FleetPage');
  const fleetData = await getAllFleet();

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": t('breadcrumbs.home'), "item": `https://viplimoegypt.com/${locale}` },
              { "@type": "ListItem", "position": 2, "name": t('breadcrumbs.fleet'), "item": `https://viplimoegypt.com/${locale}/fleet` }
            ]
          })
        }}
      />
      
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
        <FleetPromise dataPromise={fleetData} />
      </Suspense>
    </>
  );
}

function FleetPromise({ dataPromise }) {
  // Assuming allCars already contains the localized _en/_ar fields
  return <FleetClient allCars={dataPromise} />;
}