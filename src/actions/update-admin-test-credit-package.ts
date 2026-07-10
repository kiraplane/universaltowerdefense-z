'use server';

import { upsertAdminTestCreditPackageConfig } from '@/credits/admin-test-package';
import type { User } from '@/lib/auth-types';
import { adminActionClient } from '@/lib/safe-action';
import { z } from 'zod';

const updateAdminTestCreditPackageSchema = z.object({
  enabled: z.boolean(),
  credits: z.number().int().min(1).max(100000),
  stripePriceId: z.string().trim().min(1),
});

export const updateAdminTestCreditPackageAction = adminActionClient
  .schema(updateAdminTestCreditPackageSchema)
  .action(async ({ parsedInput, ctx }) => {
    try {
      const currentUser = (ctx as { user: User }).user;
      const config = await upsertAdminTestCreditPackageConfig({
        ...parsedInput,
        updatedBy: currentUser.id,
      });

      return {
        success: true,
        data: config,
      };
    } catch (error) {
      console.error('update admin test credit package error:', error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to update admin test credit package',
      };
    }
  });
