import { useState, useEffect } from "react";

export default function useFetch(url, options) {
  const host = process.env.NEXT_PUBLIC_API_URL;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(host + url, options);
        const data = await res.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []); // the empty array ensures that the effect only runs once
  return { data, error, loading };
}
