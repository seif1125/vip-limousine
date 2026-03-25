import MOCK_DATA from '@/lib/mockData';
import CarDetailInteractive from '../../../components/fleet/CarDetailsInteractive';

// 1. Dynamic Metadata Generation for Search Engines
export async function generateMetadata({ params }) {
  const { id } = await params;
  const car = MOCK_DATA.fleet.find((c) => c.id === id);

  if (!car) return { title: "Vehicle Not Found" };

  return {
    title: `Rent ${car.name} | Egypt's NO:1 Limousine service`,
    description: `Book a limousine ${car.name}. ${car.specs.passengers} passengers, ${car.specs.luggage} luggage capacity. Elite travel in Cairo & New Capital.`,
    openGraph: {
      images: [car.images[0]],
    },
  };
}

export default async function CarDetailPage({ params }) {
  const { id } = await params; 
  const car = MOCK_DATA.fleet.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="py-40 text-center font-black uppercase tracking-widest text-slate-400">
        Vehicle Not Found
      </div>
    );
  }

  // 2. Structured Data (JSON-LD) defined inside the component so it has access to 'car'
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": car.name,
    "image": car.images[0],
    "description": car.description,
    "brand": { "@type": "Brand", "name": "VIP Limousine Egypt" },
    "offers": {
      "@type": "Offer",
      "price": car.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `https://viplimoegypt.com/fleet/${car.id}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120"
    }
  };

  return (
    <>
      {/* Injecting the JSON-LD for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      

      <CarDetailInteractive 
        car={car} 
        socials={MOCK_DATA.socials} 
        reservations={MOCK_DATA.reservations} 
      />
    </>
  );
}