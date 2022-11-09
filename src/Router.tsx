import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from './modules/navigation/404';
import { MUIThemeProvider } from './shared/providers/muiThemeProvider';
import QueryProvider from './shared/providers/queryProvider';
import { UserProvider } from './shared/providers/userProvider';

const AuthRouter = lazy(() => import('@/pages/auth/authRouter'));
const AppRouter = lazy(() => import('@/pages/base/appRouter'));

export function GlobalRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <MUIThemeProvider>
        <UserProvider>
          <QueryProvider>
            <AuthRouter />
            <AppRouter />
          </QueryProvider>
        </UserProvider>
      </MUIThemeProvider>
    </BrowserRouter>
  );
}
