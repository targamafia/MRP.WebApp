import { IAssessment } from '@/modules/assessments/models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  assignUserToAssessment,
  getUserPremiumAssessments,
  unassignUserToAssessment,
} from '../services/premiumServices';

export const useAssignAssessmentToUser = (
  assessmentId: string,
  onSuccess?: Function
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (userId: string) => assignUserToAssessment(assessmentId, userId),
    {
      onSuccess: (res: {
        assessmentId: string;
        assignedBy: string;
        id: string;
        userId: string;
      }) => {
        queryClient.invalidateQueries([
          'users',
          res.userId,
          'premiumAssessments',
        ]);
        queryClient.invalidateQueries(['users', res.userId, 'stats']);

        !!onSuccess && onSuccess();
      },
    }
  );
};

export const useAssignUserToAssessment = (
  userId: string,
  onSuccess?: Function
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (assessmentId: string) => assignUserToAssessment(assessmentId, userId),
    {
      onSuccess: (res: {
        assessmentId: string;
        assignedBy: string;
        id: string;
        userId: string;
      }) => {
        queryClient.invalidateQueries([
          'users',
          res.userId,
          'premiumAssessments',
        ]);
        queryClient.invalidateQueries(['users', res.userId, 'stats']);

        !!onSuccess && onSuccess();
      },
    }
  );
};

export const useUnassignAssessmentFromUser = (
  userId: string,
  onSuccess?: Function
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (assessmentId: string) => unassignUserToAssessment(assessmentId, userId),
    {
      onSuccess: (res: { assessmentId: string; userId: string }) => {
        console.log('aaaaa');
        console.log(res.userId);

        queryClient.invalidateQueries([
          'users',
          res.userId,
          'premiumAssessments',
        ]);
        queryClient.invalidateQueries(['users', res.userId, 'stats']);

        onSuccess && onSuccess();
      },
    }
  );
};

export const useUserPremiumAssessments = (userId: string) => {
  const { data, error, isLoading } = useQuery(
    ['users', userId, 'premiumAssessments'],
    () => getUserPremiumAssessments(userId)
  );

  return {
    premiumAssessments: data as IAssessment[],
    error: error as AxiosError | undefined,
    loading: isLoading,
  };
};
