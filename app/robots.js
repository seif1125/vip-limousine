export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/api/', // Keep your API routes private
      },
      sitemap: 'https://viplimoegypt.com/sitemap.xml',
    };
  }