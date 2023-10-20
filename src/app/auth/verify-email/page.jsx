'use client'

import { useRouter } from "next/navigation";
import { IconLoader } from "@tabler/icons-react";
import { useFetch } from "@lib/hooks";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function ConfirmEmailPage({ searchParams }) {
    const router = useRouter();
    const { token } = searchParams;

    if (!searchParams) router.push('/');

    const [data, loading, error] = useFetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token,
            type: 'token'
        })
    });

    if (!loading && !error && data.status === 'success') router.push('/auth/login');

    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            {
                loading ? (
                    <IconLoader/>
                ) : (
                    <Typography color='primary.main' variant='h5' sx={{ fontWeight: 'bold' }}>
                        {data.message}
                    </Typography>
                )
            }
        </Container>
    );
}