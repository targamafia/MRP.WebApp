import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IAssessment, IQuestion } from '../models';
import {
  deleteAssessment,
  deleteAssessmentQuestion,
  getAssessmentById,
  getAssessmentQuestion,
  getAssessments,
  getFeaturedAssessments,
  postAssessment,
  postAssessmentQuestion,
  putAssessment,
  putAssessmentQuestion,
} from '../services/assessmentService';

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
    ['assessments', { id: assessmentId }],
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

export const useAssessmentQuestion = (args: {
  assessmentId: string;
  questionId: string;
}) => {
  const { assessmentId, questionId } = args;

  const { data, error, isLoading } = useQuery(
    ['assessments', { id: assessmentId }, 'questions', { id: questionId }],
    () => getAssessmentQuestion(assessmentId, questionId),
    { keepPreviousData: true, staleTime: 5000 }
  );

  return {
    question: data as IQuestion,
    error,
    loading: isLoading,
  };
};

export const useUpdateAssessment = (onSuccess: Function, onError: Function) => {
  const queryClient = useQueryClient();
  return useMutation(putAssessment, {
    onSuccess: (assessment: IAssessment) => {
      queryClient.setQueryData(
        ['assessments', { id: assessment.id }],
        assessment
      );

      onSuccess(assessment);
    },
    onError: (error) => {
      onError(error);
    },
  });
};

export const useCreateAssessmentQuestion = (args: {
  assessmentId: string;
  onSuccess: Function;
  onError: Function;
}) => {
  const queryClient = useQueryClient();
  const { assessmentId, onSuccess, onError } = args;

  return useMutation(
    (newQuestion: IQuestion) =>
      postAssessmentQuestion(assessmentId, newQuestion),
    {
      onSuccess: (data: IAssessment) => {
        queryClient.invalidateQueries(['assessments', { id: data.id }]);
        if (onSuccess) onSuccess(data);
      },
      onError: (error, vars) => {
        if (onError) onError(error, vars);
      },
    }
  );
};

export const useUpdateAssessmentQuestion = (args: {
  assessmentId: string;
  questionId: string;
  onSuccess: Function;
  onError: Function;
}) => {
  const queryClient = useQueryClient();
  const { assessmentId, questionId, onSuccess, onError } = args;

  return useMutation(
    (question: IQuestion) =>
      putAssessmentQuestion(assessmentId, questionId, question),
    {
      onSuccess: (assessment: IAssessment, question: IQuestion) => {
        queryClient.invalidateQueries([
          'assessments',
          { id: assessment.id },
          'questions',
          { id: question._id },
        ]);

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
  onSuccess?: Function,
  onError?: Function
) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteAssessmentQuestion(assessmentId, questionId), {
    onSuccess: (assessment: IAssessment, question: any) => {
      queryClient.invalidateQueries([
        'assessments',
        { assessmentId: assessment.id },
        'questions',
        { id: question._id },
      ]);

      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
};

export const useDeleteAssessment = (onSuccess: Function) => {
  const queryClient = useQueryClient();
  return useMutation(deleteAssessment, {
    onSuccess: (assessment: IAssessment) => {
      queryClient.invalidateQueries(['assessments', { id: assessment._id }]);
      onSuccess();
    },
  });
};
