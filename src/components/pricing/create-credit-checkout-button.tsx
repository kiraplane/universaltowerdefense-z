'use client';

import { createCreditCheckoutSession } from '@/actions/create-credit-checkout-session';
import { Button } from '@/components/ui/button';
import { websiteConfig } from '@/config/website';
import { trackEvent } from '@/lib/gtm';
import { Loader2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

interface PricingCreditCheckoutButtonProps {
  userId: string;
  packageId: string;
  priceId: string;
  amount?: number;
  creditsAmount?: number;
  currency?: string;
  metadata?: Record<string, string>;
  variant?:
    | 'default'
    | 'outline'
    | 'destructive'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export function PricingCreditCheckoutButton({
  userId,
  packageId,
  priceId,
  amount,
  creditsAmount,
  currency = 'USD',
  metadata,
  variant = 'default',
  className,
  children,
  disabled = false,
}: PricingCreditCheckoutButtonProps) {
  const t = useTranslations('PricingPage.CheckoutButton');
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      trackEvent('click_buy_credits', {
        package_id: packageId,
        amount: amount,
        credits_amount: creditsAmount,
        currency: currency,
      });

      setIsLoading(true);

      const mergedMetadata = metadata ? { ...metadata } : {};

      if (websiteConfig.features.enablePromotekitAffiliate) {
        const promotekitReferral =
          typeof window !== 'undefined'
            ? (window as any).promotekit_referral
            : undefined;
        if (promotekitReferral) {
          mergedMetadata.promotekit_referral = promotekitReferral;
        }
      }

      if (websiteConfig.features.enableAffonsoAffiliate) {
        const affonsoReferral =
          typeof document !== 'undefined'
            ? (() => {
                const match = document.cookie.match(
                  /(?:^|; )affonso_referral=([^;]*)/
                );
                return match ? decodeURIComponent(match[1]) : null;
              })()
            : null;
        if (affonsoReferral) {
          mergedMetadata.affonso_referral = affonsoReferral;
        }
      }

      const result = await createCreditCheckoutSession({
        userId,
        packageId,
        priceId,
        metadata:
          Object.keys(mergedMetadata).length > 0 ? mergedMetadata : undefined,
      });

      if (result?.data?.success && result.data.data?.url) {
        window.location.href = result.data.data?.url;
      } else {
        toast.error(result?.data?.error || t('checkoutFailed'));
      }
    } catch (error) {
      console.error('Create credit checkout session error:', error);
      toast.error(error instanceof Error ? error.message : t('checkoutFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <>
          <Loader2Icon className="mr-2 size-4 animate-spin" />
          {t('loading')}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
