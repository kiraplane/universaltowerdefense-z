'use server';

import { getAdminTestCreditPackageConfig } from '@/credits/admin-test-package';
import { actionClient } from '@/lib/safe-action';
import { getSession } from '@/lib/server';

export const getAdminTestCreditPackageAction = actionClient.action(async () => {
  try {
    const session = await getSession();
    if (!session?.user || session.user.role !== 'admin') {
      return {
        success: true,
        data: null,
      };
    }

    const config = await getAdminTestCreditPackageConfig();
    return {
      success: true,
      data: config,
    };
  } catch (error) {
    console.error('get admin test credit package error:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch admin test credit package',
    };
  }
});
