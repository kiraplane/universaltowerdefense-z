'use client';

import { AdminTestCreditPackageCard } from '@/components/credits/admin-test-credit-package-card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useCreditPackages } from '@/config/credits-config';
import { usePricePlans } from '@/config/price-config';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useMounted } from '@/hooks/use-mounted';
import { useLocalePathname } from '@/i18n/navigation';
import { formatPrice } from '@/lib/formatter';
import { cn } from '@/lib/utils';
import {
  PaymentTypes,
  type PlanInterval,
  PlanIntervals,
  type PricePlan,
} from '@/payment/types';
import { CheckCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LoginWrapper } from '../auth/login-wrapper';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { PricingCreditCheckoutButton } from './create-credit-checkout-button';
import { PricingCard } from './pricing-card';

type PricingViewMode = PlanInterval | 'payasyougo';

interface PricingTableProps {
  metadata?: Record<string, string>;
  currentPlan?: PricePlan | null;
  className?: string;
}

/**
 * Pricing Table Component
 *
 * 1. Displays all pricing plans with interval selection tabs for subscription plans,
 * free plans and one-time purchase plans are always displayed
 * 2. If a plan is disabled, it will not be displayed in the pricing table
 * 3. If a price is disabled, it will not be displayed in the pricing table
 * 4. "Pay as you go" tab shows credit packages for one-time credit purchases
 */
export function PricingTable({
  metadata,
  currentPlan,
  className,
}: PricingTableProps) {
  const t = useTranslations('PricingPage');
  const [viewMode, setViewMode] = useState<PricingViewMode>(
    PlanIntervals.MONTH
  );

  const pricePlans = usePricePlans();
  const plans = Object.values(pricePlans);

  const currentPlanId = currentPlan?.id || null;

  const freePlans = plans.filter((plan) => plan.isFree && !plan.disabled);

  const subscriptionPlans = plans.filter(
    (plan) =>
      !plan.isFree &&
      !plan.disabled &&
      plan.prices.some(
        (price) => !price.disabled && price.type === PaymentTypes.SUBSCRIPTION
      )
  );

  const oneTimePlans = plans.filter(
    (plan) =>
      !plan.isFree &&
      !plan.disabled &&
      plan.prices.some(
        (price) => !price.disabled && price.type === PaymentTypes.ONE_TIME
      )
  );

  const hasMonthlyOption = subscriptionPlans.some((plan) =>
    plan.prices.some(
      (price) =>
        price.type === PaymentTypes.SUBSCRIPTION &&
        price.interval === PlanIntervals.MONTH
    )
  );

  const hasYearlyOption = subscriptionPlans.some((plan) =>
    plan.prices.some(
      (price) =>
        price.type === PaymentTypes.SUBSCRIPTION &&
        price.interval === PlanIntervals.YEAR
    )
  );

  const hasSubscriptionPlans = subscriptionPlans.length > 0;
  const isPayAsYouGo = viewMode === 'payasyougo';
  const interval = isPayAsYouGo
    ? PlanIntervals.MONTH
    : (viewMode as PlanInterval);

  // Calculate max yearly discount across all subscription plans
  const maxYearlyDiscount = subscriptionPlans.reduce((max, plan) => {
    const monthly = plan.prices.find(
      (p) =>
        p.type === PaymentTypes.SUBSCRIPTION &&
        p.interval === PlanIntervals.MONTH
    );
    const yearly = plan.prices.find(
      (p) =>
        p.type === PaymentTypes.SUBSCRIPTION &&
        p.interval === PlanIntervals.YEAR
    );
    if (monthly && yearly && monthly.amount > 0) {
      const discount = Math.round(
        (1 - yearly.amount / (monthly.amount * 12)) * 100
      );
      return Math.max(max, discount);
    }
    return max;
  }, 0);

  const handleViewModeChange = (value: string) => {
    setViewMode(value as PricingViewMode);
  };

  return (
    <div className={cn('flex flex-col gap-12', className)}>
      {/* Interval / view mode toggle */}
      {hasSubscriptionPlans && (
        <div className="flex justify-center">
          <ToggleGroup
            size="sm"
            type="single"
            value={viewMode}
            onValueChange={(value) => value && handleViewModeChange(value)}
            className="border rounded-lg p-1"
          >
            {hasMonthlyOption && (
              <ToggleGroupItem
                value="month"
                className={cn(
                  'flex-none min-w-[120px] justify-center px-3 py-0 cursor-pointer text-sm rounded-md whitespace-nowrap',
                  'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
                )}
              >
                {t('monthly')}
              </ToggleGroupItem>
            )}
            {hasYearlyOption && (
              <div className="relative">
                {maxYearlyDiscount > 0 && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold shadow-sm"
                      style={{
                        background: '#ecfeff',
                        border: '1px solid #e9b84a',
                        color: '#92240c',
                      }}
                    >
                      Up to {maxYearlyDiscount}% off
                    </span>
                  </div>
                )}
                <ToggleGroupItem
                  value="year"
                  className={cn(
                    'flex-none min-w-[120px] justify-center px-3 py-0 cursor-pointer text-sm rounded-md whitespace-nowrap',
                    'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
                  )}
                >
                  {t('yearly')}
                </ToggleGroupItem>
              </div>
            )}
            <ToggleGroupItem
              value="payasyougo"
              className={cn(
                'flex-none px-3 py-0 cursor-pointer text-sm rounded-md whitespace-nowrap',
                'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
              )}
            >
              {t('payAsYouGo')}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      )}

      {/* Pay as you go: credit packages in PricingCard-style layout */}
      {isPayAsYouGo ? (
        <PricingCreditsView metadata={metadata} />
      ) : (
        (() => {
          const totalVisiblePlans =
            freePlans.length + subscriptionPlans.length + oneTimePlans.length;
          return (
            <div
              className={cn(
                'grid gap-6',
                totalVisiblePlans === 1 &&
                  'grid-cols-1 max-w-md mx-auto w-full',
                totalVisiblePlans === 2 &&
                  'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto w-full',
                totalVisiblePlans >= 3 &&
                  'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              )}
            >
              {freePlans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  metadata={metadata}
                  isCurrentPlan={currentPlanId === plan.id}
                />
              ))}

              {subscriptionPlans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  interval={interval}
                  paymentType={PaymentTypes.SUBSCRIPTION}
                  metadata={metadata}
                  isCurrentPlan={currentPlanId === plan.id}
                />
              ))}

              {oneTimePlans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  paymentType={PaymentTypes.ONE_TIME}
                  metadata={metadata}
                  isCurrentPlan={currentPlanId === plan.id}
                />
              ))}
            </div>
          );
        })()
      )}
    </div>
  );
}

