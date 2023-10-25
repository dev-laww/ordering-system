'use client'

import { Box, } from '@mui/material';
import { useFetch } from '@lib/hooks';
import { Loading } from '@src/components';
import PageContainer from '@components/common/PageContainer';
import { useSession } from 'next-auth/react';
import { default as OrdersTable } from "@components/tables/Orders";


export default function Orders() {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            return { redirect: { destination: '/auth/login', permanent: false } }
        }
    });
    const [data, loading, error] = useFetch('/api/orders', {}, status);

    if (loading || status === 'loading') return <Loading/>;

    return (
        <>
            <PageContainer title="Orders">
                <Box
                    sx={{
                        overflow: "auto",
                        width: { xs: "280px", sm: "auto" },
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <OrdersTable items={data.data}/>
                </Box>
            </PageContainer>
        </>
    )
};
