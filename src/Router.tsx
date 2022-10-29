import { lazy } from 'react';
import { useAuth } from '@/shared/providers/userProvider';

const AuthRouter = lazy(() => import('@/pages/auth/authRouter'));
const AppRouter = lazy(() => import('@/pages/base/appRouter'));

export function GlobalRouter() {
  const { token } = useAuth();

  return !token ? <AuthRouter /> : <AppRouter />;
}
