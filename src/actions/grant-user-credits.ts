'use server';

import { addCredits } from '@/credits/credits';
import { CREDIT_TRANSACTION_TYPE } from '@/credits/types';
import { getDb } from '@/db';
import { user } from '@/db/schema';
import type { User } from '@/lib/auth-types';
import { adminActionClient } from '@/lib/safe-action';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const grantUserCreditsSchema = z.object({
  userId: z.string().min(1),
  amount: z.number().int().min(1).max(100000),
  reason: z.string().trim().min(1).max(500),
});

export const grantUserCreditsAction = adminActionClient
  .schema(grantUserCreditsSchema)
  .action(async ({ parsedInput, ctx }) => {
    try {
      const currentUser = (ctx as { user: User }).user;
      const db = await getDb();
      const targetUser = await db
        .select({
          id: user.id,
          email: user.email,
          name: user.name,
        })
        .from(user)
        .where(eq(user.id, parsedInput.userId))
        .limit(1);

      if (!targetUser[0]) {
        return {
          success: false,
          error: 'User not found',
        };
      }

      await addCredits({
        userId: parsedInput.userId,
        amount: parsedInput.amount,
        type: CREDIT_TRANSACTION_TYPE.ADMIN_GRANT,
        description: `Admin grant by ${currentUser.email}: ${parsedInput.reason}`,
      });

      return {
        success: true,
        data: {
          userId: parsedInput.userId,
          amount: parsedInput.amount,
        },
      };
    } catch (error) {
      console.error('grant user credits error:', error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to grant user credits',
      };
    }
  });
