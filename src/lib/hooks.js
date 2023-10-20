import { useEffect, useState } from 'react';

export const useFetch = (url, options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setData(json);
                setLoading(false);
            } catch (err) {
                setError(err);
                console.log(err);
            }
        };

        fetchData();

        return () => abortController.abort();
    }, []);

    return [data, loading, error];
}