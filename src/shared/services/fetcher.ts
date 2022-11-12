import { IServiceResponse } from '@/modules/assessments/models';
import axios from 'axios';

const baseUrl = import.meta.env.DEV
  ? '/api'
  : `${import.meta.env.VITE_BACKEND_URL}/api`;

const getHeaders = () => {
  const token = localStorage.getItem('jwt');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || ''}`,
  };
};

export const getFetch = async (endpoint: string, params = {}): Promise<any> => {
  const axiosRes = await axios.get(baseUrl + endpoint, {
    params,
    headers: getHeaders(),
  });
  const res = axiosRes.data as IServiceResponse;
  if (!res.isSuccess) throw res.error;
  return res.entity;
};

export const postFetch = async (
  endpoint: string,
  body: object = {}
): Promise<any> => {
  const axiosRes = await axios.post(baseUrl + endpoint, body, {
    headers: getHeaders(),
  });
  const res = axiosRes.data as IServiceResponse;
  if (!res.isSuccess) throw res.error;
  return res.entity;
};

export const patchFetch = async (
  endpoint: string,
  body: object = {}
): Promise<any> => {
  const axiosRes = await axios.put(baseUrl + endpoint, body, {
    headers: getHeaders(),
  });
  const res = axiosRes.data as IServiceResponse;
  if (!res.isSuccess) throw res.error;
  return res.entity;
};

export const deleteFetch = async (endpoint: string): Promise<any> => {
  const axiosRes = await axios.delete(baseUrl + endpoint, {
    headers: getHeaders(),
  });
  const res = axiosRes.data as IServiceResponse;
  if (!res.isSuccess) throw res.error;
  return res.entity;
};
