import { Suspense } from 'react';
import { getBanners, getFeaturedFleet, getTestimonials } from '@/lib/api';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import FeaturedCars from '@/components/home/FeaturedCars';
import Testimonials from '@/components/home/Testimonials';

// SEO: Structured Data for Google
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CarRental",
  "name": "VIP Limousine Egypt",
  "description": "Premium chauffeur and car rental services in Egypt.",
  "areaServed": "Egypt",
  "priceRange": "$$"
};

export default async function HomePage() {
  // Parallel Fetching: Start all requests simultaneously
  const bannerPromise = getBanners();
  const fleetPromise = getFeaturedFleet();
  const testimonialPromise = getTestimonials();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO: Critical for LCP */}
      <Suspense fallback={<div className="h-[85vh] bg-[#0F172A] animate-pulse" />}>
        <HeroPromise dataPromise={bannerPromise} />
      </Suspense>

      {/* 2. ABOUT: Static/Instant */}
      <About />

      {/* 3. FEATURED FLEET */}
      <section className="py-24 bg-slate-50" aria-labelledby="fleet-heading">
        <div className="max-w-7xl mx-auto px-6">
          <Suspense fallback={<FleetSkeleton />}>
            <FleetPromise dataPromise={fleetPromise} />
          </Suspense>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <Suspense fallback={<div className="h-64 bg-slate-100 animate-pulse m-6 rounded-3xl" />}>
        <TestimonialsPromise dataPromise={testimonialPromise} />
      </Suspense>
    </main>
  );
}

// Sub-components for streaming
async function HeroPromise({ dataPromise }) {
  const data = await dataPromise;
  return <Hero banners={data} />;
}

async function FleetPromise({ dataPromise }) {
  const data = await dataPromise;
  return <FeaturedCars featuredCars={data} />;
}

async function TestimonialsPromise({ dataPromise }) {
  const data = await dataPromise;
  return <Testimonials testimonials={data} />;
}

function FleetSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="h-[500px] bg-slate-200 animate-pulse rounded-[2.5rem]" />
      <div className="h-[500px] bg-slate-200 animate-pulse rounded-[2.5rem]" />
    </div>
  );
}