import { postFetch } from '@/shared/services/fetcher';

export const resetUserPassword = async (userEmail: string) => {
  return await postFetch('/v1/users/password-recovery-pin', {
    email: userEmail,
  });
};
