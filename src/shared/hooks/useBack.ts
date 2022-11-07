import { useCallback, useState } from 'react';
import { useAuth } from '@/shared/providers/userProvider';
import {
  deleteFetch,
  getFetch,
  patchFetch,
  postFetch,
} from '../services/fetcher';

export const useBack = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = useCallback(
    async (
      endpoint: string,
      method = 'GET',
      body = {},
      query = {}
    ): Promise<any | null> => {
      setIsLoading(true);
      setError('');
      try {
        method = method.toUpperCase();

        switch (method) {
          case 'GET':
            return await getFetch(endpoint, query);
          case 'POST':
            return await postFetch(endpoint, body);
          case 'PATCH':
            return await patchFetch(endpoint, body);
          case 'DELETE':
            return await deleteFetch(endpoint);
          default:
            console.error('Unrecognized method');
            setError('Unrecognized Method');
            setIsLoading(false);
            return null;
        }
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
        return null;
      }
    },
    [user]
  );

  return { isLoading, error, fetchData, resetError: () => setError('') };
};
