import { UserProvider } from '@/shared/providers/userProvider';
import { GlobalRouter } from '@/Router';
import QueryProvider from '@/shared/providers/queryProvider';
import { MUIThemeProvider } from './shared/providers/muiThemeProvider';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MUIThemeProvider>
        <UserProvider>
          <QueryProvider>
            <GlobalRouter />
          </QueryProvider>
        </UserProvider>
      </MUIThemeProvider>
    </Suspense>
  );
}

export default App;
