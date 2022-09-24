import { useCallback, useState } from "react";
import { useAuth } from "../providers/userProvider";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useBack = () => {
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(
    async (
      endpoint: string,
      method = "GET",
      body: null | object = null,
      query = {}
    ): Promise<any | null> => {
      setIsLoading(true);
      setError("");
      console.log(endpoint, method, body, query);
      method = method.toUpperCase();

      let parsedBody: string | null;

      if (method === "POST" || method === "PATCH" || method === "DELETE") {
        parsedBody = JSON.stringify(body);
      } else {
        parsedBody = null;
      }

      query = Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      try {
        const response = await fetch(BASE_URL + endpoint + "?" + query, {
          credentials: "same-origin",
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: parsedBody,
        });

        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
          if (!responseData.isSuccess) {
            setError(responseData.error);
            return { error: responseData.error };
          }
          return null;
        }

        setIsLoading(false);
        return responseData._value;
      } catch (err: any) {
        console.error(err);
        setError(err);
        setIsLoading(false);
        return null;
      }
    },
    [user]
  );

  return { isLoading, error, fetchData, resetError: () => setError("") };
};
