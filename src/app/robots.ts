import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://noticiasmundial.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/admin/*'], // Protect admin interfaces from indexation
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
