import { useState } from "react";

export const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearErrorHandler = () => {
    setError(null);
  };

  const sendRequest = async (
    URL,
    method = "GET",
    body,
    credentials = "omit",
    headers = { "Content-Type": "application/json" },
    callback
  ) => {
    try {
      setIsLoading(true);
      const responseData = await fetch(URL, {
        method: method,
        body: JSON.stringify(body),
        credentials: credentials,
        headers: headers,
      });

      const data = await responseData.json();

      if (!responseData.ok) {
        throw new Error(data.message);
      }
      setIsLoading(false);
      callback(data);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendRequest, clearErrorHandler };
};
