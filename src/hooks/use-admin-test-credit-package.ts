import { getAdminTestCreditPackageAction } from '@/actions/get-admin-test-credit-package';
import { updateAdminTestCreditPackageAction } from '@/actions/update-admin-test-credit-package';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const adminTestCreditPackageKeys = {
  all: ['admin-test-credit-package'] as const,
  config: () => [...adminTestCreditPackageKeys.all, 'config'] as const,
};

export function useAdminTestCreditPackage(enabled = true) {
  return useQuery({
    queryKey: adminTestCreditPackageKeys.config(),
    enabled,
    queryFn: async () => {
      const result = await getAdminTestCreditPackageAction();
      if (!result?.data?.success) {
        throw new Error(
          result?.data?.error || 'Failed to fetch admin test credit package'
        );
      }

      return result.data.data || null;
    },
  });
}

export function useUpdateAdminTestCreditPackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      enabled,
      credits,
      stripePriceId,
    }: {
      enabled: boolean;
      credits: number;
      stripePriceId: string;
    }) => {
      const result = await updateAdminTestCreditPackageAction({
        enabled,
        credits,
        stripePriceId,
      });

      if (!result?.data?.success) {
        throw new Error(
          result?.data?.error || 'Failed to update admin test credit package'
        );
      }

      return result.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminTestCreditPackageKeys.all,
      });
    },
  });
}
