import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaqSection } from '@/components/utdz/faq-section';
import { relics } from '@/data/utdz/relics';
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
    title: 'Universal Tower Defense Z Relics - Best Sets and Farming Notes',
    description:
      'Universal Tower Defense Z relics guide with Fusion Relic Set, Fused Warrior Relic Set, stages, buffs, best roles, and enhance advice.',
    locale,
    pathname: '/relics',
  });
}

export default function RelicsPage() {
  return (
    <div className="bg-[#080607] py-12 text-[#F8FAFC]">
      <Container className="space-y-8 px-4">
        <header className="max-w-3xl space-y-4">
          <Badge className="bg-[#E23A2E] text-[#120707]">Relics</Badge>
          <h1 className="font-display text-4xl font-black md:text-6xl">
            Universal Tower Defense Z Relics
          </h1>
          <p className="text-lg leading-8 text-[#D8CCC7]">
            Compare UTDZ relic sets before enhancing or farming. Fusion and
            Fused Warrior remain useful late-X reference sets, while Update 4.0
            decisions should follow your current units, Synchros, and mode.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {relics.map((relic) => (
            <article
              key={relic.slug}
              className="rounded-lg border border-[#322123] bg-[#151011] p-5 shadow-sm"
            >
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#F4B942] text-[#120707]">
                  {relic.slot}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-[#5A3A36] text-white"
                >
                  {relic.set}
                </Badge>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold text-white">
                {relic.name}
              </h2>
              {relic.stage ? (
                <p className="mt-2 text-sm text-[#E23A2E]">{relic.stage}</p>
              ) : null}
              <p className="mt-4 text-sm leading-6 text-[#D8CCC7]">
                {relic.effect}
              </p>
              <div className="mt-4 rounded-md bg-[#100B0C] p-3 text-sm leading-6 text-[#B8AAA5]">
                <strong className="text-white">Enhance advice:</strong>{' '}
                {relic.enhanceAdvice}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {relic.bestFor.map((role) => (
                  <Badge
                    key={role}
                    variant="outline"
                    className="border-[#5A3A36] text-[#D8CCC7]"
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </section>

        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-[#E23A2E] text-[#120707]">
            <LocaleLink href="/units">Compare units</LocaleLink>
          </Button>
          <Button asChild variant="outline">
            <LocaleLink href="/guides/update-4-synchros">
              Update 4 Synchros
            </LocaleLink>
          </Button>
        </div>

        <FaqSection
          items={[
            {
              question: 'What relics should I farm first in UTDZ?',
              answer:
                'Farm relics that match your best unit. Compare Fusion and Fused Warrior sets with current Update 4 units and Synchros before enhancing.',
            },
            {
              question: 'Should I enhance every relic?',
              answer:
                'No. Enhance relics only when the unit and mode fit are clear. Early relic mistakes can waste time and resources.',
            },
            {
              question: 'Are relic sets better than single pieces?',
              answer:
                'Often yes, but single-piece value still depends on the unit kit, stage, and role.',
            },
          ]}
        />
      </Container>
    </div>
  );
}
