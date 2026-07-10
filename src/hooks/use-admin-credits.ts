import { getAdminUserCreditBalanceAction } from '@/actions/get-admin-user-credit-balance';
import { grantUserCreditsAction } from '@/actions/grant-user-credits';
import { creditsKeys } from '@/hooks/use-credits';
import { usersKeys } from '@/hooks/use-users';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const adminCreditsKeys = {
  all: ['admin-credits'] as const,
  userBalance: (userId: string) =>
    [...adminCreditsKeys.all, 'user-balance', userId] as const,
};

export function useAdminUserCreditBalance(userId: string, enabled = true) {
  return useQuery({
    queryKey: adminCreditsKeys.userBalance(userId),
    enabled: enabled && !!userId,
    queryFn: async () => {
      const result = await getAdminUserCreditBalanceAction({ userId });
      if (!result?.data?.success) {
        throw new Error(
          result?.data?.error || 'Failed to fetch user credit balance'
        );
      }

      return result.data.data?.credits || 0;
    },
  });
}

export function useGrantUserCredits() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      amount,
      reason,
    }: {
      userId: string;
      amount: number;
      reason: string;
    }) => {
      const result = await grantUserCreditsAction({
        userId,
        amount,
        reason,
      });

      if (!result?.data?.success) {
        throw new Error(result?.data?.error || 'Failed to grant user credits');
      }

      return result.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminCreditsKeys.userBalance(variables.userId),
      });
      queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: creditsKeys.all,
      });
    },
  });
}
