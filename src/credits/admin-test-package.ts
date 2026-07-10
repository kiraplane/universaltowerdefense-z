import 'server-only';

import { getDb } from '@/db';
import { adminTestCreditPackage, user } from '@/db/schema';
import type { User } from '@/lib/auth-types';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';
import { getCreditPackageById } from './server';
import type { CreditPackage } from './types';

export const ADMIN_TEST_CREDIT_PACKAGE_ID = 'admin-test';
const DEFAULT_TEST_PACKAGE_CREDITS = 20;
const DEFAULT_TEST_PACKAGE_EXPIRE_DAYS = 365;
const DEFAULT_TEST_PACKAGE_CURRENCY = 'USD';

export interface AdminTestCreditPackageConfig {
  id: string;
  enabled: boolean;
  credits: number;
  expireDays: number;
  stripePriceId: string;
  priceAmount: number;
  currency: string;
  updatedAt: Date | null;
  updatedBy: string | null;
  updatedByEmail: string | null;
  package: CreditPackage | null;
}

function isAdminUser(user?: Pick<User, 'role'> | null) {
  return user?.role === 'admin';
}

function buildAdminTestCreditPackage(
  config: Pick<
    AdminTestCreditPackageConfig,
    | 'enabled'
    | 'credits'
    | 'expireDays'
    | 'stripePriceId'
    | 'priceAmount'
    | 'currency'
  >
): CreditPackage | null {
  if (!config.enabled || !config.stripePriceId || config.priceAmount <= 0) {
    return null;
  }

  return {
    id: ADMIN_TEST_CREDIT_PACKAGE_ID,
    amount: config.credits,
    expireDays: config.expireDays,
    popular: false,
    name: undefined,
    description: undefined,
    features: undefined,
    price: {
      priceId: config.stripePriceId,
      amount: config.priceAmount,
      currency: config.currency,
      allowPromotionCode: false,
    },
  };
}

function getStripeClient() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set');
  }

  return new Stripe(apiKey);
}

async function resolveStripePrice(priceId: string) {
  const stripe = getStripeClient();
  const price = await stripe.prices.retrieve(priceId);

  if (!price.active) {
    throw new Error('Stripe price is inactive');
  }

  if (price.type !== 'one_time') {
    throw new Error('Test credit package must use a one-time Stripe price');
  }

  if (!price.unit_amount || price.unit_amount <= 0) {
    throw new Error('Stripe price must have a positive unit amount');
  }

  return {
    priceAmount: price.unit_amount,
    currency: price.currency.toUpperCase(),
  };
}

function getDefaultAdminTestCreditPackageConfig(): AdminTestCreditPackageConfig {
  return {
    id: ADMIN_TEST_CREDIT_PACKAGE_ID,
    enabled: false,
    credits: DEFAULT_TEST_PACKAGE_CREDITS,
    expireDays: DEFAULT_TEST_PACKAGE_EXPIRE_DAYS,
    stripePriceId: '',
    priceAmount: 0,
    currency: DEFAULT_TEST_PACKAGE_CURRENCY,
    updatedAt: null,
    updatedBy: null,
    updatedByEmail: null,
    package: null,
  };
}

export async function getAdminTestCreditPackageConfig(): Promise<AdminTestCreditPackageConfig> {
  const db = await getDb();
  const result = await db
    .select({
      id: adminTestCreditPackage.id,
      enabled: adminTestCreditPackage.enabled,
      credits: adminTestCreditPackage.credits,
      expireDays: adminTestCreditPackage.expireDays,
      stripePriceId: adminTestCreditPackage.stripePriceId,
      priceAmount: adminTestCreditPackage.priceAmount,
      currency: adminTestCreditPackage.currency,
      updatedAt: adminTestCreditPackage.updatedAt,
      updatedBy: adminTestCreditPackage.updatedBy,
      updatedByEmail: user.email,
    })
    .from(adminTestCreditPackage)
    .leftJoin(user, eq(adminTestCreditPackage.updatedBy, user.id))
    .where(eq(adminTestCreditPackage.id, ADMIN_TEST_CREDIT_PACKAGE_ID))
    .limit(1);

  if (!result[0]) {
    return getDefaultAdminTestCreditPackageConfig();
  }

  const config = {
    ...result[0],
    currency: result[0].currency.toUpperCase(),
  };

  return {
    ...config,
    package: buildAdminTestCreditPackage(config),
  };
}

export async function upsertAdminTestCreditPackageConfig({
  enabled,
  credits,
  stripePriceId,
  updatedBy,
}: {
  enabled: boolean;
  credits: number;
  stripePriceId: string;
  updatedBy: string;
}) {
  const { priceAmount, currency } = await resolveStripePrice(stripePriceId);
  const db = await getDb();

  await db
    .insert(adminTestCreditPackage)
    .values({
      id: ADMIN_TEST_CREDIT_PACKAGE_ID,
      enabled,
      credits,
      expireDays: DEFAULT_TEST_PACKAGE_EXPIRE_DAYS,
      stripePriceId,
      priceAmount,
      currency,
      updatedBy,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: adminTestCreditPackage.id,
      set: {
        enabled,
        credits,
        stripePriceId,
        priceAmount,
        currency,
        updatedBy,
        updatedAt: new Date(),
      },
    });

  return getAdminTestCreditPackageConfig();
}

export async function getAdminTestCreditPackageForUser(
  currentUser?: Pick<User, 'role'> | null
) {
  if (!isAdminUser(currentUser)) {
    return null;
  }

  const config = await getAdminTestCreditPackageConfig();
  return config.package;
}

export async function resolveCreditPackageForCheckout({
  packageId,
  currentUser,
}: {
  packageId: string;
  currentUser?: Pick<User, 'role'> | null;
}) {
  if (packageId === ADMIN_TEST_CREDIT_PACKAGE_ID) {
    return getAdminTestCreditPackageForUser(currentUser);
  }

  return getCreditPackageById(packageId) ?? null;
}
