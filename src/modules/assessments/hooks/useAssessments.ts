import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteFetch,
  getFetch,
  patchFetch,
  postFetch,
} from "@/shared/services/fetcher";
import { IAssessment, INewAssessment, IQuestion } from "../models";

const baseUrl = "/v1/assessments";

export const useAssessments = (page: number = 1, pageSize: number = 50) => {
  let pagination = {
    page,
    pageSize,
  };
  const { data, error, isLoading } = useQuery(
    ["assessments", { pagination }],
    () => getFetch(baseUrl),
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
  if (!assessmentId) return { error: "Missing assessmentId" };

  const { data, error, isLoading } = useQuery(
    ["assessments", { assessmentId }],
    () => getFetch(`${baseUrl}/${assessmentId}`)
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
    ["assessments", "featured", { pagination }],
    async () => await getFetch(`${baseUrl}/featured`),
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

  return useMutation(
    (newAssessment: INewAssessment) => postFetch(baseUrl, newAssessment),
    {
      onSuccess: (data: IAssessment) => {
        queryClient.invalidateQueries([
          "assessments",
          { assessmentId: data.id },
        ]);
        if (successCallback) successCallback(data);
      },
      onError: (error, vars) => {
        if (errorCallback) errorCallback(error, vars);
      },
    }
  );
};

export const useUpdateAssessment = (onSuccess: Function, onError: Function) => {
  const queryClient = useQueryClient();
  return useMutation(
    (assessment: IAssessment) =>
      patchFetch(`${baseUrl}/${assessment.id}`, assessment),
    {
      onSuccess: (assessment: IAssessment) => {
        queryClient.setQueryData(
          ["assessments", { assessmentId: assessment.id }],
          assessment
        );
        queryClient.invalidateQueries(["assessments"]);

        onSuccess();
      },
      onError: (error) => {
        onError(error);
      },
    }
  );
};

export const useUpdateAssessmentQuestions = (
  assessmentId: string,
  onSuccess: Function,
  onError: Function
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (questions: IQuestion[]) =>
      postFetch(`${baseUrl}/${assessmentId}/add-question`, questions),
    {
      onSuccess: (assessment: IAssessment) => {
        queryClient.setQueryData(
          ["assessments", { assessmentId: assessment.id }],
          assessment
        );
        queryClient.invalidateQueries(["assessments"]);

        onSuccess();
      },
      onError: (error) => {
        onError(error);
      },
    }
  );
};

export const useDeleteAssessment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (assessmentId: string) => deleteFetch(`${baseUrl}/${assessmentId}`),
    {
      onSuccess: (_, assessmentId) => {
        queryClient.invalidateQueries([
          "assessments",
          {
            assessmentId: assessmentId,
          },
        ]);
      },
    }
  );
};
