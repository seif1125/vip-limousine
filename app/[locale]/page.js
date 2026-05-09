import { Suspense } from 'react';
import { getBanners, getFeaturedFleet, getTestimonials } from '@/lib/api';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import FeaturedCars from '@/components/home/FeaturedCars';
import Testimonials from '@/components/home/Testimonials';

/**
 * SEO: Enhanced Structured Data
 * This should ideally be moved to a separate metadata utility 
 * but kept here for component-level clarity.
 */
const generateJsonLd = (domain = "https://viplimoegypt.com") => ({
  "@context": "https://schema.org",
  "@type": "CarLimousine",
  "name": "VIP Limousine Egypt",
  "url": domain,
  "logo": `${domain}/logo.png`,
  "image": `${domain}/og-image.jpg`,
  "description": "Premium chauffeur and luxury car Limousine services in Cairo, Giza, and across Egypt.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cairo",
    "addressCountry": "EG"
  },
  "openingHours": "Mo-Su 00:00-23:59",
  "telephone": "+201222708033",
  "priceRange": "$$$"
});

export default async function HomePage() {
  // Parallel Fetching: Triggers all requests in one tick
  const bannerPromise = getBanners();
  const fleetPromise = getFeaturedFleet();
  const testimonialPromise = getTestimonials();

  return (
    <>
      {/* SEO: Script placement at the top of the fragment */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd()) }}
      />

      <main id="main-content">
        {/* 1. HERO: Critical for Largest Contentful Paint (LCP) */}
        {/* We use a height-stable fallback to prevent CLS */}
        <section aria-label="Introduction">
          <Suspense fallback={<div className="h-[80vh] w-full bg-[#0F172A] animate-pulse" />}>
            <HeroWrapper dataPromise={bannerPromise} />
          </Suspense>
        </section>

        {/* 2. ABOUT: Static and highly accessible for Screen Readers */}
        <About />

        {/* 3. FEATURED FLEET: Lazy loaded with ARIA landmarks */}
        <section 
          className="py-24 bg-slate-50" 
          aria-labelledby="fleet-heading"
        >
          <div className="max-w-7xl mx-auto px-6">
            <header className="mb-12 text-center">
              {/* <h2 id="fleet-heading" className="text-3xl md:text-4xl font-black text-[#0F172A]">
                Our Featured Fleet
              </h2> */}
            </header>
            
            <Suspense fallback={<FleetSkeleton />}>
              <FleetWrapper dataPromise={fleetPromise} />
            </Suspense>
          </div>
        </section>

        {/* 4. TESTIMONIALS */}
        <section aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" className="sr-only">Customer Reviews</h2>
          <Suspense fallback={<TestimonialSkeleton />}>
            <TestimonialsWrapper dataPromise={testimonialPromise} />
          </Suspense>
        </section>
      </main>
    </>
  );
}

/** * Data Wrappers with basic error handling 
 * to ensure one failing API doesn't kill the whole page.
 */

async function HeroWrapper({ dataPromise }) {
  try {
    const data = await dataPromise;
    return <Hero banners={data || []} priority={true} />; 
  } catch (error) {
    return <div className="h-[60vh] flex items-center justify-center bg-[#0F172A] text-white">VIP Limousine Egypt</div>;
  }
}

async function FleetWrapper({ dataPromise }) {
  try {
    const data = await dataPromise;
    return <FeaturedCars featuredCars={data || []} />;
  } catch (error) {
    console.error("Fleet fetch error:", error);
    return null; // Silently fail or show alternative
  }
}

async function TestimonialsWrapper({ dataPromise }) {
  try {
    const data = await dataPromise;
    return <Testimonials testimonials={data || []} />;
  } catch (error) {
    return null;
  }
}

/**
 * Skeletons: Improved for Visual Consistency
 */

function FleetSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-4">
          <div className="h-[300px] bg-slate-200 animate-pulse rounded-3xl" />
          <div className="h-6 w-1/2 bg-slate-200 animate-pulse rounded" />
          <div className="h-4 w-full bg-slate-200 animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="h-64 bg-slate-100 animate-pulse m-6 rounded-[2.5rem] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#C5A25D]/20 border-t-[#C5A25D] rounded-full animate-spin" />
    </div>
  );
}