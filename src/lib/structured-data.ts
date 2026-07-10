import { websiteConfig } from '@/config/website';
import type { Locale } from 'next-intl';
import {
  getCanonicalBaseUrl,
  getCanonicalImageUrl,
  getCanonicalUrlWithLocale,
} from './urls/urls';

type StructuredData = Record<string, unknown>;

export interface FaqStructuredDataItem {
  question: string;
  answer: string;
}

function getLocaleLanguage(locale: Locale): string {
  return websiteConfig.i18n.locales[locale]?.hreflang || locale;
}

function getOrganizationId(): string {
  return `${getCanonicalBaseUrl()}#organization`;
}

function getOrganizationLogo() {
  const logo = websiteConfig.metadata.images?.logoLight;
  return logo
    ? {
        '@type': 'ImageObject',
        url: getCanonicalImageUrl(logo),
      }
    : undefined;
}

function getOrganizationSameAs(): string[] | undefined {
  const sameAs = Object.values(websiteConfig.metadata.social ?? {}).filter(
    (value): value is string => Boolean(value)
  );

  return sameAs.length > 0 ? sameAs : undefined;
}

export function buildStructuredDataGraph(
  items: StructuredData[]
): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@graph': items,
  };
}

export function buildOrganizationStructuredData({
  name,
  description,
}: {
  name: string;
  description?: string;
}): StructuredData {
  const sameAs = getOrganizationSameAs();
  const logo = getOrganizationLogo();

  return {
    '@type': 'Organization',
    '@id': getOrganizationId(),
    name,
    url: getCanonicalBaseUrl(),
    ...(description && { description }),
    ...(logo && { logo }),
    ...(sameAs && { sameAs }),
  };
}

export function buildWebsiteStructuredData({
  locale,
  name,
  description,
}: {
  locale: Locale;
  name: string;
  description?: string;
}): StructuredData {
  const url = getCanonicalUrlWithLocale('', locale);

  return {
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url,
    name,
    ...(description && { description }),
    inLanguage: getLocaleLanguage(locale),
    publisher: {
      '@id': getOrganizationId(),
    },
  };
}

export function buildSoftwareApplicationStructuredData({
  locale,
  pathname,
  name,
  description,
  organizationName,
  applicationCategory = 'EntertainmentApplication',
  image,
}: {
  locale: Locale;
  pathname: string;
  name: string;
  description: string;
  organizationName: string;
  applicationCategory?: string;
  image?: string;
}): StructuredData {
  const logo = getOrganizationLogo();
  const url = getCanonicalUrlWithLocale(pathname, locale);

  return {
    '@type': 'SoftwareApplication',
    '@id': `${url}#software-application`,
    name,
    url,
    description,
    applicationCategory,
    operatingSystem: 'Web',
    inLanguage: getLocaleLanguage(locale),
    ...(image && { image: getCanonicalImageUrl(image) }),
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      description:
        'The mobile game is free to install where official Android and iOS storefronts make it available.',
    },
    publisher: {
      '@type': 'Organization',
      name: organizationName,
      url: getCanonicalBaseUrl(),
      ...(logo && { logo }),
    },
  };
}

export function buildFaqPageStructuredData({
  locale,
  pathname,
  faqs,
}: {
  locale: Locale;
  pathname: string;
  faqs: FaqStructuredDataItem[];
}): StructuredData {
  const url = getCanonicalUrlWithLocale(pathname, locale);

  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}
