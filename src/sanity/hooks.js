import { useEffect, useState } from 'react';
import { client } from './client';

/**
 * Custom hook for fetching Sanity data with loading and error states
 * @param {string} query - GROQ query string
 * @param {Array} params - Query parameters
 * @returns {{data: any, loading: boolean, error: Error|null}}
 */
export const useSanityQuery = (query, params = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await client.fetch(query, params);
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [query, params]);

  return { data, loading, error };
};

export default useSanityQuery;