import { useState, useEffect } from "react";
import axios from "axios";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
};

// urlがnullの場合にはFetchを行わないように
const useFetch = <T>(url: string | null): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!url);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<T>(url);
        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error);
        } else {
          setError(new Error("An unexpected error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error, setData };
};

export default useFetch;
