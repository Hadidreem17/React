import { useEffect, useState, useCallback } from "react";

export default function useFetch(initialUrl) {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (currentUrl) => {
      if (!currentUrl) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(currentUrl);
        if (!response.ok) {
          throw new Error("Failed to load data");
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData(url);
  }, [url, fetchData]);

  const refetch = (newUrl) => {
    if (newUrl) {
      setUrl(newUrl);
    } else {
      fetchData(url);
    }
  };

  return { data, loading, error, refetch, setUrl };
}
