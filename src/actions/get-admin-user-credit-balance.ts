'use server';

import { getUserCredits } from '@/credits/credits';
import { getDb } from '@/db';
import { user } from '@/db/schema';
import { adminActionClient } from '@/lib/safe-action';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const getAdminUserCreditBalanceSchema = z.object({
  userId: z.string().min(1),
});

export const getAdminUserCreditBalanceAction = adminActionClient
  .schema(getAdminUserCreditBalanceSchema)
  .action(async ({ parsedInput }) => {
    try {
      const db = await getDb();
      const targetUser = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.id, parsedInput.userId))
        .limit(1);

      if (!targetUser[0]) {
        return {
          success: false,
          error: 'User not found',
        };
      }

      const credits = await getUserCredits(parsedInput.userId);
      return {
        success: true,
        data: {
          credits,
        },
      };
    } catch (error) {
      console.error('get admin user credit balance error:', error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch user credit balance',
      };
    }
  });
