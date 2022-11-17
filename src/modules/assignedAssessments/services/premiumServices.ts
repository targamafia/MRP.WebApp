import { deleteFetch, getFetch, postFetch } from '@/shared/services/fetcher';

const BASE_URL = '/v1/assessments';

export const assignUserToAssessment = (assessmentId: string, userId: string) =>
  postFetch(`${BASE_URL}/${assessmentId}/assign-user/${userId}`);

export const unassignUserToAssessment = (
  assessmentId: string,
  userId: string
) => deleteFetch(`${BASE_URL}/${assessmentId}/premium-access/${userId}`);

export const getUserPremiumAssessments = (userId: string) =>
  getFetch(`${BASE_URL}/premium-access/${userId}`);
