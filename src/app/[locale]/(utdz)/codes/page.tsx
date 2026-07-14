import Container from '@/components/layout/container';
import { LocalizedCorePage } from '@/components/utdz/localized-core-page';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeCopyButton } from '@/components/utdz/code-copy-button';
import { FaqSection } from '@/components/utdz/faq-section';
import { activeCodes, expiredCodes } from '@/data/utdz/codes';
import { getLocalizedCoreCopy } from '@/data/utdz/localized-core';
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
  const localized = getLocalizedCoreCopy(locale, 'codes');
  return constructMetadata({
    title:
      localized?.title ??
      'Universal Tower Defense Z Codes - Update 4 Active Codes',
    description:
      localized?.description ??
      'Copy five active UTDZ Update 4 codes for a Ruler Ticket, Trait Rerolls, Gems, Universal Gems, and Summer Currency.',
    locale,
    pathname: '/codes',
  });
}

function CodesTable({
  title,
  codes,
}: {
  title: string;
  codes: typeof activeCodes;
}) {
  return (
    <section className="rounded-lg border border-[#322123] bg-[#151011] shadow-sm">
      <div className="border-[#322123] border-b p-5">
        <h2 className="font-display text-2xl font-bold text-white">
          {title} ({codes.length})
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-[#100B0C] text-[#B8AAA5]">
            <tr>
              <th className="px-5 py-3">Code</th>
              <th className="px-5 py-3">Reward</th>
              <th className="px-5 py-3">Checked</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((item) => (
              <tr key={item.code} className="border-[#322123] border-t">
                <td className="px-5 py-4 font-mono font-bold text-white">
                  {item.code}
                </td>
                <td className="px-5 py-4 text-[#D8CCC7]">{item.reward}</td>
                <td className="px-5 py-4">
                  <Badge className="bg-[#F4B942] text-[#1B0A08]">
                    {item.lastChecked}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <CodeCopyButton code={item.code} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default async function CodesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (locale !== 'en') return <LocalizedCorePage locale={locale} pageKey="codes" />;
  return (
    <div className="bg-[#080607] py-12 text-[#F8FAFC]">
      <Container className="space-y-8 px-4">
        <header className="max-w-3xl space-y-4">
          <Badge className="bg-[#E23A2E] text-white">Update 4 codes</Badge>
          <h1 className="font-display text-4xl font-black md:text-6xl">
            Universal Tower Defense Z Codes
          </h1>
          <p className="text-lg leading-8 text-[#D8CCC7]">
            Copy the five active UTDZ codes before you summon, reroll traits, or
            commit relic resources. The current rewards include a Ruler Ticket,
            Trait Rerolls, Gems, Universal Gems, and Summer Currency.
          </p>
        </header>

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-white">
            How to redeem Universal Tower Defense Z codes
          </h2>
          <ol className="mt-4 grid gap-3 text-sm leading-6 text-[#B8AAA5] md:grid-cols-3">
            <li>1. Open Universal Tower Defense Z on Roblox.</li>
            <li>2. Find the in-game Codes button or code menu.</li>
            <li>3. Paste the code exactly and press Redeem.</li>
          </ol>
        </section>

        <CodesTable title="Active UTDZ Update 4 codes" codes={activeCodes} />

        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-lg border border-[#322123] bg-[#151011] p-5">
            <h2 className="font-display text-2xl font-bold text-white">
              Code notes
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#B8AAA5]">
              {activeCodes.slice(0, 8).map((item) => (
                <li key={item.code}>
                  <strong className="text-white">{item.code}:</strong>{' '}
                  {item.notes}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-[#322123] bg-[#151011] p-5">
            <h2 className="font-display text-2xl font-bold text-white">
              Expired UTDZ codes
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#B8AAA5]">
              These recent 3.x strings are kept here so a large reward list is
              not mistaken for a working code.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {expiredCodes.map((item) => (
                <Badge
                  key={item.code}
                  variant="outline"
                  className="border-[#5A3A36] text-[#B8AAA5] line-through"
                >
                  {item.code}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-white">
            After redeeming UTDZ codes
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#B8AAA5]">
            Code rewards are easiest to waste right after claiming them. Check
            the tier list first, compare traits, then decide whether the unit
            deserves relic farming or premium rerolls.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="bg-[#E23A2E] text-[#120707]">
              <LocaleLink href="/tier-list">UTDZ tier list</LocaleLink>
            </Button>
            <Button asChild variant="outline">
              <LocaleLink href="/traits">Traits</LocaleLink>
            </Button>
            <Button asChild variant="outline">
              <LocaleLink href="/guides/beginner-guide">
                Beginner guide
              </LocaleLink>
            </Button>
          </div>
        </section>

        <FaqSection
          items={[
            {
              question: 'Why does a Universal Tower Defense Z code fail?',
              answer:
                'Most failures come from typos, missing punctuation, previous redemption, expired campaigns, server rollout timing, or level/account requirements.',
            },
            {
              question: 'Are UTDZ codes case-sensitive?',
              answer:
                'Yes. Copy the code exactly, including capitalization and exclamation marks.',
            },
            {
              question: 'Which codes are new for Update 4?',
              answer:
                'The July 9 set is SrryForWhoopsie!, TheGuyFromSmash!, SpectacularSpider!, ReapersVsHollowDestroyers, and Summer2026!.',
            },
            {
              question: 'Should beginners redeem UTDZ codes first?',
              answer:
                'Yes. Free rewards are most useful before you summon heavily, reroll traits, or commit to a relic path.',
            },
            {
              question: 'Where should I go after redeeming codes?',
              answer:
                'Open the beginner guide, tier list, units, and traits pages before spending Gems, Gold, Trait Rerolls, Relic Rerolls, or fragments.',
            },
          ]}
        />
      </Container>
    </div>
  );
}
