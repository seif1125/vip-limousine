export default async function sitemap() {
  const baseUrl = 'https://www.viplimousineegypt.com';
  const locales = ['en', 'ar'];

  // 1. Helper function to create localized entries with alternate cross-links (hreflang)
  const createEntry = (path, priority, changeFrequency, lastModified = new Date()) => {
    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(lastModified),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${path}`,
          ar: `${baseUrl}/ar${path}`,
        },
      },
    }));
  };

  // 2. Generate all static pages for both English and Arabic
  const staticPages = [
    ...createEntry('', 1.0, 'weekly'),         // Homepages (/en and /ar)
    ...createEntry('/fleet', 0.8, 'weekly'),   // Fleet listings  // About pages
    ...createEntry('/terms', 0.8, 'yearly'),
    ...createEntry('/privacy', 0.8, 'yearly'),
    // Contact pages
  ];

  try {
    // 3. Fetch your vehicles using your API environment variable
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fleet`);
    
    if (!response.ok) return staticPages;
    const cars = await response.json();

    // 4. Generate entries for every single car in both English and Arabic
    const dynamicFleetPages = cars.flatMap((car) => {
      const slugOrId = car.slug || car._id;
      return createEntry(`/fleet/${slugOrId}`, 0.7, 'monthly', car.updatedAt);
    });

    return [...staticPages, ...dynamicFleetPages];

  } catch (error) {
    console.error("Failed to generate dynamic localized sitemap:", error);
    // Fallback safely to your static localized pages if your API times out
    return staticPages;
  }
}