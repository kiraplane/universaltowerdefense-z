'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import { useTranslations } from 'next-intl';

export function useFooterLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.footer');

  return [
    {
      title: t('wiki.title'),
      items: [
        {
          title: t('wiki.items.codes'),
          href: Routes.Codes,
          external: false,
        },
        {
          title: t('wiki.items.tierList'),
          href: Routes.TierList,
          external: false,
        },
        {
          title: t('wiki.items.units'),
          href: Routes.Units,
          external: false,
        },
        {
          title: t('wiki.items.traits'),
          href: Routes.Traits,
          external: false,
        },
        {
          title: t('wiki.items.relics'),
          href: Routes.Relics,
          external: false,
        },
      ],
    },
    {
      title: t('guides.title'),
      items: [
        {
          title: t('guides.items.all'),
          href: Routes.Guides,
          external: false,
        },
        {
          title: t('guides.items.beginner'),
          href: Routes.BeginnerGuide,
          external: false,
        },
        {
          title: t('guides.items.mercilessGod'),
          href: '/guides/update-4-new-units',
          external: false,
        },
        {
          title: t('guides.items.updates'),
          href: Routes.Updates,
          external: false,
        },
      ],
    },
    {
      title: t('legal.title'),
      items: [
        {
          title: t('legal.items.privacyPolicy'),
          href: Routes.PrivacyPolicy,
          external: false,
        },
        {
          title: t('legal.items.termsOfService'),
          href: Routes.TermsOfService,
          external: false,
        },
        {
          title: t('legal.items.cookiePolicy'),
          href: Routes.CookiePolicy,
          external: false,
        },
        {
          title: t('legal.items.disclaimer'),
          href: Routes.Disclaimer,
          external: false,
        },
      ],
    },
  ];
}
