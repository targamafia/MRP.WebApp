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
import { AxiosError } from 'axios';

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
    error: error as AxiosError,
    loading: isLoading,
  };
};

export const useUser = (userId: string) => {
  if (!userId) throw Error('Missing userId');

  const { data, error, isLoading } = useQuery(['users', { userId }], () =>
    getFetch(`${baseUrl}/${userId}`)
  );

  useMemo(() => {
    if (!!data) {
      data.roles = data.roles.map((rol: string) =>
        rol == 'super-admin'
          ? 'Superadmin'
          : rol == 'admin'
          ? 'Administrador'
          : rol == 'consumer'
          ? 'Usuario'
          : rol
      );
    }
  }, [data]);

  return {
    user: data as IUser,
    error: error as AxiosError,
    loading: isLoading,
  };
};

export const useUserStats = (userId: string) => {
  const { data, error, isLoading } = useQuery(['users', userId, 'stats'], () =>
    getFetch(`${baseUrl}/${userId}/stats`)
  );

  return {
    stats: data as { takenAssessments: number; premiumAssessments: number },
    error: error as AxiosError,
    loading: isLoading,
  };
};

export const useCreateUser = (
  successCallback?: Function,
  errorCallback?: Function
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (args: { name: string; lastName: string; role: string; email: string }) =>
      postFetch(baseUrl + '/create-internal', {
        companyCode: import.meta.env.VITE_COMPANY_NAME,
        name: args.name,
        lastName: args.lastName,
        role: args.role,
        email: args.email,
      }),
    {
      onSuccess: (user: IUser) => {
        queryClient.invalidateQueries(['users', { userId: user._id }]);
        if (successCallback) successCallback(user);
      },
      onError: (error, vars) => {
        if (errorCallback) errorCallback(error, vars);
      },
    }
  );
};

export const useUpdateUser = (onSuccess: Function, onError: Function) => {
  const queryClient = useQueryClient();
  return useMutation(
    (user: IUser) => patchFetch(`${baseUrl}/${user._id}`, user),
    {
      onSuccess: (user: IUser) => {
        queryClient.setQueryData(['users', { userId: user._id }], user);
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
    error: error as AxiosError,
    loading: isLoading,
  };
};
