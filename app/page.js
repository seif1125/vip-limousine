import { Suspense } from 'react';
import { getBanners, getFeaturedFleet } from '@/lib/api';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import FeaturedCars from '@/components/home/FeaturedCars';
import Testimonials from '@/components/home/Testimonials';

// Loading states for performance
const Skeleton = ({ h }) => <div className={`${h} bg-slate-200 animate-pulse rounded-[32px]`} />;

export default async function HomePage() {
  // Parallel Fetching
  const bannerData = getBanners();
  const fleetData = getFeaturedFleet();

  return (
    <main>
      {/* 1. HERO SLIDER */}
      <Suspense fallback={<div className="h-[85vh] bg-navy-950 animate-pulse" />}>
        <HeroPromise dataPromise={bannerData} />
      </Suspense>

      {/* 2. ABOUT (Instant) */}
      <About />

      {/* 3. FEATURED FLEET */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-12 space-y-2">
 
          </header>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Skeleton h="h-96" /><Skeleton h="h-96" /><Skeleton h="h-96" />
            </div>
          }>
            <FleetPromise dataPromise={fleetData} />
          </Suspense>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <Suspense fallback={<Skeleton h="h-64 mx-6 mb-24" />}>
        <Testimonials />
      </Suspense>
    </main>
  );
}

// Wrapper components to handle the Promises
async function HeroPromise({ dataPromise }) {
  const banners = await dataPromise;
  return <Hero banners={banners} />;
}

async function FleetPromise({ dataPromise }) {
  const cars = await dataPromise;
  return <FeaturedCars cars={cars} />;
}