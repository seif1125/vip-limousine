import FleetClient from '../../components/fleet/FleetClient';
import { Suspense } from 'react';
import { getAllFleet } from '@/lib/api';

export const metadata = {
  title: 'Luxury Fleet Selection | VIP Limousine Egypt',
  description: 'Browse our elite fleet of chauffeur-driven Mercedes, BMW, and luxury SUVs in Cairo. Best rates for airport transfers and executive travel.',
  alternates: { canonical: 'https://viplimoegypt.com/fleet' }
};

export default async function FleetPage() {
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
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://viplimoegypt.com" },
              { "@type": "ListItem", "position": 2, "name": "Fleet", "item": "https://viplimoegypt.com/fleet" }
            ]
          })
        }}
      />
     <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading Fleet...</div>}>
        <FleetPromise dataPromise={fleetData} />
      </Suspense>
    </>
  );
}
function FleetPromise({ dataPromise }) {
  const allCars= dataPromise;
  return <FleetClient allCars={allCars} />;
}