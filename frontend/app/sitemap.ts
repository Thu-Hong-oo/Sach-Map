import type { MetadataRoute } from 'next';

const routes = ['/', '/vi', '/en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sachmap.vn';

  return routes.map((route) => ({
    url: `${baseUrl}${route === '/' ? '' : route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
