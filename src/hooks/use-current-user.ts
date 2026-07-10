import { authClient } from '@/lib/auth-client';

export const useCurrentUser = () => {
  const { data: session, error } = authClient.useSession();
  // console.log('useCurrentUser, session:', session);
  if (error) {
    // Silently handle error - user is not authenticated
    return null;
  }
  return session?.user;
};
