import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  IGradeAssessment,
  IGradeAssessmentDetail,
} from '../models/gradedAssessments.models';
import {
  getAllGradedAssessments,
  getGradedAssessmentById,
  getGradedAssessmentsByUser,
} from '../services/gradedAssessmentsService';

export const useGradedAssessment = (assessmentId: string) => {
  if (!assessmentId) throw Error('Missing assessment Id');

  const { data, error, isLoading } = useQuery(
    ['gradedAssessments', { id: assessmentId }],
    () => getGradedAssessmentById(assessmentId)
  );

  return {
    gradedAssessment: data as IGradeAssessmentDetail,
    error,
    loading: isLoading,
  };
};

export const useGradedAssessments = () => {
  const { data, error, isLoading } = useQuery(['gradedAssessments'], () =>
    getAllGradedAssessments(),
    { keepPreviousData: true },
  );

  return {
    gradedAssessments: data?.list as IGradeAssessment[],
    error,
    loading: isLoading,
  };
};

export const useUserGradedAssessments = (userId: string) => {
  const { data, error, isLoading } = useQuery(
    ['user', { id: userId }, 'gradedAssessments'],
    () => getGradedAssessmentsByUser(userId)
  );

  return {
    gradedAssessments: data?.list as IGradeAssessment[],
    error: error as AxiosError,
    loading: isLoading,
  };
};
