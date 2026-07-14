import Container from '@/components/layout/container';
import { LocalizedCorePage } from '@/components/utdz/localized-core-page';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UnitsBrowser } from '@/components/utdz/units-browser';
import { updateFourMetaWatch } from '@/data/utdz/tier-list';
import { getLocalizedCoreCopy } from '@/data/utdz/localized-core';
import { units } from '@/data/utdz/units';
import { LocaleLink } from '@/i18n/navigation';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localized = getLocalizedCoreCopy(locale, 'units');
  return constructMetadata({
    title:
      localized?.title ??
      'Universal Tower Defense Z Units - Roles, Traits and Builds',
    description:
      localized?.description ??
      'Browse selected UTDZ units by role, tier, traits, relics, placement, and build priority, plus the current Update 4 new-unit watch route.',
    locale,
    pathname: '/units',
  });
}

export default async function UnitsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (locale !== 'en') return <LocalizedCorePage locale={locale} pageKey="units" />;
  const roleCount = new Set(units.map((unit) => unit.role)).size;
  const rarityCount = new Set(units.map((unit) => unit.rarity)).size;
  const tierCount = new Set(units.map((unit) => unit.tier)).size;

  return (
    <div className="bg-[#080607] py-12 text-[#F8FAFC]">
      <Container className="space-y-8 px-4">
        <header className="max-w-3xl space-y-4">
          <Badge className="bg-[#E23A2E] text-white">Selected units</Badge>
          <h1 className="font-display text-4xl font-black md:text-6xl">
            Universal Tower Defense Z Units
          </h1>
          <p className="text-lg leading-8 text-[#D8CCC7]">
            Browse selected established UTDZ units by name, rarity, role,
            placement, traits, relics, and build priority. Update 4 acquisition
            targets stay in the current watch guide until reliable detail data
            supports a permanent profile.
          </p>
          <div className="grid gap-3 text-sm md:grid-cols-4">
            {[
              ['Units', units.length],
              ['Roles', roleCount],
              ['Rarities', rarityCount],
              ['Tier states', tierCount],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-md border border-[#322123] bg-[#151011] px-3 py-2"
              >
                <span className="block text-[#B8AAA5]">{label}</span>
                <strong className="font-display text-xl text-white">
                  {value}
                </strong>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-[#E23A2E] text-white hover:bg-[#C82E25]"
            >
              <LocaleLink href="/guides/update-4-new-units">
                Update 4 new units
              </LocaleLink>
            </Button>
            <Button asChild variant="outline">
              <LocaleLink href="/tier-list">Tier transition guide</LocaleLink>
            </Button>
          </div>
        </header>

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-white">
            Update 4 acquisition watchlist
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#B8AAA5]">
            These current names stay outside the permanent stat browser until
            their live forms, evolutions, and placement limits can be checked.
            Use the list to choose a route without mistaking an incomplete
            public table for final unit math.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {updateFourMetaWatch.map((unit) => (
              <article
                key={unit.name}
                className="rounded-lg border border-[#322123] bg-[#080607] p-4"
              >
                <h3 className="font-display text-lg font-bold text-white">
                  {unit.name}
                </h3>
                <p className="mt-2 text-sm text-[#E8B25C]">{unit.role}</p>
                <p className="mt-2 text-sm leading-6 text-[#B8AAA5]">
                  {unit.decision}
                </p>
              </article>
            ))}
          </div>
        </section>

        <UnitsBrowser units={units} />

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-white">
            Reading the UTDZ unit database
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-[#B8AAA5] md:grid-cols-3">
            <p>
              Start with role: DPS, support, farm, control, boss, utility, or
              hybrid.
            </p>
            <p>
              Check whether the unit has a realistic trait and relic path before
              investing.
            </p>
            <p>
              Treat Watchlist labels and all new Update 4 units as provisional
              until enough current gameplay evidence exists.
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
}
