import Container from '@/components/layout/container';
import { LocalizedCorePage } from '@/components/utdz/localized-core-page';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaqSection } from '@/components/utdz/faq-section';
import {
  tierEntries,
  updateFourMetaWatch,
} from '@/data/utdz/tier-list';
import { getLocalizedCoreCopy } from '@/data/utdz/localized-core';
import type { Unit, UnitTier } from '@/data/utdz/types';
import { units } from '@/data/utdz/units';
import { LocaleLink } from '@/i18n/navigation';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

const tiers: UnitTier[] = ['S', 'A', 'B', 'C', 'Watchlist'];
const tierNotes: Record<UnitTier, string> = {
  S: 'Top-priority UTDZ units to compare before heavy summons, traits, and relic farming.',
  A: 'Strong units that are often worth building when they fit your account and mode.',
  B: 'Useful units that need clearer team context before major investment.',
  C: 'Low-priority units unless they fill a very specific role.',
  Watchlist:
    'Units or forms that need more current evidence before a firm Update 4 ranking.',
};

const tierEntryBySlug = tierEntries.reduce((map, entry) => {
  const list = map.get(entry.unitSlug) || [];
  list.push(entry);
  map.set(entry.unitSlug, list);
  return map;
}, new Map<string, typeof tierEntries>());

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localized = getLocalizedCoreCopy(locale, 'tier-list');
  return constructMetadata({
    title:
      localized?.title ??
      'Universal Tower Defense Z Tier List - Update 4 Transition',
    description:
      localized?.description ??
      'UTDZ tier list transition guide for established units, roles, traits, relics, synchros, and Update 4 units still awaiting stable rankings.',
    locale,
    pathname: '/tier-list',
  });
}

function getReason(unit: Unit) {
  const notes = tierEntryBySlug.get(unit.slug) || [];
  return (
    notes[0]?.reason ||
    `${unit.name} is a ${unit.rarity} ${unit.role.toLowerCase()} unit. Compare its role, traits, relic fit, and obtainment before spending resources.`
  );
}

