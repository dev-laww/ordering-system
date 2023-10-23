import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

export const useFetch = (url, options, status) => {
    const { data: session } = useSession();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {

        const abortController = new AbortController();
        const fetchData = async (fetchOptions) => {
            try {
                const res = await fetch(url, fetchOptions);
                const json = await res.json();
                setData(json);
                setLoading(false);

                if (json.message === 'Invalid access token') {
                    // refresh token
                    const res = await fetch('/api/auth/refresh', {
                        method: 'POST',
                        body: JSON.stringify({ token: session.refreshToken }),
                    });
                    const json = await res.json();

                    if (!res.ok) {
                        await signOut();
                        router.push('/auth/login');
                        throw Error(json.message)
                    }

                    fetchData({
                        headers: { 'Authorization': `Bearer ${json.data.accessToken}` }
                    })
                }
            } catch (err) {
                setError(err);
                console.log(err);
            }
        };

        fetchData({
            headers: { 'Authorization': `Bearer ${session?.accessToken}` }
        });

        return () => abortController.abort();
    }, [status]);

    return [data, loading, error];
}