import { IAssessment, IServiceResponse } from '@/modules/assessments/models';
import axios from 'axios';

const baseUrl = import.meta.env.DEV
  ? '/api'
  : `${import.meta.env.VITE_BACKEND_URL}/api`;

const getHeaders = () => {
  const token = localStorage.getItem('jwt');
  return {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token || ''}`,
  };
};

export async function uploadFile(
  file: File,
  key: string,
  endpoint: string
): Promise<IAssessment> {
  const formData = new FormData();
  formData.append(key, file);

  const axiosRes = await axios.post(baseUrl + endpoint, formData, {
    headers: getHeaders(),
  });
  const res = axiosRes.data as IServiceResponse;
  if (!res.isSuccess) throw res.error;
  return res.entity;
}

export async function uploadAssessmentThumbnail(
  file: File,
  assessmentId: string
): Promise<string> {
  return (
    (
      await uploadFile(
        file,
        'assessmentThumbnail',
        `/v1/assessments/${assessmentId}/upload-thumbnail`
      )
    ).thumbnailUrl || ''
  );
}

export async function uploadQuestionThumbnail(
  file: File,
  assessmentId: string,
  questionId: string
): Promise<string> {
  return (
    (
      await uploadFile(
        file,
        'questionThumbnail',
        `/v1/assessments/${assessmentId}/question/${questionId}/upload-image`
      )
    ).thumbnailUrl || ''
  );
}