/**
 * Pay as you go credit packages view — matches PricingCard layout style
 */
function PricingCreditsView({
  metadata,
}: {
  metadata?: Record<string, string>;
}) {
  const tPkg = useTranslations('Dashboard.settings.credits.packages');
  const tCard = useTranslations('PricingPage.PricingCard');
  const creditPackages = Object.values(useCreditPackages()).filter(
    (pkg) => !pkg.disabled && pkg.price.priceId
  );
  const currentUser = useCurrentUser();
  const currentPath = useLocalePathname();
  const mounted = useMounted();

  return (
    <div
      className={cn(
        'grid gap-6',
        creditPackages.length === 1 && 'grid-cols-1 max-w-md mx-auto w-full',
        creditPackages.length === 2 &&
          'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto w-full',
        creditPackages.length === 3 &&
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        creditPackages.length >= 4 &&
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      )}
    >
      {creditPackages.map((pkg) => (
        <Card
          key={pkg.id}
          className={cn(
            'flex flex-col h-full',
            pkg.popular &&
              'relative border-2 border-primary shadow-lg shadow-primary/10'
          )}
        >
          {pkg.popular && (
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
              <Badge
                variant="default"
                className="bg-primary text-primary-foreground"
              >
                {tCard('popular')}
              </Badge>
            </div>
          )}

          <CardHeader>
            <CardTitle>
              <h3 className="font-medium">{pkg.name}</h3>
            </CardTitle>

            {/* Price display */}
            <div className="flex items-baseline gap-2">
              <span className="my-4 block text-4xl font-semibold">
                {formatPrice(pkg.price.amount, pkg.price.currency)}
              </span>
            </div>

            <CardDescription>
              <p className="text-sm">{pkg.description}</p>
            </CardDescription>

            {/* Purchase button */}
            {mounted && currentUser ? (
              <PricingCreditCheckoutButton
                userId={currentUser.id}
                packageId={pkg.id}
                priceId={pkg.price.priceId}
                amount={pkg.price.amount}
                creditsAmount={pkg.amount}
                currency={pkg.price.currency}
                metadata={metadata}
                className="mt-4 w-full cursor-pointer"
                variant={pkg.popular ? 'default' : 'outline'}
                disabled={!pkg.price.priceId}
              >
                {tPkg('purchase')}
              </PricingCreditCheckoutButton>
            ) : (
              <LoginWrapper mode="modal" asChild callbackUrl={currentPath}>
                <Button
                  variant={pkg.popular ? 'default' : 'outline'}
                  className="mt-4 w-full cursor-pointer"
                >
                  {tPkg('purchase')}
                </Button>
              </LoginWrapper>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            <hr className="border-dashed" />

            <ul className="list-outside space-y-4 text-sm">
              {pkg.features && pkg.features.length > 0 ? (
                pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircleIcon className="size-4 shrink-0 text-green-500 dark:text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="size-4 shrink-0 text-green-500 dark:text-green-400" />
                    <span>{pkg.amount.toLocaleString()} credits</span>
                  </li>
                  {pkg.expireDays && (
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="size-4 shrink-0 text-green-500 dark:text-green-400" />
                      <span>Valid for {pkg.expireDays} days</span>
                    </li>
                  )}
                </>
              )}
            </ul>
          </CardContent>
        </Card>
      ))}
      <AdminTestCreditPackageCard mode="pricing" metadata={metadata} />
    </div>
  );
}
