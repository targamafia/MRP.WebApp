import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteFetch,
  getFetch,
  patchFetch,
  postFetch,
} from '@/shared/services/fetcher';
import { IAssessment, INewAssessment, IQuestion } from '../models';
import {
  deleteAssessment,
  deleteAssessmentQuestion,
  getAssessmentById,
  getAssessments,
  getFeaturedAssessments,
  postAssessment,
  postAssessmentQuestion,
  putAssessment,
  putAssessmentQuestion,
} from '../services/assessmentService';

const BASE_URL = '/v1/assessments';

export const useAssessments = (page: number = 1, pageSize: number = 50) => {
  let pagination = {
    page,
    pageSize,
  };
  const { data, error, isLoading } = useQuery(
    ['assessments', { pagination }],
    getAssessments,
    { keepPreviousData: true, staleTime: 5000 }
  );

  return {
    assessments: data?.list as IAssessment[],
    pageSize: data?.pageSize as number,
    error,
    loading: isLoading,
  };
};

export const useAssessment = (assessmentId: string) => {
  if (!assessmentId) return { error: 'Missing assessment Id' };

  const { data, error, isLoading } = useQuery(
    ['assessments', { assessmentId }],
    () => getAssessmentById(assessmentId)
  );

  return {
    assessment: data as IAssessment,
    error,
    loading: isLoading,
  };
};

export const useFeaturedAssessments = (page = 1, pageSize = 50) => {
  let pagination = {
    page,
    pageSize,
  };
  const { data, error, isLoading } = useQuery(
    ['assessments', 'featured', { pagination }],
    getFeaturedAssessments,
    { keepPreviousData: true, staleTime: 5000 }
  );

  return {
    assessments: data?.list as IAssessment[],
    pageSize: data?.pageSize as number,
    error,
    loading: isLoading,
  };
};

export const useCreateAssessment = (
  successCallback?: Function,
  errorCallback?: Function
) => {
  const queryClient = useQueryClient();

  return useMutation(postAssessment, {
    onSuccess: (data: IAssessment) => {
      queryClient.invalidateQueries(['assessments']);
      if (successCallback) successCallback(data);
    },
    onError: (error, vars) => {
      if (errorCallback) errorCallback(error, vars);
    },
  });
};

export const useUpdateAssessment = (onSuccess: Function, onError: Function) => {
  const queryClient = useQueryClient();
  return useMutation(putAssessment, {
    onSuccess: (assessment: IAssessment) => {
      queryClient.setQueryData(
        ['assessments', { assessmentId: assessment.id }],
        assessment
      );

      onSuccess(assessment);
    },
    onError: (error) => {
      onError(error);
    },
  });
};

export const useCreateAssessmentQuestion = (
  assessmentId: string,
  onSuccess: Function,
  onError: Function
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (newQuestion: IQuestion) =>
      postAssessmentQuestion(assessmentId, newQuestion),
    {
      onSuccess: (data: IAssessment) => {
        queryClient.invalidateQueries([
          'assessments',
          { assessmentId: data.id },
        ]);
        if (onSuccess) onSuccess(data);
      },
      onError: (error, vars) => {
        if (onError) onError(error, vars);
      },
    }
  );
};

export const useUpdateAssessmentQuestion = (
  assessmentId: string,
  questionId: string,
  onSuccess: Function,
  onError: Function
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (question: IQuestion) =>
      putAssessmentQuestion(assessmentId, questionId, question),
    {
      onSuccess: (assessment: IAssessment) => {
        queryClient.setQueryData(
          ['assessments', { assessmentId: assessment.id }],
          assessment
        );

        onSuccess();
      },
      onError: (error) => {
        onError(error);
      },
    }
  );
};

export const useDeleteAssessmentQuestion = (
  assessmentId: string,
  questionId: string,
  onSuccess: Function,
  onError: Function
) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteAssessmentQuestion(assessmentId, questionId), {
    onSuccess: (assessment: IAssessment) => {
      queryClient.invalidateQueries([
        'assessments',
        { assessmentId: assessment.id },
        'questions',
      ]);

      onSuccess();
    },
    onError: (error) => {
      onError(error);
    },
  });
};

export const useDeleteAssessment = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAssessment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['assessments']);
    },
  });
};
