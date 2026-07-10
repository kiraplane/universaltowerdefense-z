import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaqSection } from '@/components/utdz/faq-section';
import { teams } from '@/data/utdz/teams';
import { units } from '@/data/utdz/units';
import { LocaleLink } from '@/i18n/navigation';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

const unitBySlug = new Map(units.map((item) => [item.slug, item.name]));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: 'Universal Tower Defense Z Best Team - Team Templates',
    description:
      'Universal Tower Defense Z best team templates for Update 4, carry and support roles, Synchro planning, and safer unit investment.',
    locale,
    pathname: '/best-team',
  });
}

export default function BestTeamPage() {
  return (
    <div className="bg-[#080607] py-12 text-slate-100">
      <Container className="space-y-8 px-4">
        <header className="max-w-3xl space-y-4">
          <Badge className="bg-[#E23A2E] text-[#120707]">Team guide</Badge>
          <h1 className="text-4xl font-black md:text-6xl">
            Universal Tower Defense Z Best Team
          </h1>
          <p className="text-lg leading-8 text-slate-300">
            Use these UTDZ team templates as investment shapes, not as a hard
            copy list. The best team usually starts with one serious carry, one
            support or economy answer, and a realistic trait or relic plan.
          </p>
        </header>

        <section className="rounded-lg border border-[#E23A2E]/25 bg-[#100B0C]/90 p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            How to build a better UTDZ team
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300 md:grid-cols-3">
            <p>1. Pick the unit that solves your current blocker.</p>
            <p>
              2. Match traits and relics before burning premium reroll items.
            </p>
            <p>3. Keep older upgraded carries if they outperform a new pull.</p>
          </div>
        </section>

        <div className="grid gap-5">
          {teams.map((team) => (
            <section
              key={team.id}
              className="rounded-lg border border-[#E23A2E]/25 bg-[#100B0C]/90 p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Badge className="border border-slate-600 bg-slate-900 text-slate-200">
                    {team.purpose}
                  </Badge>
                  <h2 className="mt-3 text-2xl font-bold">{team.name}</h2>
                </div>
                <Badge className="bg-[#E23A2E] text-[#120707]">
                  Team template
                </Badge>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div>
                  <h3 className="font-semibold">Core</h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-300">
                    {team.core.map((slug) => (
                      <li key={slug}>
                        <LocaleLink
                          href={`/units/${slug}`}
                          className="text-[#F4B942] underline underline-offset-4"
                        >
                          {unitBySlug.get(slug) ?? slug}
                        </LocaleLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Substitutes</h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-300">
                    {team.substitutes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm leading-6 text-slate-300">{team.notes}</p>
              </div>
            </section>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-[#E23A2E] text-[#120707]">
            <LocaleLink href="/tier-list">
              Compare with the tier list
            </LocaleLink>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-700 bg-slate-900/80 text-slate-100 hover:bg-slate-800"
          >
            <LocaleLink href="/traits">Check trait priorities</LocaleLink>
          </Button>
        </div>

        <FaqSection
          items={[
            {
              question: 'What is the safest UTDZ beginner team shape?',
              answer:
                'Use one reliable carry, one support or farm option, and one practical trait plan before experimenting with specialists.',
            },
            {
              question:
                'Should I copy a Universal Tower Defense Z team exactly?',
              answer:
                'No. Use the template, then swap based on owned units, existing traits, relic access, and the stage problem in front of you.',
            },
            {
              question: 'When should I keep an older unit?',
              answer:
                'Keep an older unit when it already has better upgrades, traits, or relic support than a new event pull.',
            },
            {
              question: 'Where should I check individual units?',
              answer:
                'Open the units database and tier list before committing upgrades to a team slot.',
            },
          ]}
        />
      </Container>
    </div>
  );
}
