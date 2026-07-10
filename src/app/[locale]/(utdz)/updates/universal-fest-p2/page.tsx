import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeCopyButton } from '@/components/utdz/code-copy-button';
import { FaqSection } from '@/components/utdz/faq-section';
import { eventCodes } from '@/data/utdz/codes';
import { universalFestUnits } from '@/data/utdz/units';
import { LocaleLink } from '@/i18n/navigation';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

const updateBullets = [
  'NEW Merciless God Universal',
  'NEW Otherworld Disturbance story, legend stage, and Virtual Realm content',
  'NEW Divine Wrath Ultra Boss',
  'NEW Freakybuu Incident Raid',
  'NEW Otherworld Hell gamemode',
  'NEW Universal Banner and events',
  'NEW relics and relic changes',
  '10 new units plus Synchro Drive coverage',
  'New lobby design, guild additions, tags, bundles, codes, QoL, and bug fixes',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: 'Universal Fest P2 Guide - Universal Tower Defense Z Update',
    description:
      'Universal Fest P2 guide for Universal Tower Defense Z with Merciless God, event codes, new units, Otherworld Disturbance, Divine Wrath Ultra Boss, relic changes, and progression advice.',
    locale,
    pathname: '/updates/universal-fest-p2',
  });
}

export default function UniversalFestP2Page() {
  return (
    <div className="bg-[#080607] py-12 text-[#F8FAFC]">
      <Container className="space-y-8 px-4">
        <header className="max-w-3xl space-y-4">
          <Badge className="bg-[#8B5CF6] text-white">
            Archived late-X update
          </Badge>
          <h1 className="font-display text-4xl font-black md:text-6xl">
            Universal Fest P2 Guide
          </h1>
          <p className="text-lg leading-8 text-[#D8CCC7]">
            Universal Fest P2 belongs to the late Universal Tower Defense X era.
            Keep this page as a historical transition reference; for current
            content, start with the UTDZ Update 4 hub.
          </p>
        </header>

        <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-white">
              What changed in Universal Fest P2
            </h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#B8AAA5]">
              {updateBullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-white">
              Current codes to claim before playing
            </h2>
            <div className="mt-4 space-y-3">
              {eventCodes.slice(0, 6).map((code) => (
                <div
                  key={code.code}
                  className="grid grid-cols-[1fr_auto] gap-3 rounded-md bg-[#100B0C] p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm font-bold text-white">
                      {code.code}
                    </p>
                    <p className="mt-1 line-clamp-1 text-xs text-[#B8AAA5]">
                      {code.reward}
                    </p>
                  </div>
                  <CodeCopyButton code={code.code} />
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-5">
              <LocaleLink href="/codes">Open all codes</LocaleLink>
            </Button>
          </div>
        </section>

        <section className="rounded-lg border border-[#E23A2E]/30 bg-[#1B0A08] p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-white">
            Looking for current UTDZ content?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#D8CCC7]">
            Update 4.0 renamed the existing Roblox experience to Universal Tower
            Defense Z and introduced the current content cycle. The official
            Place ID did not change.
          </p>
          <Button asChild className="mt-5 bg-[#E23A2E] text-[#120707]">
            <LocaleLink href="/updates/update-4">Open Update 4 hub</LocaleLink>
          </Button>
        </section>

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                Universal Fest P2 units to track
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#B8AAA5]">
                The MVP database uses text-only cards. No character art is shown
                unless a reliable source is available later.
              </p>
            </div>
            <Button asChild className="bg-[#E23A2E] text-[#120707]">
              <LocaleLink href="/units">Open units database</LocaleLink>
            </Button>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {universalFestUnits.map((unit) => (
              <LocaleLink
                key={unit.slug}
                href={`/units/${unit.slug}`}
                className="rounded-lg border border-[#322123] bg-[#100B0C] p-4 transition hover:border-[#E23A2E]"
              >
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-[#E23A2E] text-[#120707]">
                    Tier {unit.tier}
                  </Badge>
                  <Badge className="bg-[#F4B942] text-[#120707]">
                    {unit.rarity}
                  </Badge>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-white">
                  {unit.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#B8AAA5]">
                  {unit.role} · {unit.upgradePriority} priority
                </p>
              </LocaleLink>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-white">
            What to do first
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-[#B8AAA5] md:grid-cols-3">
            <p>1. Claim event codes before summoning or rerolling.</p>
            <p>
              2. Compare Merciless God and new units against your existing
              carries.
            </p>
            <p>
              3. Check traits and relics before committing premium resources.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="bg-[#E23A2E] text-[#120707]">
              <LocaleLink href="/guides/merciless-god">
                Merciless God guide
              </LocaleLink>
            </Button>
            <Button asChild variant="outline">
              <LocaleLink href="/traits">Traits</LocaleLink>
            </Button>
            <Button asChild variant="outline">
              <LocaleLink href="/relics">Relics</LocaleLink>
            </Button>
          </div>
        </section>

        <FaqSection
          items={[
            {
              question: 'What is Universal Fest P2 in UTDZ?',
              answer:
                'Universal Fest P2 is a late Universal Tower Defense X update preserved here as transition history. It is not the current UTDZ update; open the Update 4 hub for current coverage.',
            },
            {
              question: 'Is Merciless God the main Universal Fest P2 unit?',
              answer:
                'Yes, it is the clearest headline search target for this update and has its own guide and unit profile.',
            },
            {
              question: 'Should I spend all rerolls on new event units?',
              answer:
                'No. Claim codes first, compare tier and build fit, then spend rerolls only on units you expect to keep.',
            },
          ]}
        />
      </Container>
    </div>
  );
}
