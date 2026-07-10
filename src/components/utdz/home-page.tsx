import Container from '@/components/layout/container';
import { JsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeCopyButton } from '@/components/utdz/code-copy-button';
import { FaqSection } from '@/components/utdz/faq-section';
import { activeCodes } from '@/data/utdz/codes';
import { getGuide } from '@/data/utdz/guides';
import { officialGameFacts } from '@/data/utdz/sources';
import { featuredUnits } from '@/data/utdz/units';
import { LocaleLink } from '@/i18n/navigation';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ExternalLink,
  Gem,
  Layers3,
  RadioTower,
  Sparkles,
  Swords,
  Trophy,
  Users,
} from 'lucide-react';
import Image from 'next/image';

const quickLinks = [
  { label: 'Tier List', href: '/tier-list', icon: Trophy },
  { label: 'Units', href: '/units', icon: Users },
  { label: 'New Units', href: '/guides/update-4-new-units', icon: Sparkles },
  { label: 'Summer', href: '/guides/summer-event', icon: Gem },
  { label: 'Extraction', href: '/guides/spider-extraction', icon: Swords },
  { label: 'Crime Mode', href: '/guides/crime-fighting', icon: BadgeCheck },
];

const startSteps = [
  {
    title: 'Claim five current codes',
    body: 'Bank the Ruler Ticket, rerolls, Gems, Universal Gems, and Summer Currency before spending.',
    href: '/codes',
  },
  {
    title: 'Audit the account you own',
    body: 'UTDX became UTDZ on the same Roblox Experience, so test proven units before rebuilding.',
    href: '/guides/utdx-to-utdz',
  },
  {
    title: 'Pick one Update 4 lane',
    body: 'Choose progression, Summer Event, extraction, crime mode, new units, or synchros.',
    href: '/guides/update-4-overview',
  },
  {
    title: 'Spend after the role is proven',
    body: 'Use tier, trait, relic, and team pages after a unit solves a measured account gap.',
    href: '/best-team',
  },
];

const hubModules = [
  {
    title: 'Roster Decisions',
    body: 'Compare established carries, selected unit pages, and the Update 4 watchlist.',
    hrefs: ['/tier-list', '/units', '/best-team', '/guides/update-4-new-units'],
    icon: Users,
  },
  {
    title: 'Build Systems',
    body: 'Match traits, relics, rerolls, and synchro inheritance to the role you need.',
    hrefs: [
      '/traits',
      '/relics',
      '/guides/reroll-strategy',
      '/guides/update-4-synchros',
    ],
    icon: Sparkles,
  },
  {
    title: 'Update 4 Routes',
    body: 'Use current event and mode guides without treating launch-week values as permanent.',
    hrefs: [
      '/updates/update-4',
      '/guides/summer-event',
      '/guides/spider-extraction',
      '/guides/crime-fighting',
    ],
    icon: Layers3,
  },
];

const featuredGuideSlugs = [
  'update-4-overview',
  'beginner-guide',
  'summer-event',
  'spider-extraction',
  'crime-fighting',
  'utdx-to-utdz',
];

