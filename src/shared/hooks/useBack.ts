import { useCallback, useState } from "react";
import { useAuth } from "@/shared/providers/userProvider";
import {
  deleteFetch,
  getFetch,
  patchFetch,
  postFetch,
} from "../services/fetcher";
import { AxiosResponse } from "axios";

export const useBack = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(
    async (
      endpoint: string,
      method = "GET",
      body = {},
      query = {}
    ): Promise<any | null> => {
      setIsLoading(true);
      setError("");
      try {
        method = method.toUpperCase();
        let res: AxiosResponse | undefined;
        switch (method) {
          case "GET":
            res = await getFetch(endpoint, query);
          case "POST":
            res = await postFetch(endpoint, body);
          case "PATCH":
            res = await patchFetch(endpoint, body);
          case "DELETE":
            res = await deleteFetch(endpoint);
          default:
            if (res == undefined) throw "papiiii ponte un método pero IAAAAA";
        }
        const responseData = res.data;
        setIsLoading(false);
        if (!responseData.isSuccess) {
          setError(responseData.error);
          return { error: responseData.error };
        }
        return responseData._value;
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
        return null;
      }
    },
    [user]
  );

  return { isLoading, error, fetchData, resetError: () => setError("") };
};
