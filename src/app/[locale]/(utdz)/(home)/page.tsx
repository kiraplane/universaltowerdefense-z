import { UtdzHomePage } from '@/components/utdz/home-page';
import { LocalizedCorePage } from '@/components/utdz/localized-core-page';
import { getLocalizedCoreCopy } from '@/data/utdz/localized-core';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const localized = getLocalizedCoreCopy(locale, 'home');

  return constructMetadata({
    title:
      localized?.title ??
      'Universal Tower Defense Z Wiki - Codes, Units & Update 4',
    description:
      localized?.description ??
      'UTDZ Wiki for Update 4 codes, units, tier decisions, Summer Event, Spider Extraction, Crime Fighting, traits, relics, and guides.',
    locale,
    pathname: '',
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (locale !== 'en') return <LocalizedCorePage locale={locale} pageKey="home" />;
  return <UtdzHomePage />;
}
