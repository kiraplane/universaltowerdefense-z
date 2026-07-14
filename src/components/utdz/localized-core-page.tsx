import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { activeCodes } from '@/data/utdz/codes';
import { guides } from '@/data/utdz/guides';
import type { LocalizedCoreKey } from '@/data/utdz/localized-core';
import { getLocalizedCoreCopy } from '@/data/utdz/localized-core';
import { updateFourMetaWatch } from '@/data/utdz/tier-list';
import { LocaleLink } from '@/i18n/navigation';

function getRows(key: LocalizedCoreKey) {
  if (key === 'codes') {
    return activeCodes.map((code) => ({
      title: code.code,
      label: code.reward,
      body: code.notes,
    }));
  }
  if (key === 'tier-list' || key === 'units') {
    return updateFourMetaWatch.map((unit) => ({
      title: unit.name,
      label: unit.role,
      body: unit.decision,
    }));
  }
  if (key === 'guides') {
    return guides.slice(0, 10).map((guide) => ({
      title: guide.title,
      label: guide.difficulty,
      body: guide.summary,
      href: `/guides/${guide.slug}`,
    }));
  }
  return [
    {
      title: 'Update 4.0',
      label: 'Current version',
      body: 'Claim current codes, choose one event lane, and verify live evolution requirements before spending.',
      href: '/updates/update-4',
    },
    {
      title: 'Codes',
      label: `${activeCodes.length} active entries`,
      body: 'Use current rewards before summons, trait rerolls, and event purchases.',
      href: '/codes',
    },
    {
      title: 'Tier and units',
      label: 'Role-first planning',
      body: 'Compare established units with the current Update 4 watchlist.',
      href: '/tier-list',
    },
  ];
}

export function LocalizedCorePage({
  locale,
  pageKey,
}: {
  locale: string;
  pageKey: LocalizedCoreKey;
}) {
  const copy = getLocalizedCoreCopy(locale, pageKey);
  if (!copy) return null;
  const rows = getRows(pageKey);

  return (
    <div className="bg-[#080607] py-12 text-[#F8FAFC]">
      <Container className="space-y-8 px-4">
        <header className="max-w-3xl space-y-4">
          <Badge className="bg-[#E23A2E] text-white">Update 4</Badge>
          <h1 className="font-display text-4xl font-black md:text-6xl">
            {copy.title}
          </h1>
          <p className="text-lg leading-8 text-[#D8CCC7]">
            {copy.description}
          </p>
        </header>

        <section className="rounded-lg border border-[#322123] bg-[#151011] p-6">
          <ol className="grid gap-3 text-sm leading-7 text-[#B8AAA5] md:grid-cols-3">
            {copy.steps.map((step, index) => (
              <li key={step}>
                <strong className="text-[#F4B942]">{index + 1}.</strong>{' '}
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-4">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-bold">
              {copy.dataHeading}
            </h2>
            <p className="mt-2 text-sm leading-7 text-[#B8AAA5]">
              {copy.dataIntro}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {rows.map((row) => (
              <article
                key={row.title}
                className="rounded-lg border border-[#322123] bg-[#151011] p-5"
              >
                <h3 className="font-display text-xl font-bold text-white">
                  {'href' in row && row.href ? (
                    <LocaleLink href={row.href}>{row.title}</LocaleLink>
                  ) : (
                    row.title
                  )}
                </h3>
                <p className="mt-2 text-sm font-semibold text-[#F4B942]">
                  {row.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#B8AAA5]">
                  {row.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-[#E23A2E] text-white">
            <LocaleLink href="/tier-list">{copy.tierCta}</LocaleLink>
          </Button>
          <Button asChild variant="outline">
            <LocaleLink href={pageKey === 'codes' ? '/updates/update-4' : '/guides'}>
              {copy.guidesCta}
            </LocaleLink>
          </Button>
        </div>
      </Container>
    </div>
  );
}
