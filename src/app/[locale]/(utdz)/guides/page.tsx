import Container from '@/components/layout/container';
import { JsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaqSection } from '@/components/utdz/faq-section';
import { guides } from '@/data/utdz/guides';
import { officialGameFacts } from '@/data/utdz/sources';
import { LocaleLink } from '@/i18n/navigation';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import Image from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: 'Universal Tower Defense Z Guides - Codes, Units, Traits and Events',
    description:
      'Universal Tower Defense Z guides for Update 4, beginner progression, new units, Spider Extraction, Synchros, traits, relics, teams, and active codes.',
    locale,
    pathname: '/guides',
  });
}

export default function GuidesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Universal Tower Defense Z Guides',
    numberOfItems: guides.length,
    itemListElement: guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title,
      url: `${officialGameFacts.canonicalUrl}/guides/${guide.slug}`,
    })),
  };

  return (
    <div className="bg-[#080607] py-12 text-[#F8FAFC]">
      <JsonLd data={jsonLd} />
      <Container className="space-y-8 px-4">
        <header className="max-w-3xl space-y-4">
          <Badge className="bg-[#E23A2E] text-[#120707]">Guides</Badge>
          <h1 className="font-display text-4xl font-black md:text-6xl">
            Universal Tower Defense Z Guides
          </h1>
          <p className="text-lg leading-8 text-[#D8CCC7]">
            Start with short-answer UTDZ guides for codes, beginner progression,
            Update 4, beginner progression, new units, Spider Extraction,
            Synchros, trait rerolls, team building, and current codes.
          </p>
        </header>

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-white">
            How to use these guides
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-[#B8AAA5] md:grid-cols-3">
            <p>1. Read the quick verdict before changing your lineup.</p>
            <p>2. Match advice to your blocker: unit, trait, relic, or mode.</p>
            <p>3. Use links to compare codes, tier list, units, and traits.</p>
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              className="overflow-hidden rounded-lg border border-[#322123] bg-[#151011] shadow-sm"
            >
              <div className="relative aspect-video border-[#322123] border-b bg-[#100B0C]">
                {guide.coverImageUrl || guide.video?.thumbnailUrl ? (
                  <Image
                    src={guide.coverImageUrl || guide.video?.thumbnailUrl || ''}
                    alt={`${guide.title} cover`}
                    fill
                    sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col justify-end p-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F4B942]">
                      UTDZ Guide
                    </span>
                    <span className="mt-2 text-2xl font-black text-white">
                      {guide.category}
                    </span>
                  </div>
                )}
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <Badge className="bg-[#F4B942] text-[#120707]">
                    {guide.video ? 'Video Guide' : 'Guide'}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-[#F4B942] text-[#120707]">
                    {guide.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-[#5A3A36] text-white"
                  >
                    {guide.difficulty}
                  </Badge>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-white">
                  {guide.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#B8AAA5]">
                  {guide.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {guide.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-[#5A3A36] text-[#D8CCC7]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="mt-5 bg-[#E23A2E] text-[#120707]">
                  <LocaleLink href={`/guides/${guide.slug}`}>
                    Read guide
                  </LocaleLink>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <FaqSection
          items={[
            {
              question: 'Which UTDZ guide should beginners read first?',
              answer:
                'Start with the beginner guide, then open codes, tier list, units, and traits before spending early rewards.',
            },
            {
              question: 'Which guide covers Update 4 first?',
              answer:
                'Open the Update 4 overview first, then use the new units, Summer Event, Spider Extraction, and Synchros guides for the system blocking you.',
            },
            {
              question: 'Which guide helps with rerolls?',
              answer:
                'Read Trait Reroll Strategy before using premium Trait Rerolls on a unit you may not keep.',
            },
            {
              question: 'Do guides replace the unit database?',
              answer:
                'No. Guides explain decisions; unit pages hold structured role, trait, relic, and priority notes.',
            },
          ]}
        />
      </Container>
    </div>
  );
}
