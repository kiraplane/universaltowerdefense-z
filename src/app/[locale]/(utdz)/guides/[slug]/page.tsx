import Container from '@/components/layout/container';
import { JsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { FaqSection } from '@/components/utdz/faq-section';
import { getGuide, guides } from '@/data/utdz/guides';
import { officialGameFacts } from '@/data/utdz/sources';
import { LocaleLink } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const relatedRouteLabels: Record<string, string> = {
  '/': 'UTDZ Wiki Home',
  '/best-team': 'Best Team Guide',
  '/codes': 'Active Update 4 Codes',
  '/download': 'Official Roblox Link',
  '/guides/beginner-guide': 'Beginner Guide',
  '/guides/builds-guide': 'Build Planning',
  '/guides/crime-fighting': 'Crime Fighting Guide',
  '/guides/king-sailor-relic-build': 'King Sailor Relic Build',
  '/guides/reroll-strategy': 'Trait Reroll Strategy',
  '/guides/spider-extraction': 'Spider Extraction Guide',
  '/guides/summer-event': 'Summer Event Route',
  '/guides/update-4-new-units': 'Update 4 New Units',
  '/guides/update-4-overview': 'Update 4 Start Guide',
  '/guides/update-4-synchros': 'Update 4 Synchro Guide',
  '/guides/utdx-to-utdz': 'UTDX to UTDZ Explained',
  '/relics': 'Relics Database',
  '/tier-list': 'Tier List Transition',
  '/traits': 'Traits and Rerolls',
  '/units': 'Selected Units',
  '/units/merciless-god': 'Merciless God Profile',
  '/updates/universal-fest-p2': 'Universal Fest Archive',
  '/updates/update-4': 'Current Update 4 Hub',
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    guides.map((guide) => ({ locale, slug: guide.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return constructMetadata({
    title: guide.seoTitle,
    description: guide.seoDescription,
    locale,
    pathname: `/guides/${slug}`,
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const coverImageUrl =
    guide.coverImageUrl ||
    guide.video?.thumbnailUrl ||
    officialGameFacts.heroImage;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: guide.title,
        description: guide.seoDescription,
        dateModified: '2026-07-10',
        image: coverImageUrl.startsWith('http')
          ? coverImageUrl
          : `${officialGameFacts.canonicalUrl}${coverImageUrl}`,
        mainEntityOfPage: `${officialGameFacts.canonicalUrl}/guides/${guide.slug}`,
        publisher: {
          '@type': 'Organization',
          name: officialGameFacts.siteName,
          url: officialGameFacts.canonicalUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: officialGameFacts.siteName,
            item: officialGameFacts.canonicalUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Guides',
            item: `${officialGameFacts.canonicalUrl}/guides`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: guide.title,
            item: `${officialGameFacts.canonicalUrl}/guides/${guide.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="py-8 text-[#F4EDE4] md:py-12">
      <JsonLd data={jsonLd} />
      <Container className="space-y-8 px-0">
        <article className="rounded-lg border border-white/10 bg-[#151011] p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#E23A2E] text-white">{guide.category}</Badge>
            <Badge className="border border-[#F4B942]/40 bg-[#F4B942]/10 text-[#F4B942]">
              {guide.difficulty}
            </Badge>
            {guide.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-white/15 text-[#D8CCC7]"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="mt-5 font-display text-4xl font-black md:text-6xl">
            {guide.title}
          </h1>
          <p className="mt-5 max-w-4xl text-[#D8CCC7] text-lg leading-8">
            {guide.summary}
          </p>

          <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-black">
            <div className="relative aspect-video">
              <Image
                src={coverImageUrl}
                alt={`${guide.title} cover`}
                fill
                priority
                sizes="(min-width: 1024px) 880px, 100vw"
                className="object-cover"
              />
            </div>
            {guide.video ? (
              <div className="bg-[#100B0C] px-4 py-3 text-[#B8AAA5] text-sm">
                Walkthrough cross-check:{' '}
                <a
                  href={guide.video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#F4B942] underline underline-offset-4"
                >
                  {guide.video.title}
                </a>
                {guide.video.channel ? ` by ${guide.video.channel}` : null}
              </div>
            ) : null}
          </div>

          <div className="mt-8 space-y-8">
            {guide.body.map((section, index) => (
              <div key={section.heading} className="space-y-8">
                <section>
                  <h2 className="font-display text-2xl font-bold text-white">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-4 text-[#D8CCC7] text-base leading-8">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-4 space-y-2 text-[#D8CCC7] text-sm leading-7">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>- {bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>

                {index === 1 && guide.video ? (
                  <div className="overflow-hidden rounded-lg border border-white/10 bg-black">
                    <iframe
                      className="aspect-video w-full"
                      src={`https://www.youtube.com/embed/${guide.video.id}?rel=0`}
                      title={guide.video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                    <div className="bg-[#100B0C] px-4 py-3 text-[#B8AAA5] text-sm">
                      Supporting walkthrough · keep live requirements and
                      rewards aligned with the current game UI.
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <FaqSection items={guide.faq} />
          </div>
        </article>

        <section className="rounded-lg border border-white/10 bg-[#151011] p-5">
          <h2 className="font-display text-2xl font-bold text-white">
            Continue your UTDZ route
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {guide.relatedRoutes.map((route) => (
              <LocaleLink
                key={route}
                href={route}
                className="group flex min-w-0 items-center justify-between gap-3 rounded-md border border-white/10 bg-black/15 px-4 py-3 text-[#D8CCC7] text-sm transition hover:border-[#E23A2E]/60 hover:text-white"
              >
                <span className="min-w-0 whitespace-normal break-words text-left">
                  {relatedRouteLabels[route]}
                </span>
                <ArrowRight className="size-4 shrink-0 text-[#F4B942] transition group-hover:translate-x-0.5" />
              </LocaleLink>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
