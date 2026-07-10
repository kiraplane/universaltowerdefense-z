import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaqSection } from '@/components/utdz/faq-section';
import { getUnit, units } from '@/data/utdz/units';
import { LocaleLink } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    units.map((unit) => ({ locale, slug: unit.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const unit = getUnit(slug);
  if (!unit) return {};
  return constructMetadata({
    title: `${unit.name} UTDZ Build - Tier, Traits and Relics`,
    description: `${unit.name} profile for Universal Tower Defense Z: tier, rarity, role, placement, best traits, relics, strengths, weaknesses, and upgrade priority.`,
    locale,
    pathname: `/units/${slug}`,
  });
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const unit = getUnit(slug);

  if (!unit) {
    notFound();
  }

  return (
    <div className="bg-[#080607] py-12 text-[#F8FAFC]">
      <Container className="space-y-8 px-4">
        <header className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#E23A2E] text-[#120707]">
              Tier {unit.tier}
            </Badge>
            <Badge className="bg-[#F4B942] text-[#120707]">{unit.role}</Badge>
            <Badge variant="outline" className="border-[#5A3A36] text-white">
              {unit.rarity}
            </Badge>
            <Badge variant="outline" className="border-[#5A3A36] text-white">
              {unit.placement}
            </Badge>
            {unit.updateTag ? (
              <Badge className="bg-[#8B5CF6] text-white">
                {unit.updateTag}
              </Badge>
            ) : null}
          </div>
          <h1 className="mt-5 font-display text-4xl font-black md:text-6xl">
            {unit.name}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#D8CCC7]">
            {unit.summary} Use this profile as a decision page: does this unit
            deserve traits, relics, and upgrades on your account right now?
          </p>
        </header>

        <section className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-lg border border-[#322123] bg-[#151011] p-5">
            <h2 className="font-display text-2xl font-bold text-white">
              Build tags
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[#B8AAA5]">
              <p>
                <strong className="text-white">Obtainment:</strong>{' '}
                {unit.obtainment || 'Needs verification'}
              </p>
              <p>
                <strong className="text-white">Priority:</strong>{' '}
                {unit.upgradePriority}
              </p>
              <p>
                <strong className="text-white">Element:</strong>{' '}
                {unit.element || 'Unknown'}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-[#322123] bg-[#151011] p-5">
            <h2 className="font-display text-2xl font-bold text-white">
              Best traits
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {unit.bestTraits.map((trait) => (
                <Badge key={trait} className="bg-[#F4B942] text-[#120707]">
                  {trait}
                </Badge>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-5">
              <LocaleLink href="/traits">Compare all traits</LocaleLink>
            </Button>
          </div>
          <div className="rounded-lg border border-[#322123] bg-[#151011] p-5">
            <h2 className="font-display text-2xl font-bold text-white">
              Best relics
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {unit.bestRelics.map((relic) => (
                <Badge key={relic} className="bg-[#E23A2E] text-[#120707]">
                  {relic}
                </Badge>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-5">
              <LocaleLink href="/relics">Compare all relics</LocaleLink>
            </Button>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-lg border border-[#322123] bg-[#151011] p-5">
            <h2 className="font-display text-2xl font-bold text-white">
              Strengths
            </h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#B8AAA5]">
              {unit.strengths.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-[#322123] bg-[#151011] p-5">
            <h2 className="font-display text-2xl font-bold text-white">
              Weaknesses
            </h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#B8AAA5]">
              {unit.weaknesses.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-5">
          <h2 className="font-display text-2xl font-bold text-white">
            Where this unit points next
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-[#B8AAA5] md:grid-cols-3">
            <p>
              Use the tier list to compare {unit.name} against other{' '}
              {unit.role.toLowerCase()} units before spending premium rerolls.
            </p>
            <p>
              If this is a late-X Universal Fest unit, treat its notes as a
              transition baseline and compare it with the current Update 4 hub.
            </p>
            <p>
              If the unit is Watchlist, treat its build as provisional until
              more current patch evidence exists.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="bg-[#E23A2E] text-[#120707]">
              <LocaleLink href="/tier-list">Back to tier list</LocaleLink>
            </Button>
            <Button asChild variant="outline">
              <LocaleLink href="/units">All units</LocaleLink>
            </Button>
            <Button asChild variant="outline">
              <LocaleLink href="/updates/update-4">Update 4 hub</LocaleLink>
            </Button>
          </div>
        </section>

        <FaqSection
          title={`${unit.name} FAQ`}
          items={[
            {
              question: `Is ${unit.name} worth building?`,
              answer: `${unit.name} is listed as ${unit.tier} tier with ${unit.upgradePriority.toLowerCase()} upgrade priority. Build it when its ${unit.role.toLowerCase()} role matches your current account needs.`,
            },
            {
              question: `What traits fit ${unit.name}?`,
              answer: `Start by comparing ${unit.bestTraits.join(', ')}. Do not spend premium rerolls if this unit is only a temporary slot for your account.`,
            },
            {
              question: `What relics fit ${unit.name}?`,
              answer: `Start with ${unit.bestRelics.join(', ')} if those sets are realistic for your farming route.`,
            },
          ]}
        />
      </Container>
    </div>
  );
}
