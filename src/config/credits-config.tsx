'use client';

import type { CreditPackage } from '@/credits/types';
import { useTranslations } from 'next-intl';
import { websiteConfig } from './website';

/**
 * Get credit packages with translations for client components
 *
 * NOTICE: This function should only be used in client components.
 * If you need to get the credit packages in server components, use getAllCreditPackages instead.
 * Use this function when showing the credit packages to the user.
 *
 * docs:
 * https://mksaas.com/docs/config/credits
 *
 * @returns The credit packages with translated content
 */
export function useCreditPackages(): Record<string, CreditPackage> {
  const t = useTranslations('CreditPackages');
  const creditConfig = websiteConfig.credits;
  const packages: Record<string, CreditPackage> = {};

  // Add translated content to each plan
  if (creditConfig.packages.basic) {
    packages.basic = {
      ...creditConfig.packages.basic,
      name: t('basic.name'),
      description: t('basic.description'),
      features: [
        t('basic.features.feature-1'),
        t('basic.features.feature-2'),
        t('basic.features.feature-3'),
        t('basic.features.feature-4'),
        t('basic.features.feature-5'),
        t('basic.features.feature-6'),
        t('basic.features.feature-7'),
        t('basic.features.feature-8'),
        t('basic.features.feature-9'),
        t('basic.features.feature-10'),
      ],
    };
  }

  if (creditConfig.packages.standard) {
    packages.standard = {
      ...creditConfig.packages.standard,
      name: t('standard.name'),
      description: t('standard.description'),
      features: [
        t('standard.features.feature-1'),
        t('standard.features.feature-2'),
        t('standard.features.feature-3'),
        t('standard.features.feature-4'),
        t('standard.features.feature-5'),
        t('standard.features.feature-6'),
        t('standard.features.feature-7'),
        t('standard.features.feature-8'),
        t('standard.features.feature-9'),
        t('standard.features.feature-10'),
      ],
    };
  }

  if (creditConfig.packages.premium) {
    packages.premium = {
      ...creditConfig.packages.premium,
      name: t('premium.name'),
      description: t('premium.description'),
      features: [
        t('premium.features.feature-1'),
        t('premium.features.feature-2'),
        t('premium.features.feature-3'),
        t('premium.features.feature-4'),
        t('premium.features.feature-5'),
        t('premium.features.feature-6'),
        t('premium.features.feature-7'),
        t('premium.features.feature-8'),
        t('premium.features.feature-9'),
        t('premium.features.feature-10'),
      ],
    };
  }

  if (creditConfig.packages.enterprise) {
    packages.enterprise = {
      ...creditConfig.packages.enterprise,
      name: t('enterprise.name'),
      description: t('enterprise.description'),
    };
  }

  return packages;
}
