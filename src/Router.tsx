import { lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MUIThemeProvider } from './shared/providers/muiThemeProvider';
import QueryProvider from './shared/providers/queryProvider';
import { UserProvider } from './shared/providers/userProvider';

const AuthRouter = lazy(() => import('@/pages/auth/authRouter'));
const AppRouter = lazy(() => import('@/pages/base/appRouter'));

export function GlobalRouter() {
  return (
    <BrowserRouter>
      <MUIThemeProvider>
        <UserProvider>
          <QueryProvider>
            <AppRouter />
            <AuthRouter />
          </QueryProvider>
        </UserProvider>
      </MUIThemeProvider>
    </BrowserRouter>
  );
}