export default async function TierListPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (locale !== 'en') {
    return <LocalizedCorePage locale={locale} pageKey="tier-list" />;
  }
  return (
    <div className="bg-[#080607] py-12 text-[#F8FAFC]">
      <Container className="space-y-8 px-4">
        <header className="max-w-3xl space-y-4">
          <Badge className="bg-[#E23A2E] text-white">Update 4 transition</Badge>
          <h1 className="font-display text-4xl font-black md:text-6xl">
            Universal Tower Defense Z Tier List
          </h1>
          <p className="text-lg leading-8 text-[#D8CCC7]">
            Use this UTDZ tier list as an established-roster baseline while the
            Update 4 meta settles. Rank by role, account stage, traits, relics,
            and mode fit—not by launch-week rarity hype.
          </p>
        </header>

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-white">
            How to use this UTDZ tier list
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-[#B8AAA5] md:grid-cols-3">
            <p>
              1. Start with your blocker: damage, support, farm, or boss DPS.
            </p>
            <p>
              2. Check whether the unit has a realistic trait and relic path.
            </p>
            <p>
              3. Treat Watchlist units as current-update leads, not final math.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-[#E23A2E] text-white hover:bg-[#C82E25]"
            >
              <LocaleLink href="/guides/update-4-new-units">
                Update 4 new-unit watchlist
              </LocaleLink>
            </Button>
            <Button asChild variant="outline">
              <LocaleLink href="/guides/update-4-synchros">
                Update 4 synchros
              </LocaleLink>
            </Button>
          </div>
        </section>

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
          <Badge className="bg-[#E23A2E] text-white">Current meta watch</Badge>
          <h2 className="mt-4 font-display text-2xl font-bold text-white">
            Update 4 units to verify before rerolling
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#B8AAA5]">
            Current competitor tier coverage repeatedly surfaces these names,
            but public stat tables are not stable enough to invent exact DPS.
            Use the role and spend decision below, then confirm the live form,
            evolution, placement limit, trait, and relic fit in game.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {updateFourMetaWatch.map((unit) => (
              <article
                key={unit.name}
                className="rounded-lg border border-[#322123] bg-[#080607] p-4"
              >
                <h3 className="font-display text-xl font-bold text-white">
                  {unit.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-[#E8B25C]">
                  {unit.role}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#B8AAA5]">
                  {unit.decision}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-4">
          {tiers.map((tier) => {
            const entries = units.filter((item) => item.tier === tier);
            if (entries.length === 0) return null;

            return (
              <section
                key={tier}
                className="rounded-lg border border-[#322123] bg-[#151011] shadow-sm"
              >
                <div className="flex items-center gap-3 border-[#322123] border-b p-5">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-[#E23A2E] font-display text-2xl font-black text-[#120707]">
                    {tier === 'Watchlist' ? '?' : tier}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">
                      {tier} tier units
                    </h2>
                    <p className="text-sm text-[#B8AAA5]">
                      {entries.length} entries · {tierNotes[tier]}
                    </p>
                  </div>
                </div>
                <div className="grid gap-0 divide-y divide-[#322123]">
                  {entries.map((unit) => {
                    const notes = tierEntryBySlug.get(unit.slug) || [];

                    return (
                      <div
                        key={unit.slug}
                        className="grid gap-4 p-5 md:grid-cols-[220px_1fr_auto] md:items-center"
                      >
                        <div className="min-w-0">
                          <LocaleLink
                            href={`/units/${unit.slug}`}
                            className="font-display text-xl font-bold text-white hover:text-[#E23A2E]"
                          >
                            {unit.name}
                          </LocaleLink>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge className="bg-[#F4B942] text-[#120707]">
                              {unit.role}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-[#5A3A36] text-[#D8CCC7]"
                            >
                              {unit.rarity}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-[#5A3A36] text-[#D8CCC7]"
                            >
                              {unit.placement}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm leading-6 text-[#B8AAA5]">
                          <p>{getReason(unit)}</p>
                          <p>
                            <strong className="text-white">Traits:</strong>{' '}
                            {unit.bestTraits.join(', ')}
                          </p>
                          <p>
                            <strong className="text-white">Relics:</strong>{' '}
                            {unit.bestRelics.join(', ')}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 md:justify-end">
                          {notes.slice(0, 2).map((note) => (
                            <Badge
                              key={note.mode}
                              variant="outline"
                              className="border-[#5A3A36] text-[#D8CCC7]"
                            >
                              {note.mode}
                            </Badge>
                          ))}
                          <Button asChild variant="outline" size="sm">
                            <LocaleLink href={`/units/${unit.slug}`}>
                              Profile
                            </LocaleLink>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-6">
          <h2 className="font-display text-2xl font-bold text-white">
            Ranking rules
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-[#B8AAA5] md:grid-cols-2">
            <p>
              This list preserves selected established-unit comparisons from the
              same Roblox Experience. It does not claim to rank every new Update
              4 unit before their obtainment and builds are stable.
            </p>
            <p>
              New Update 4 units stay in acquisition guides or Watchlist until
              role, trait, relic, and mode evidence supports a real ranking.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="bg-[#E23A2E] text-[#120707]">
              <LocaleLink href="/units">Open units database</LocaleLink>
            </Button>
            <Button asChild variant="outline">
              <LocaleLink href="/traits">Compare traits</LocaleLink>
            </Button>
            <Button asChild variant="outline">
              <LocaleLink href="/relics">Compare relics</LocaleLink>
            </Button>
          </div>
        </section>

        <FaqSection
          items={[
            {
              question:
                'What is the best unit in Universal Tower Defense Z Update 4?',
              answer:
                'There is no stable complete 4.0 answer yet. Use established top comparison units as a baseline and judge new units by role, cost, traits, relics, and mode results.',
            },
            {
              question: 'Should beginners only build S-tier units?',
              answer:
                'No. Beginners should build the best unit they can support with traits, relics, and upgrades. An A-tier unit with a practical build can outperform an unsupported S-tier pull.',
            },
            {
              question: 'What does Watchlist mean?',
              answer:
                'Watchlist means the unit is important enough to track, often because it is new, but there is not enough evidence for a final ranking yet.',
            },
            {
              question: 'Are support units worth building?',
              answer:
                'Yes, when they improve the carry, economy, or clear consistency. Not every slot should be pure DPS.',
            },
          ]}
        />
      </Container>
    </div>
  );
}
