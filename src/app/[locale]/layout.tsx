import { Analytics } from '@/analytics/analytics';
import GoogleAnalytics from '@/analytics/google-analytics';
import {
  fontBricolageGrotesque,
  fontNotoSans,
  fontNotoSansMono,
  fontNotoSerif,
} from '@/assets/fonts';
import AffonsoScript from '@/components/affiliate/affonso';
import PromotekitScript from '@/components/affiliate/promotekit';
import { TailwindIndicator } from '@/components/layout/tailwind-indicator';
import { getMessagesForLocale } from '@/i18n/messages';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { type Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { ComponentProps, ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Providers } from './providers';

import '@/styles/globals.css';

type MessageMap = Record<string, unknown>;
type ClientMessages = ComponentProps<typeof NextIntlClientProvider>['messages'];

const CLIENT_MESSAGE_NAMESPACES = [
  'Metadata',
  'Common',
  'PricingPage',
  'PricePlans',
  'CreditPackages',
  'NotFoundPage',
  'ErrorPage',
  'Newsletter',
  'AuthPage',
  'PremiumContent',
  'Dashboard',
  'Mail',
] as const;

const MARKETING_NAVBAR_KEYS = [
  'home',
  'codes',
  'tierList',
  'units',
  'traits',
  'relics',
  'guides',
] as const;

const MARKETING_FOOTER_KEYS = ['tagline', 'wiki', 'guides', 'legal'] as const;
const MARKETING_FOOTER_GUIDE_ITEM_KEYS = [
  'all',
  'beginner',
  'mercilessGod',
  'updates',
] as const;

function pickKeys<T extends MessageMap, K extends readonly string[]>(
  source: T | undefined,
  keys: K
) {
  return Object.fromEntries(
    keys
      .filter((key) => source && key in source)
      .map((key) => [key, source?.[key]])
  );
}

function pickMarketingFooter(footer: MessageMap | undefined) {
  const selectedFooter = pickKeys(footer, MARKETING_FOOTER_KEYS) as MessageMap;
  const guides = selectedFooter.guides as MessageMap | undefined;
  const guideItems = guides?.items as MessageMap | undefined;

  if (guides && guideItems) {
    selectedFooter.guides = {
      ...guides,
      items: pickKeys(guideItems, MARKETING_FOOTER_GUIDE_ITEM_KEYS),
    };
  }

  return selectedFooter;
}

function pickClientMessages(messages: MessageMap) {
  const marketing = messages.Marketing as MessageMap | undefined;
  const navbar = marketing?.navbar as MessageMap | undefined;
  const footer = marketing?.footer as MessageMap | undefined;

  return {
    ...pickKeys(messages, CLIENT_MESSAGE_NAMESPACES),
    Marketing: {
      navbar: pickKeys(navbar, MARKETING_NAVBAR_KEYS),
      footer: pickMarketingFooter(footer),
      avatar: marketing?.avatar,
    },
  };
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

/**
 * 1. Locale Layout
 * https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#layout
 *
 * 2. NextIntlClientProvider
 * https://next-intl.dev/docs/usage/configuration#nextintlclientprovider
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessagesForLocale(locale);
  const clientMessages = pickClientMessages(messages as MessageMap);

  return (
    <html suppressHydrationWarning lang={locale}>
      <head>
        <GoogleAnalytics />
        <AffonsoScript />
        <PromotekitScript />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          'size-full antialiased',
          fontNotoSans.className,
          fontNotoSerif.variable,
          fontNotoSansMono.variable,
          fontBricolageGrotesque.variable
        )}
      >
        <NuqsAdapter>
          <NextIntlClientProvider messages={clientMessages as ClientMessages}>
            <Providers>
              {children}

              <Toaster richColors position="top-right" offset={64} />
              <TailwindIndicator />
              <Analytics />
            </Providers>
          </NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
