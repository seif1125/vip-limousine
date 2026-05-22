import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
  
  // Used when no locale matches
  defaultLocale: 'en', // <--- Change this from 'ar' to 'en'
  
  // Optional: If you don't want '/en' to show in the URL bar for the default language
  localePrefix: 'always', // <--- Change this from 'as-needed' to 'always'
});

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};