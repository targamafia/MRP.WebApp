import {
  MutationCache,
  Query,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { useAuth } from './userProvider';

const unauthorizedStatuses = [401, 403];

function useGlobalErrors({
  onAuthError = () => {},
  onServerError = () => {},
  onRecover = () => {},
}) {
  const triggerError = (error: unknown) => {
    const {
      // @ts-ignore
      response: { status },
    } = error;

    if (unauthorizedStatuses.includes(status)) {
      onAuthError();
    } else if (status === 500) {
      onServerError();
    }
  };

  const queryCache = new QueryCache({
    onError(error) {
      if (error) {
        triggerError(error);
      }
    },
    onSuccess() {
      onRecover();
    },
  });

  const mutationCache = new MutationCache({
    onError(error) {
      if (error) {
        triggerError(error);
      }
    },
    onSuccess(data) {
      onRecover();
    },
  });

  return { queryCache, mutationCache };
}

export default function QueryProvider({ children }: { children: ReactNode }) {
  const { logout } = useAuth();

  const { queryCache, mutationCache } = useGlobalErrors({
    onAuthError: () => {
      logout();
    },
  });

  const queryClient = new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
