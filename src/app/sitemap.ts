import { guides } from '@/data/utdz/guides';
import { units } from '@/data/utdz/units';
import { Routes } from '@/routes';
import type { MetadataRoute } from 'next';
import { routing } from '../i18n/routing';
import { getCanonicalBaseUrl } from '../lib/urls/urls';

const coreRoutes = [
  Routes.Root,
  Routes.Codes,
  Routes.TierList,
  Routes.Units,
  Routes.Traits,
  Routes.Relics,
  Routes.Updates,
  Routes.BestTeam,
  Routes.Guides,
  Routes.Download,
  Routes.PrivacyPolicy,
  Routes.TermsOfService,
  Routes.CookiePolicy,
  Routes.Disclaimer,
];

const guideRoutes = guides.map((guide) => `/guides/${guide.slug}`);
const unitRoutes = units.map((unit) => `/units/${unit.slug}`);
const archiveRoutes = ['/updates/universal-fest-p2'];
const stableLastModified = new Date('2026-08-24T00:00:00.000Z');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapList: MetadataRoute.Sitemap = [];
  const baseUrl = getCanonicalBaseUrl();

  routing.locales.forEach((locale) => {
    [...coreRoutes, ...archiveRoutes, ...guideRoutes, ...unitRoutes].forEach(
      (route) => {
        const localizedRoute =
          locale === routing.defaultLocale ? route : `/${locale}${route}`;

        sitemapList.push({
          url: `${baseUrl}${localizedRoute}`,
          lastModified: stableLastModified,
          changeFrequency:
            route === Routes.Root ||
            route === Routes.Codes ||
            route === Routes.Updates
              ? 'daily'
              : 'weekly',
          priority:
            route === Routes.Root
              ? 1
              : route === Routes.Codes ||
                  route === Routes.Download ||
                  route === Routes.TierList
                ? 0.9
                : route.startsWith('/guides/') || route.startsWith('/units/')
                  ? 0.85
                  : 0.8,
        });
      }
    );
  });

  return sitemapList;
}
