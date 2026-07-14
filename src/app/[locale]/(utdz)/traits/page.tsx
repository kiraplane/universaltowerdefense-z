import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaqSection } from '@/components/utdz/faq-section';
import { traits } from '@/data/utdz/traits';
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
    title: 'Universal Tower Defense Z Traits - Reroll Priority Guide',
    description:
      'Universal Tower Defense Z traits guide with Ruler, Fission, Eternal, Duelist, Fortunate, Lightspeed, roll chances, best roles, and reroll stop rules.',
    locale,
    pathname: '/traits',
  });
}

export default function TraitsPage() {
  return (
    <div className="bg-[#080607] py-12 text-[#F8FAFC]">
      <Container className="space-y-8 px-4">
        <header className="max-w-3xl space-y-4">
          <Badge className="bg-[#F4B942] text-[#120707]">Traits</Badge>
          <h1 className="font-display text-4xl font-black md:text-6xl">
            Universal Tower Defense Z Traits
          </h1>
          <p className="text-lg leading-8 text-[#D8CCC7]">
            Use this UTDZ traits page before spending Trait Rerolls. The goal is
            not to chase mythic traits on every unit, but to stop at the right
            trait for the right role.
          </p>
        </header>

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-white">
            Update 4 reroll order
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-[#B8AAA5] md:grid-cols-3">
            <p>
              1. Finish the obtainable form and evolution route before rolling
              Yhwach, Ichigo, Yamamoto, Asura, Rukia, Gremmy, or Yoruichi.
            </p>
            <p>
              2. Roll the main carry first; practical control on Rukia-style
              support is enough while damage slots are unfinished.
            </p>
            <p>
              3. Keep current Yoruichi-era code rerolls in reserve until the
              unit changes a measured story, event, or boss clear.
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-white">
            Trait reroll stop rules
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-[#B8AAA5] md:grid-cols-3">
            <p>1. Save premium rerolls for units you expect to keep.</p>
            <p>2. Match the trait to the role: DPS, support, farm, or boss.</p>
            <p>3. Stop at practical traits on temporary units.</p>
          </div>
        </section>

        <section className="rounded-lg border border-[#322123] bg-[#151011] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-[#100B0C] text-[#B8AAA5]">
                <tr>
                  <th className="px-5 py-3">Trait</th>
                  <th className="px-5 py-3">Tier</th>
                  <th className="px-5 py-3">Rarity / Odds</th>
                  <th className="px-5 py-3">Best roles</th>
                  <th className="px-5 py-3">Reroll advice</th>
                </tr>
              </thead>
              <tbody>
                {traits.map((trait) => (
                  <tr key={trait.slug} className="border-[#322123] border-t">
                    <td className="px-5 py-4 font-display text-lg font-bold text-white">
                      {trait.name}
                    </td>
                    <td className="px-5 py-4">
                      <Badge className="bg-[#E23A2E] text-[#120707]">
                        {trait.tier}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-[#D8CCC7]">
                      {trait.rarity || 'Unknown'}
                      {trait.odds ? ` · ${trait.odds}` : ''}
                    </td>
                    <td className="px-5 py-4 text-[#D8CCC7]">
                      {trait.bestFor.join(', ')}
                    </td>
                    <td className="px-5 py-4 text-[#B8AAA5]">
                      {trait.rerollAdvice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-[#E23A2E] text-[#120707]">
            <LocaleLink href="/tier-list">Compare tier list</LocaleLink>
          </Button>
          <Button asChild variant="outline">
            <LocaleLink href="/guides/reroll-strategy">
              Read reroll strategy
            </LocaleLink>
          </Button>
        </div>

        <FaqSection
          items={[
            {
              question: 'What is the best trait in Universal Tower Defense Z?',
              answer:
                'Ruler, Fission, and Eternal are premium traits for high-value units, but the best trait depends on the unit role.',
            },
            {
              question: 'Is Fortunate good?',
              answer:
                'Fortunate is good for farm or economy value. It is not the default final trait for a pure DPS carry.',
            },
            {
              question: 'Should I reroll early units?',
              answer:
                'Only lightly. Save heavy rerolls for units you expect to keep through story, raids, bosses, or current event content.',
            },
          ]}
        />
      </Container>
    </div>
  );
}
