import { useState, useEffect } from "react";
import axios from "axios";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
};

const cache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(cache[url]?.data || null);
  const [loading, setLoading] = useState<boolean>(!cache[url]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<T>(url);
        setData(response.data);
        cache[url] = { data: response.data, timestamp: Date.now() }; // キャッシュに保存
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

    if (!cache[url] || Date.now() - cache[url].timestamp > CACHE_DURATION) {
      fetchData();
    } else {
      setData(cache[url].data);
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error, setData };
};

export default useFetch;
