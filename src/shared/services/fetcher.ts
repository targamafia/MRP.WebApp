import { IServiceResponse } from "@/modules/assessments/models";
import axios from "axios";

const baseUrl = "/api";

const getHeaders = () => {
  const jwt = localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt || ""}`,
  };
};

export const getFetch = async (endpoint: string, params = {}): Promise<any> => {
  try {
    const axiosRes = await axios.get(baseUrl + endpoint, {
      params,
      headers: getHeaders(),
    });
    const res = axiosRes.data as IServiceResponse;
    if (!res.isSuccess) throw res.error;
    return res.entity;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};

export const postFetch = async (
  endpoint: string,
  body: object = {}
): Promise<any> => {
  try {
    const axiosRes = await axios.post(baseUrl + endpoint, body, {
      headers: getHeaders(),
    });
    const res = axiosRes.data as IServiceResponse;
    if (!res.isSuccess) throw res.error;
    return res.entity;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};

export const patchFetch = async (
  endpoint: string,
  body: object = {}
): Promise<any> => {
  try {
    const axiosRes = await axios.patch(baseUrl + endpoint, body, {
      headers: getHeaders(),
    });
    const res = axiosRes.data as IServiceResponse;
    if (!res.isSuccess) throw res.error;
    return res.entity;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};

export const deleteFetch = async (endpoint: string): Promise<any> => {
  try {
    const axiosRes = await axios.delete(baseUrl + endpoint, {
      headers: getHeaders(),
    });
    const res = axiosRes.data as IServiceResponse;
    if (!res.isSuccess) throw res.error;
    return res.entity;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};
