import type { MetadataRoute } from 'next';
import { getCanonicalBaseUrl } from '../lib/urls/urls';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/*',
        '/_next/*',
        '/settings/*',
        '/dashboard/*',
        '/auth/*',
      ],
    },
    sitemap: `${getCanonicalBaseUrl()}/sitemap.xml`,
  };
}
