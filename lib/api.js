import axios from 'axios';
import MOCK_DATA  from './mockData';

// 1. Core Axios Instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// 2. Latency Utility (Simulating real-world DB fetch)
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 3. Optimized Fetchers
export const getBanners = async () => {
  await wait(800); // Latency for Hero
  // Actual API call: const { data } = await api.get('/banners'); return data;
  return MOCK_DATA.banners;
};

export const getFeaturedFleet = async () => {
  await wait(1500); // Latency for Cards
  return MOCK_DATA.fleet.filter(car => car.featured);
};

export const getCarBySlug = async (slug) => {
  await wait(500);
  const car = MOCK_DATA.topFleets.find(c => c.slug === slug);
  if (!car) throw new Error("Car not found");
  return car;
};

export const getContactInfo = async () => {
  return MOCK_DATA.socials;
};

export default api;