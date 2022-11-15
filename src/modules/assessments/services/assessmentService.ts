import {
  deleteFetch,
  getFetch,
  patchFetch,
  postFetch,
} from '@/shared/services/fetcher';
import { IAssessment, INewAssessment, IQuestion } from '../models';

const BASE_URL = '/v1/assessments';

export const getAssessments = () => getFetch(BASE_URL);

export const getAssessmentById = (assessmentId: string) =>
  getFetch(`${BASE_URL}/${assessmentId}`);

export const getFeaturedAssessments = () => getFetch(`${BASE_URL}/featured`);

export const postAssessment = (newAssessment: INewAssessment) =>
  postFetch(BASE_URL, newAssessment);

export const putAssessment = (assessment: IAssessment) => {
  if (!assessment.id && !assessment._id) {
    throw Error('No assessment id bro');
  }
  return patchFetch(
    `${BASE_URL}/${assessment.id || assessment._id}`,
    assessment
  );
};

export const deleteAssessment = (assessmentId: string) =>
  deleteFetch(`${BASE_URL}/${assessmentId}`);

export const getAssessmentQuestion = (
  assessmentId: string,
  questionId: string
) => getFetch(`/v1/question/${assessmentId}/question/${questionId}`);

export const postAssessmentQuestion = (
  assessmentId: string,
  newQuestion: IQuestion
) => postFetch(`${BASE_URL}/${assessmentId}/add-question`, newQuestion);

export const putAssessmentQuestion = (
  assessmentId: string,
  questionId: string,
  question: IQuestion
) => patchFetch(`${BASE_URL}/${assessmentId}/question/${questionId}`, question);

export const deleteAssessmentQuestion = (
  assessmentId: string,
  questionId: string
) => deleteFetch(`${BASE_URL}/${assessmentId}/question/${questionId}`);

export const assignUserToAssessment = (assessmentId: string, userId: string) =>
  postFetch(`${BASE_URL}/${assessmentId}/assign-user/${userId}`);

export const getUserPremiumAssessments = (userId: string) =>
  getFetch(`${BASE_URL}/premium-access/${userId}`);
