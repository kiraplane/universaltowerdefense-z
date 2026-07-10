import Container from '@/components/layout/container';
import { JsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeCopyButton } from '@/components/utdz/code-copy-button';
import { FaqSection } from '@/components/utdz/faq-section';
import { activeCodes } from '@/data/utdz/codes';
import { officialGameFacts } from '@/data/utdz/sources';
import { LocaleLink } from '@/i18n/navigation';
import { constructMetadata } from '@/lib/metadata';
import {
  ArrowRight,
  ExternalLink,
  Gem,
  Sparkles,
  Swords,
  Users,
} from 'lucide-react';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import Image from 'next/image';

const updateRoutes = [
  {
    title: 'Summer Event',
    body: 'Turn Summer Currency into one account goal and compare repeatable clears.',
    href: '/guides/summer-event',
    icon: Gem,
  },
  {
    title: 'Update 4 Units',
    body: 'Sort the new roster by acquisition lane and the role your team is missing.',
    href: '/guides/update-4-new-units',
    icon: Users,
  },
  {
    title: 'Spider Extraction',
    body: 'Read the live objective, bring a role-balanced team, and verify progress.',
    href: '/guides/spider-extraction',
    icon: Swords,
  },
  {
    title: 'Crime Fighting',
    body: 'Give every team slot one job and change only the part that failed.',
    href: '/guides/crime-fighting',
    icon: Sparkles,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: 'Universal Tower Defense Z Update 4.0 - UTDZ Guide',
    description:
      'UTDZ Update 4.0 hub for active codes, Summer Event, Spider Extraction, Crime Fighting, new units, synchros, and safe spending.',
    locale,
    pathname: '/updates/update-4',
  });
}

export default function UpdateFourPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Universal Tower Defense Z Update 4.0',
        description:
          'Current UTDZ Update 4 hub for codes, events, modes, units, and build decisions.',
        dateModified: '2026-07-10',
        image: `${officialGameFacts.canonicalUrl}${officialGameFacts.heroImage}`,
        mainEntityOfPage: `${officialGameFacts.canonicalUrl}/updates/update-4`,
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
            name: 'Update 4.0',
            item: `${officialGameFacts.canonicalUrl}/updates/update-4`,
          },
        ],
      },
    ],
  };

  return (
    <div className="py-8 text-[#F4EDE4] md:py-12">
      <JsonLd data={jsonLd} />
      <Container className="space-y-8 px-0">
        <header className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-[#E23A2E] text-white">Current update</Badge>
              <Badge className="border border-[#F4B942]/40 bg-[#F4B942]/10 text-[#F4B942]">
                X → Z rebrand
              </Badge>
            </div>
            <h1 className="font-display text-4xl font-black tracking-normal md:text-6xl">
              Universal Tower Defense Z Update 4.0
            </h1>
            <p className="text-[#D8CCC7] text-lg leading-8">
              Update 4 introduces the UTDZ identity and a fresh decision set:
              five codes, the Summer Event, Spider Extraction, Crime Fighting,
              new units, and new synchro planning.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-[#E23A2E] text-white hover:bg-[#C82E25]"
              >
                <LocaleLink href="/guides/update-4-overview">
                  Read the start guide
                  <ArrowRight className="size-4" />
                </LocaleLink>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#F4B942]/50 bg-transparent text-[#F4B942] hover:bg-[#F4B942] hover:text-[#1B0A08]"
              >
                <a
                  href={officialGameFacts.robloxUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Official Roblox
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black">
            <Image
              src={officialGameFacts.heroImage}
              alt="Universal Tower Defense Z Update 4 artwork"
              fill
              priority
              sizes="(min-width: 1024px) 380px, 100vw"
              className="object-cover"
            />
          </div>
        </header>

        <section className="rounded-lg border border-white/10 bg-[#151011] p-5 md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-semibold text-[#F4B942] text-xs uppercase tracking-[0.18em]">
                Checked July 10
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white">
                Claim these five codes first
              </h2>
            </div>
            <LocaleLink
              href="/codes"
              className="font-semibold text-[#F4B942] text-sm"
            >
              Full rewards and fixes
            </LocaleLink>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {activeCodes.map((code) => (
              <div
                key={code.code}
                className="rounded-md border border-white/10 bg-black/20 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="min-w-0 break-all font-mono font-bold text-white text-xs">
                    {code.code}
                  </p>
                  <CodeCopyButton code={code.code} />
                </div>
                <p className="mt-2 line-clamp-3 text-[#B8AAA5] text-xs leading-5">
                  {code.reward}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {updateRoutes.map((route) => {
            const Icon = route.icon;
            return (
              <LocaleLink
                key={route.href}
                href={route.href}
                className="group rounded-lg border border-white/10 bg-[#151011] p-5 transition hover:border-[#E23A2E]/60"
              >
                <div className="flex items-center justify-between gap-3">
                  <Icon className="size-6 text-[#E23A2E]" />
                  <ArrowRight className="size-4 text-[#F4B942] transition group-hover:translate-x-0.5" />
                </div>
                <h2 className="mt-4 font-display font-bold text-xl text-white">
                  {route.title}
                </h2>
                <p className="mt-2 text-[#B8AAA5] text-sm leading-6">
                  {route.body}
                </p>
              </LocaleLink>
            );
          })}
        </section>

        <article className="space-y-8 rounded-lg border border-white/10 bg-[#151011] p-6 md:p-8">
          <section>
            <h2 className="font-display text-2xl font-bold text-white">
              The rebrand does not reset your Roblox identity
            </h2>
            <div className="mt-3 space-y-4 text-[#D8CCC7] leading-8">
              <p>
                UTDZ uses the same Place ID, Universe ID, and verified creator
                group as the former UTDX page. Keep the account and inventory
                you already have. Use the official IDs to separate current
                guides from copied code lists and similarly named games.
              </p>
              <p>
                Search results will take time to catch up. An X-era source can
                still explain a persistent trait or unit, but codes, events,
                rewards, and rankings need a July Update 4 check.
              </p>
            </div>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-white">
              Do one useful lane before chasing the whole patch
            </h2>
            <div className="mt-3 space-y-4 text-[#D8CCC7] leading-8">
              <p>
                New players should claim codes and establish a story carry.
                Midgame accounts can choose one event or mode route. Established
                accounts can test synchros after reading the live inheritance
                screen. A launch roster is not a demand to rebuild everything.
              </p>
              <p>
                Define the account gap first: wave clear, boss damage, support,
                control, economy, or missing coverage. Spend on Update 4 only
                when it closes that gap.
              </p>
            </div>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-white">
              Treat exact values as live data
            </h2>
            <div className="mt-3 space-y-4 text-[#D8CCC7] leading-8">
              <p>
                Event shops, entry requirements, reward rates, and new-unit
                balance can shift in a 4.0.x patch. The live game interface is
                final. This hub keeps route decisions stable without freezing
                uncertain launch numbers into permanent advice.
              </p>
            </div>
          </section>
        </article>

        <FaqSection
          items={[
            {
              question: 'Is UTDZ a new Roblox game?',
              answer:
                'It is the current Update 4 identity of the same experience formerly called UTDX, with the same Place and Universe IDs.',
            },
            {
              question: 'What are the main Update 4 routes?',
              answer:
                'Current coverage includes the Summer Event, Spider Extraction, Crime Fighting, new-unit acquisition, and synchro planning.',
            },
            {
              question: 'Should returning players replace their old team?',
              answer:
                'No. Test established units first and replace only the slot where Update 4 solves a measured account problem.',
            },
          ]}
        />
      </Container>
    </div>
  );
}
