import { UtdzHomePage } from '@/components/utdz/home-page';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;

  return constructMetadata({
    title: 'Universal Tower Defense Z Wiki - Codes, Units & Update 4',
    description:
      'UTDZ Wiki for Update 4 codes, units, tier decisions, Summer Event, Spider Extraction, Crime Fighting, traits, relics, and guides.',
    locale,
    pathname: '',
  });
}

export default function HomePage() {
  return <UtdzHomePage />;
}
