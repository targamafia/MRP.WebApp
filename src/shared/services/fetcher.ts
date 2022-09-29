import axios, { AxiosResponse } from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "";

const getHeaders = () => {
  const jwt = localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt || ""}`,
  };
};

export const getFetch = async (
  endpoint: string,
  params = {}
): Promise<AxiosResponse> => {
  try {
    return await axios.get(baseUrl + endpoint, {
      params,
      headers: getHeaders(),
    });
  } catch (err: any) {
    throw err.response;
  }
};

export const postFetch = async (
  endpoint: string,
  body: object = {}
): Promise<AxiosResponse> => {
  try {
    return await axios.post(baseUrl + endpoint, body, {
      headers: getHeaders(),
    });
  } catch (err: any) {
    throw err.response;
  }
};

export const patchFetch = async (
  endpoint: string,
  body: object = {}
): Promise<AxiosResponse> => {
  try {
    return await axios.patch(baseUrl + endpoint, body, {
      headers: getHeaders(),
    });
  } catch (err: any) {
    throw err.response;
  }
};

export const deleteFetch = async (endpoint: string): Promise<AxiosResponse> => {
  try {
    return await axios.delete(baseUrl + endpoint, { headers: getHeaders() });
  } catch (err: any) {
    throw err.response;
  }
};
