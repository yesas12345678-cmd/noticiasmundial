import { MetadataRoute } from 'next';
import { pool } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://noticiasmundial.com';

  // Base landing pages and static content
  const routes = ['', '/legal/privacidad', '/legal/cookies', '/legal/aviso-legal', '/legal/autores', '/legal/terminos'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'monthly') as 'daily' | 'monthly',
    priority: route === '' ? 1.0 : 0.4,
  }));

  // Dynamic article URLs from our database
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const { rows } = await pool.query(
      'SELECT id, category, published_at FROM articles WHERE published_at <= NOW() ORDER BY published_at DESC'
    );
    
    articleRoutes = rows.map((article) => ({
      url: `${baseUrl}/?category=${article.category}&article=${article.id}`, // in our Bento UI page we route by search parameters
      lastModified: article.published_at ? new Date(article.published_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (err) {
    console.error('Error fetching articles for sitemap:', err);
  }

  return [...routes, ...articleRoutes];
}
