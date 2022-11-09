import { GlobalRouter } from '@/Router';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GlobalRouter />
    </Suspense>
  );
}

export default App;
