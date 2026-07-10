'use client';

import { PricingCreditCheckoutButton } from '@/components/pricing/create-credit-checkout-button';
import { CreditCheckoutButton } from '@/components/settings/credits/credit-checkout-button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAdminTestCreditPackage } from '@/hooks/use-admin-test-credit-package';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useMounted } from '@/hooks/use-mounted';
import { formatPrice } from '@/lib/formatter';
import { cn } from '@/lib/utils';
import { CheckCircleIcon, FlaskConicalIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface AdminTestCreditPackageCardProps {
  mode: 'settings' | 'pricing';
  metadata?: Record<string, string>;
}

export function AdminTestCreditPackageCard({
  mode,
  metadata,
}: AdminTestCreditPackageCardProps) {
  const t = useTranslations('Dashboard.admin.testCreditPackage.preview');
  const mounted = useMounted();
  const currentUser = useCurrentUser();
  const isAdmin = currentUser?.role === 'admin';
  const { data } = useAdminTestCreditPackage(isAdmin);

  if (!mounted || !isAdmin || !currentUser || !data?.package) {
    return null;
  }

  const pkg = data.package;

  if (mode === 'settings') {
    return (
      <Card className="relative border-dashed border-primary/50 shadow-none border-1">
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge variant="default">{t('badge')}</Badge>
        </div>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="text-left">
              <div className="text-2xl font-semibold flex items-center gap-2">
                <FlaskConicalIcon className="h-4 w-4 text-muted-foreground" />
                {pkg.amount.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {formatPrice(pkg.price.amount, pkg.price.currency)}
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground text-left py-2 flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
            {t('description')}
          </div>

          <CreditCheckoutButton
            userId={currentUser.id}
            packageId={pkg.id}
            priceId={pkg.price.priceId}
            amount={pkg.price.amount}
            creditsAmount={pkg.amount}
            currency={pkg.price.currency}
            metadata={metadata}
            className="w-full cursor-pointer mt-2"
            variant="outline"
          >
            {t('purchase')}
          </CreditCheckoutButton>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full relative border-2 border-dashed border-primary/50">
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <Badge variant="default">{t('badge')}</Badge>
      </div>

      <CardHeader>
        <CardTitle>
          <h3 className="font-medium">{t('name')}</h3>
        </CardTitle>

        <div className="flex items-baseline gap-2">
          <span className="my-4 block text-4xl font-semibold">
            {formatPrice(pkg.price.amount, pkg.price.currency)}
          </span>
        </div>

        <CardDescription>
          <p className="text-sm">{t('description')}</p>
        </CardDescription>

        <PricingCreditCheckoutButton
          userId={currentUser.id}
          packageId={pkg.id}
          priceId={pkg.price.priceId}
          amount={pkg.price.amount}
          creditsAmount={pkg.amount}
          currency={pkg.price.currency}
          metadata={metadata}
          className="mt-4 w-full cursor-pointer"
          variant="outline"
        >
          {t('purchase')}
        </PricingCreditCheckoutButton>
      </CardHeader>

      <CardContent className="space-y-4">
        <hr className="border-dashed" />

        <ul className="list-outside space-y-4 text-sm">
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="size-4 shrink-0 text-green-500 dark:text-green-400" />
            <span>{t('adminOnly')}</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="size-4 shrink-0 text-green-500 dark:text-green-400" />
            <span>{t('credits', { count: pkg.amount })}</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="size-4 shrink-0 text-green-500 dark:text-green-400" />
            <span>{t('oneTimePurchase')}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
