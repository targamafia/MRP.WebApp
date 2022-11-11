import {
  deleteFetch,
  getFetch,
  patchFetch,
  postFetch,
} from '@/shared/services/fetcher';

const BASE_GRADE_URL = '/v1/grade';

export const getGradedAssessmentById = async (gradedAssessmentId: string) => {
  return await getFetch(BASE_GRADE_URL + gradedAssessmentId);
};

export const getAllGradedAssessments = async () => {
  return await getFetch(BASE_GRADE_URL);
};


export const getGradedAssessmentsByUser = async (userId: string) => {
  return await getFetch(BASE_GRADE_URL + `/user/${userId}`)
}