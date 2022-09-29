import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteFetch,
  getFetch,
  patchFetch,
  postFetch,
} from "@/shared/services/fetcher";
import { IAssessment, INewAssessment } from "../models";

const baseUrl = "/v1/assessments";

export const useAssessments = (page: number = 1, pageSize: number = 50) => {
  let pagination = {
    page,
    pageSize,
  };
  const { data, error, isLoading, refetch } = useQuery(
    ["assessments", "featured", { pagination }],
    async () => (await getFetch(`${baseUrl}/featured`)).data,
    { keepPreviousData: true, staleTime: 5000 }
  );

  return {
    assessments: data?.list,
    pageSize: data?.pageSize,
    error,
    loading: isLoading,
    refetch,
  };
};

export const useAssessment = (assessmentId: string) => {
  if (!assessmentId) return;

  const { data, error, isLoading, refetch } = useQuery(
    ["assessments", { assessmentId }],
    () => getFetch(`${baseUrl}/${assessmentId}`)
  );

  return {
    assessment: data?.data as IAssessment,
    error,
    loading: isLoading,
    refetch,
  };
};

export const useCreateAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newAssessment: INewAssessment) =>
      (await postFetch(baseUrl, newAssessment)).data,
    {
      onSuccess: (data: IAssessment) => {
        queryClient.invalidateQueries([
          "assessments",
          { assessmentId: data.id },
        ]);
      },
    }
  );
};

export const useUpdateAssessment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (assessment: IAssessment) =>
      (await patchFetch(`${baseUrl}/${assessment.id}`, assessment)).data,
    {
      onSuccess: (assessment: IAssessment) => {
        queryClient.setQueryData(
          ["assessments", { assessmentId: assessment.id }],
          assessment
        );
        queryClient.invalidateQueries(["assessments"]);
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
