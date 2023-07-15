import { useState, useEffect } from "react";

const usePost = (url, body, options) => {
  const host = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    function postData() {
      fetch(host + url, {
        ...options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          setData(res.json);
          setLoading(false);
        })
        .catch((e) => {
          setError(error);
          setLoading(false);
        });
    }
    postData();
  }, []);

  return { data, loading, error };
};

export default usePost;
