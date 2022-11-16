import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteFetch,
  getFetch,
  patchFetch,
  postFetch,
} from '@/shared/services/fetcher';
import { IGradeAssessment, IUser } from '../models';
import { getGradedAssessmentsByUser } from '@/modules/gradedAssessments/services/gradedAssessmentsService';
import { useMemo } from 'react';

const baseUrl = '/v1/users';

export const useUsers = (page: number = 1, pageSize: number = 50) => {
  let pagination = {
    page,
    pageSize,
  };
  const { data, error, isLoading } = useQuery(
    ['users', { pagination }],
    () => getFetch(baseUrl),
    { keepPreviousData: true, staleTime: 5000 }
  );

  useMemo(() => {
    if (!!data) {
      for (let user of data as IUser[]) {
        user.roles = user.roles.map((rol) =>
          rol == 'super-admin'
            ? 'Superadmin'
            : rol == 'admin'
            ? 'Administrador'
            : rol == 'consumer'
            ? 'Usuario'
            : rol
        );
      }
    }
  }, [data]);

  return {
    users: data as IUser[],
    error,
    loading: isLoading,
  };
};

export const useUser = (userId: string) => {
  if (!userId) throw Error('Missing userId');

  const { data, error, isLoading } = useQuery(['users', { userId }], () =>
    getFetch(`${baseUrl}/${userId}`)
  );

  if (!!data) {
    data.roles = data.roles.map((rol: string) =>
      rol == 'consumer'
        ? 'Usuario'
        : rol == 'admin'
        ? 'Administrador'
        : 'Superadmin'
    );
  }

  return {
    user: data as IUser,
    error,
    loading: isLoading,
  };
};

export const useUserStats = (userId: string) => {
  const { data, error, isLoading } = useQuery(['users', userId, 'stats'], () =>
    getFetch(`${baseUrl}/${userId}/stats`)
  );

  return {
    stats: data as { takenAssessments: number; premiumAssessments: number },
    error,
    loading: isLoading,
  };
};

export const useCreateUser = (
  successCallback?: Function,
  errorCallback?: Function
) => {
  const queryClient = useQueryClient();

  return useMutation((newUser: IUser) => postFetch(baseUrl, newUser), {
    onSuccess: (data: IUser) => {
      queryClient.invalidateQueries(['users', { userId: data.id }]);
      if (successCallback) successCallback(data);
    },
    onError: (error, vars) => {
      if (errorCallback) errorCallback(error, vars);
    },
  });
};

export const useUpdateUser = (onSuccess: Function, onError: Function) => {
  const queryClient = useQueryClient();
  return useMutation(
    (user: IUser) => patchFetch(`${baseUrl}/${user.id}`, user),
    {
      onSuccess: (user: IUser) => {
        queryClient.setQueryData(['users', { userId: user.id }], user);
        queryClient.invalidateQueries(['users']);

        onSuccess();
      },
      onError: (error) => {
        onError(error);
      },
    }
  );
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation((userId: string) => deleteFetch(`${baseUrl}/${userId}`), {
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries([
        'users',
        {
          userId: userId,
        },
      ]);
    },
  });
};

export const useUserAssessments = (userId: string) => {
  if (!userId) return { error: 'Missing userId' };

  const { data, error, isLoading } = useQuery(['users', { userId }], () =>
    getGradedAssessmentsByUser(userId)
  );

  return {
    user: data.list as IGradeAssessment[],
    error,
    loading: isLoading,
  };
};
