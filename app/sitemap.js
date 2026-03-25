import MOCK_DATA from '../lib/mockData';

export default async function sitemap() {
  const baseUrl = 'https://viplimoegypt.com';

  // 1. Generate URLs for all vehicles in your fleet
  const vehicleUrls = MOCK_DATA.fleet.map((car) => ({
    url: `${baseUrl}/fleet/${car.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 2. Define your static main pages
  const routes = ['', '/fleet', '/terms', '/privacy'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.7, // Home page is highest priority
  }));

  return [...routes, ...vehicleUrls];
}