const keywordLinks = [
  { keyword: 'universal tower defense z wiki', href: '/' },
  { keyword: 'universal tower defense z codes', href: '/codes' },
  { keyword: 'utdz tier list', href: '/tier-list' },
  { keyword: 'universal tower defense z units', href: '/units' },
  { keyword: 'utdz traits', href: '/traits' },
  { keyword: 'utdz relics', href: '/relics' },
  { keyword: 'universal tower defense z best team', href: '/best-team' },
  {
    keyword: 'universal tower defense z update 4.0',
    href: '/updates/update-4',
  },
  { keyword: 'utdz summer event', href: '/guides/summer-event' },
  { keyword: 'utdz spider extraction', href: '/guides/spider-extraction' },
  { keyword: 'utdz crime fighting', href: '/guides/crime-fighting' },
  { keyword: 'utdx to utdz', href: '/guides/utdx-to-utdz' },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

function getRouteLabel(route: string) {
  return (
    keywordLinks.find((item) => item.href === route)?.keyword ??
    route.replace(/^\/+/, '').replaceAll('-', ' ')
  );
}

export function UtdzHomePage() {
  const featuredGuides = featuredGuideSlugs
    .map((slug) => getGuide(slug))
    .filter((guide) => Boolean(guide));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: officialGameFacts.siteName,
        url: officialGameFacts.canonicalUrl,
        description:
          'Current UTDZ guide hub for Update 4 codes, units, tier decisions, events, traits, relics, and progression.',
        inLanguage: 'en',
      },
      {
        '@type': 'Organization',
        name: officialGameFacts.siteName,
        url: officialGameFacts.canonicalUrl,
        logo: `${officialGameFacts.canonicalUrl}${officialGameFacts.icon}`,
      },
      {
        '@type': 'VideoGame',
        name: officialGameFacts.name,
        url: officialGameFacts.robloxUrl,
        gamePlatform: 'Roblox',
        genre: ['Strategy', 'Tower Defense'],
        author: {
          '@type': 'Organization',
          name: officialGameFacts.developer,
          url: officialGameFacts.creatorGroupUrl,
        },
      },
      {
        '@type': 'VideoObject',
        name: 'Universal Tower Defense Z Update 4.0 Official Trailer',
        description:
          'Official Update 4.0 trailer introducing the UTDZ identity.',
        thumbnailUrl: [
          `https://i.ytimg.com/vi/${officialGameFacts.officialTrailerId}/hq720.jpg`,
        ],
        embedUrl: `https://www.youtube.com/embed/${officialGameFacts.officialTrailerId}`,
      },
    ],
  };

  return (
    <div className="bg-[#080607] text-[#F4EDE4]">
      <JsonLd data={jsonLd} />

      <section className="border-white/10 border-b bg-[radial-gradient(circle_at_15%_20%,rgba(226,58,46,0.24),transparent_34%),linear-gradient(135deg,#080607_0%,#160B0D_58%,#080607_100%)]">
        <Container className="grid gap-8 px-4 py-10 lg:min-h-[510px] lg:grid-cols-[minmax(0,1.06fr)_minmax(400px,0.94fr)] lg:items-center lg:py-12">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-[#E23A2E] text-white">Update 4.0</Badge>
              <Badge className="border border-[#F4B942]/50 bg-[#F4B942]/10 text-[#F4B942]">
                Same Experience, new Z identity
              </Badge>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-[0.98] tracking-normal sm:text-5xl lg:text-7xl">
              Universal Tower Defense Z Wiki
            </h1>
            <p className="mt-5 max-w-2xl text-[#D8CCC7] text-lg leading-8">
              Current UTDZ routes for codes, units, tier decisions, the Summer
              Event, Spider Extraction, Crime Fighting, traits, relics, and
              synchros.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-[#E23A2E] text-white hover:bg-[#C82E25]"
              >
                <LocaleLink href="/codes">
                  Copy active codes
                  <ArrowRight className="size-4" />
                </LocaleLink>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#F4B942]/60 bg-transparent text-[#F4B942] hover:bg-[#F4B942] hover:text-[#1B0A08]"
              >
                <LocaleLink href="/updates/update-4">Start Update 4</LocaleLink>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
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
            <div className="mt-5 flex flex-wrap gap-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <LocaleLink
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-w-0 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 font-medium text-[#D8CCC7] text-sm transition hover:border-[#E23A2E]/60 hover:text-white"
                  >
                    <Icon className="size-4 shrink-0 text-[#F4B942]" />
                    <span className="min-w-0 break-words">{link.label}</span>
                  </LocaleLink>
                );
              })}
            </div>
            <div className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <p className="font-display font-black text-2xl text-[#F4B942]">
                  {formatNumber(officialGameFacts.visitsAtCheck)}
                </p>
                <p className="text-[#B8AAA5] text-xs">Roblox visits at check</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <p className="font-display font-black text-2xl text-[#F4B942]">
                  {formatNumber(officialGameFacts.activePlayersAtCheck)}
                </p>
                <p className="text-[#B8AAA5] text-xs">playing at API check</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <p className="font-display font-black text-2xl text-[#F4B942]">
                  {activeCodes.length}
                </p>
                <p className="text-[#B8AAA5] text-xs">current codes</p>
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-3">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl shadow-black/40">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${officialGameFacts.officialTrailerId}?rel=0`}
                  title="Universal Tower Defense Z Update 4.0 official trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
              <Image
                src={officialGameFacts.icon}
                alt="Universal Tower Defense Z icon"
                width={52}
                height={52}
                className="rounded-lg"
              />
              <div className="min-w-0">
                <p className="font-semibold text-white">
                  Official UTDZ trailer
                </p>
                <p className="text-[#B8AAA5] text-xs">
                  Verified creator media · checked July 10, 2026
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-white/10 border-b bg-[#100B0C] py-9">
        <Container className="px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-semibold text-[#E23A2E] text-xs uppercase tracking-[0.18em]">
                Live reward check
              </p>
              <h2 className="mt-2 font-display text-3xl font-black">
                Five codes to claim before you reroll
              </h2>
            </div>
            <LocaleLink
              href="/codes"
              className="inline-flex items-center gap-2 font-semibold text-[#F4B942] text-sm"
            >
              Rewards and redeem fixes
              <ArrowRight className="size-4" />
            </LocaleLink>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {activeCodes.map((item) => (
              <div
                key={item.code}
                className="rounded-lg border border-white/10 bg-[#171112] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 break-all font-mono font-bold text-sm text-white">
                    {item.code}
                  </p>
                  <CodeCopyButton code={item.code} />
                </div>
                <p className="mt-3 line-clamp-2 text-[#B8AAA5] text-xs leading-5">
                  {item.reward}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container className="px-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {startSteps.map((step, index) => (
              <LocaleLink
                key={step.href}
                href={step.href}
                className="group rounded-lg border border-white/10 bg-[#151011] p-5 transition hover:border-[#E23A2E]/60"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-[#E23A2E] font-black text-sm text-white">
                    {index + 1}
                  </span>
                  <ArrowRight className="size-4 text-[#F4B942] transition group-hover:translate-x-0.5" />
                </div>
                <h2 className="mt-4 font-display font-bold text-xl text-white">
                  {step.title}
                </h2>
                <p className="mt-2 text-[#B8AAA5] text-sm leading-6">
                  {step.body}
                </p>
              </LocaleLink>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-white/10 border-y bg-[#100B0C] py-10">
        <Container className="space-y-6 px-4">
          <div className="max-w-3xl">
            <p className="font-semibold text-[#F4B942] text-xs uppercase tracking-[0.18em]">
              Wiki routes
            </p>
            <h2 className="mt-2 font-display text-3xl font-black">
              Open the hub that matches your next decision
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {hubModules.map((module) => {
              const Icon = module.icon;
              return (
                <article
                  key={module.title}
                  className="rounded-lg border border-white/10 bg-[#171112] p-5"
                >
                  <Icon className="size-6 text-[#E23A2E]" />
                  <h3 className="mt-4 font-display font-bold text-xl text-white">
                    {module.title}
                  </h3>
                  <p className="mt-2 text-[#B8AAA5] text-sm leading-6">
                    {module.body}
                  </p>
                  <div className="mt-4 grid gap-2">
                    {module.hrefs.map((href) => (
                      <LocaleLink
                        key={href}
                        href={href}
                        className="flex min-w-0 items-center justify-between gap-3 rounded-md border border-white/10 bg-black/15 px-3 py-2 text-[#D8CCC7] text-sm hover:border-[#E23A2E]/50 hover:text-white"
                      >
                        <span className="min-w-0 whitespace-normal break-words capitalize">
                          {getRouteLabel(href)}
                        </span>
                        <ArrowRight className="size-4 shrink-0 text-[#F4B942]" />
                      </LocaleLink>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container className="space-y-6 px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-semibold text-[#E23A2E] text-xs uppercase tracking-[0.18em]">
                Current guides
              </p>
              <h2 className="mt-2 font-display text-3xl font-black">
                Update 4 routes before permanent spending
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-[#F4B942]/50 bg-transparent text-[#F4B942] hover:bg-[#F4B942] hover:text-[#1B0A08]"
            >
              <LocaleLink href="/guides">All UTDZ guides</LocaleLink>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredGuides.map((guide) =>
              guide ? (
                <LocaleLink
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group overflow-hidden rounded-lg border border-white/10 bg-[#151011] transition hover:border-[#E23A2E]/60"
                >
                  <div className="relative aspect-video bg-black">
                    <Image
                      src={guide.coverImageUrl || '/utdz/media/official-1.png'}
                      alt={`${guide.title} cover`}
                      fill
                      sizes="(min-width: 1280px) 32vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-5">
                    <Badge className="bg-[#E23A2E] text-white">
                      {guide.category}
                    </Badge>
                    <h3 className="mt-3 font-display font-bold text-xl text-white">
                      {guide.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[#B8AAA5] text-sm leading-6">
                      {guide.summary}
                    </p>
                  </div>
                </LocaleLink>
              ) : null
            )}
          </div>
        </Container>
      </section>

      <section className="border-white/10 border-y bg-[#100B0C] py-10">
        <Container className="grid gap-8 px-4 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <p className="font-semibold text-[#F4B942] text-xs uppercase tracking-[0.18em]">
              Stable roster baseline
            </p>
            <h2 className="mt-2 font-display text-3xl font-black">
              Established units stay useful while the 4.0 meta settles
            </h2>
            <p className="mt-4 text-[#B8AAA5] text-sm leading-7">
              Selected late-X/current-experience records give you a comparison
              baseline. New 4.0 units remain on the watchlist until their role,
              build cost, and mode value have enough evidence.
            </p>
            <Button
              asChild
              className="mt-5 bg-[#E23A2E] text-white hover:bg-[#C82E25]"
            >
              <LocaleLink href="/units">Browse selected units</LocaleLink>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredUnits.slice(0, 6).map((unit) => (
              <LocaleLink
                key={unit.slug}
                href={`/units/${unit.slug}`}
                className="rounded-lg border border-white/10 bg-[#171112] p-4 hover:border-[#E23A2E]/60"
              >
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-[#F4B942] text-[#1B0A08]">
                    Tier {unit.tier}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/15 text-[#D8CCC7]"
                  >
                    {unit.role}
                  </Badge>
                </div>
                <h3 className="mt-3 font-display font-bold text-lg text-white">
                  {unit.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-[#B8AAA5] text-xs leading-5">
                  {unit.summary}
                </p>
              </LocaleLink>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container className="px-4">
          <h2 className="font-display text-3xl font-black">
            UTDZ search route map
          </h2>
          <p className="mt-3 max-w-3xl text-[#B8AAA5] text-sm leading-7">
            Each high-intent query links to one page instead of competing thin
            duplicates.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {keywordLinks.map((item) => (
              <LocaleLink
                key={item.keyword}
                href={item.href}
                className="rounded-full border border-white/10 bg-[#151011] px-3 py-2 text-[#D8CCC7] text-sm hover:border-[#F4B942]/60 hover:text-[#F4B942]"
              >
                {item.keyword}
              </LocaleLink>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-white/10 border-t bg-[#100B0C] py-10">
        <Container className="px-4">
          <FaqSection
            items={[
              {
                question: 'Is Universal Tower Defense Z the same game as UTDX?',
                answer:
                  'Yes. The official Z page uses the same Roblox Place ID and Universe ID as the former X identity.',
              },
              {
                question: 'How many current UTDZ codes are there?',
                answer:
                  'Five codes were listed active at the July 10 check. Use the codes page for exact spelling and rewards.',
              },
              {
                question: 'What should a returning player do first?',
                answer:
                  'Claim current codes, test the existing roster, and choose one Update 4 lane before spending permanent resources.',
              },
              {
                question: 'Is every Update 4 unit already ranked?',
                answer:
                  'No. New units stay in acquisition and watch guides until role, build cost, and mode evidence support a real ranking.',
              },
            ]}
          />
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E23A2E]/30 bg-[#2A0E10] p-5">
            <div>
              <p className="font-display font-bold text-xl text-white">
                Ready to play on the verified experience?
              </p>
              <p className="mt-1 text-[#D8CCC7] text-sm">
                Match Place ID {officialGameFacts.placeId} before trusting a
                link.
              </p>
            </div>
            <Button
              asChild
              className="bg-[#F4B942] text-[#1B0A08] hover:bg-[#FFD064]"
            >
              <a
                href={officialGameFacts.robloxUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open official Roblox
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
