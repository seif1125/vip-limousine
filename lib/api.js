import axios from 'axios';


// 1. Core Axios Instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// 2. Latency Utility (Simulating real-world DB fetch)
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 3. Optimized Fetchers
export async function getBanners() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, { 
    next: { revalidate: 3600 } 
  });
  if (!res.ok) return [];
  const data = await res.json();
 // console.log('banners from API:', data);
  return data; // Assumes your API returns the array directly
}

export const getFeaturedFleet = async () => {
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/featured`);
const data=await res.json()
console.log('data from API:',process.env.NEXT_PUBLIC_API_URL ,data);
return data// Assumes your API returns the array directly
}
export const getAllFleet = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/available`);
  if (!res.ok) return [];
  const data = await res.json();
  console.log('fleet from API:', data);
  return data; // Assumes your API returns the array directly
}

export const getTestimonials = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`);
  if (!res.ok) return [];
  const data = await res.json();
  console.log('testimonials from API:', data);
  return data; // Assumes your API returns the array directly
}
export async function getFilteredFleet(params) {
  const query = new URLSearchParams({
    page: params.page || 1,
    limit: 12,
    q: params.q || '',
    category: params.category || '',
    featured: params.featured || ''
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/search?${query}`, {
    next: { revalidate: 3600 } // Cache for 1 hour for SEO
  });
  
  return res.json(); 
  // Should return: { cars: [], totalPages: 5, categories: ["Sedan", "SUV"] }
}
export const getCarBySlug = async (slug) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${slug}`);
  const car = res.ok ? await res.json() : null;
  if (!car) throw new Error("Car not found");
  return car;
};

export const getContactInfo = async () => {
  return MOCK_DATA.socials;
};

export default api;