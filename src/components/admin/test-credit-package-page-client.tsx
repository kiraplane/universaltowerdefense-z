'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAdminTestCreditPackage } from '@/hooks/use-admin-test-credit-package';
import { useUpdateAdminTestCreditPackage } from '@/hooks/use-admin-test-credit-package';
import { formatDate, formatPrice } from '@/lib/formatter';
import { Loader2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

export function TestCreditPackagePageClient() {
  const t = useTranslations('Dashboard.admin.testCreditPackage');
  const { data, isLoading } = useAdminTestCreditPackage();
  const updateMutation = useUpdateAdminTestCreditPackage();

  const [enabled, setEnabled] = useState(false);
  const [credits, setCredits] = useState('20');
  const [stripePriceId, setStripePriceId] = useState('');

  useEffect(() => {
    if (!data) {
      return;
    }

    setEnabled(data.enabled);
    setCredits(data.credits.toString());
    setStripePriceId(data.stripePriceId);
  }, [data]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedCredits = Number.parseInt(credits, 10);
    if (!Number.isFinite(parsedCredits) || parsedCredits <= 0) {
      toast.error(t('errors.invalidCredits'));
      return;
    }

    if (!stripePriceId.trim()) {
      toast.error(t('errors.invalidStripePriceId'));
      return;
    }

    try {
      await updateMutation.mutateAsync({
        enabled,
        credits: parsedCredits,
        stripePriceId: stripePriceId.trim(),
      });
      toast.success(t('saved'));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t('errors.saveFailed');
      toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {t('loading')}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="grid gap-1">
                <Label htmlFor="admin-test-package-enabled">
                  {t('fields.enabled.label')}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t('fields.enabled.description')}
                </p>
              </div>
              <Switch
                id="admin-test-package-enabled"
                checked={enabled}
                onCheckedChange={setEnabled}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="admin-test-package-credits">
                {t('fields.credits.label')}
              </Label>
              <Input
                id="admin-test-package-credits"
                type="number"
                min={1}
                step={1}
                value={credits}
                onChange={(event) => setCredits(event.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                {t('fields.credits.description')}
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="admin-test-package-price-id">
                {t('fields.stripePriceId.label')}
              </Label>
              <Input
                id="admin-test-package-price-id"
                value={stripePriceId}
                onChange={(event) => setStripePriceId(event.target.value)}
                placeholder="price_123"
              />
              <p className="text-sm text-muted-foreground">
                {t('fields.stripePriceId.description')}
              </p>
            </div>

            <Button
              type="submit"
              className="w-fit cursor-pointer"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending && (
                <Loader2Icon className="mr-2 size-4 animate-spin" />
              )}
              {updateMutation.isPending ? t('saving') : t('save')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('summary.title')}</CardTitle>
          <CardDescription>{t('summary.description')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">
              {t('summary.visible')}
            </span>
            <span>
              {enabled ? t('summary.adminOnly') : t('summary.hidden')}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">
              {t('summary.credits')}
            </span>
            <span>{data?.credits ?? 0}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">{t('summary.price')}</span>
            <span>
              {data?.priceAmount
                ? formatPrice(data.priceAmount, data.currency)
                : t('summary.noPrice')}
            </span>
          </div>
          <div className="grid gap-1">
            <span className="text-muted-foreground">
              {t('summary.currentStripePriceId')}
            </span>
            <span className="break-all font-mono text-xs">
              {data?.stripePriceId || t('summary.noPriceId')}
            </span>
          </div>
          <div className="grid gap-1">
            <span className="text-muted-foreground">
              {t('summary.lastUpdated')}
            </span>
            <span>
              {data?.updatedAt
                ? formatDate(data.updatedAt)
                : t('summary.never')}
            </span>
          </div>
          <div className="grid gap-1">
            <span className="text-muted-foreground">
              {t('summary.updatedBy')}
            </span>
            <span>{data?.updatedByEmail || t('summary.unknown')}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
