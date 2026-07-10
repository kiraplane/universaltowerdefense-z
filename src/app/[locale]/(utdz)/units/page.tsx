import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UnitsBrowser } from '@/components/utdz/units-browser';
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
  return constructMetadata({
    title: 'Universal Tower Defense Z Units - Roles, Traits and Builds',
    description:
      'Browse selected UTDZ units by role, tier, traits, relics, placement, and build priority, plus the current Update 4 new-unit watch route.',
    locale,
    pathname: '/units',
  });
}

export default function UnitsPage() {
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
