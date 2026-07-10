'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import {
  BookOpen,
  ClipboardList,
  Database,
  Gem,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export function useNavbarLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.navbar');

  return [
    {
      title: t('codes.title'),
      href: Routes.Codes,
      external: false,
      icon: <ClipboardList className="size-4" />,
    },
    {
      title: t('tierList.title'),
      href: Routes.TierList,
      external: false,
      icon: <Trophy className="size-4" />,
    },
    {
      title: t('units.title'),
      href: Routes.Units,
      external: false,
      icon: <Database className="size-4" />,
    },
    {
      title: t('traits.title'),
      href: Routes.Traits,
      external: false,
      icon: <Sparkles className="size-4" />,
    },
    {
      title: t('relics.title'),
      href: Routes.Relics,
      external: false,
      icon: <Gem className="size-4" />,
    },
    {
      title: t('guides.title'),
      href: Routes.Guides,
      external: false,
      icon: <BookOpen className="size-4" />,
    },
  ];
}
