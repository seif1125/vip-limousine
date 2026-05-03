import CarDetailInteractive from '@/components/fleet/CarDetailsInteractive';
import { getAllFleet } from '@/lib/api';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { id, locale } = await params;
  const allCars = await getAllFleet();
  const car = allCars.find((c) => c._id === id); 
  
  if (!car) return { title: "Vehicle Not Found" };
  
  const name = locale === 'ar' ? car.name_ar : car.name_en;
  
  return {
    title: `Rent ${name} | Egypt's NO:1 Limousine service`,
    description: `Book a limousine ${name}. ${car.specs.passengers} passengers, ${car.specs.luggage} luggage capacity.`,
    alternates: { canonical: `https://viplimoegypt.com/${locale}/fleet/${id}` }
  };
}

export default async function CarDetailPage({ params }) {
  const { id, locale } = await params;
  setRequestLocale(locale); // Important for next-intl
  
  const cars = await getAllFleet();
  console.log(cars.find((c) => c._id === id));
  const car = JSON.parse(JSON.stringify(cars.find((c) => c._id === id))); 
  console.log("Fetched car for ID:", id, car);  
  if (!car) return <div className="py-40 text-center font-black uppercase">Vehicle Not Found</div>;

  // Localized variables
  const name = locale === 'ar' ? car.name_ar : car.name_en;
  const desc = locale === 'ar' ? car.description_ar : car.description_en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "image": car.images[0],
    "description": desc,
    "brand": { "@type": "Brand", "name": "VIP Limousine Egypt" },
    "offers": {
      "@type": "Offer",
      "price": car.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `https://viplimoegypt.com/${locale}/fleet/${id}`
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
      />
    </>
  );
}