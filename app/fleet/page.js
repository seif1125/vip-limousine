import FleetClient from '../../components/fleet/FleetClient';
import MOCK_DATA from '@/lib/mockData';

export const metadata = {
  title: 'Luxury Fleet Selection | VIP Limousine Egypt',
  description: 'Browse our elite fleet of chauffeur-driven Mercedes, BMW, and luxury SUVs in Cairo. Best rates for airport transfers and executive travel.',
  alternates: { canonical: 'https://viplimoegypt.com/fleet' }
};

export default function FleetPage() {
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
      <FleetClient fleet={MOCK_DATA.fleet} />
    </>
  );
}