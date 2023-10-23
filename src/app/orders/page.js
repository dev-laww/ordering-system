'use client'

import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, } from '@mui/material';
import { useFetch } from "@lib/hooks";
import Loading from "@components/Loading";
import Order from "@components/common/items/Order";
import Navigation from "@components/common/Navigation";
import PageContainer from "@components/common/PageContainer";
import { useSession } from "next-auth/react";


export default function Orders() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            return { redirect: { destination: '/auth/login', permanent: false } }
        }
    });
    const [data, loading, error] = useFetch('/api/orders', {}, status);

    if (loading || status === 'loading') return <Loading/>;

    return (
        <>
            <Navigation/>
            <PageContainer title="Orders">
                <Box
                    sx={{
                        overflow: "auto",
                        width: { xs: "280px", sm: "auto" },
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Table aria-label="simple table" sx={{ mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography
                                        variant="subtitle2"
                                        color='primary.dark'
                                        fontWeight={600}
                                    >
                                        Date
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="subtitle2"
                                        color='primary.dark'
                                        fontWeight={600}
                                    >
                                        Order Number
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="subtitle2"
                                        color='primary.dark'
                                        fontWeight={600}
                                    >
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="subtitle2"
                                        color='primary.dark'
                                        fontWeight={600}
                                    >
                                        Total
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Boolean(data.data) ? data.data.map((order) => <Order key={order.id} order={order}/>) : (
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="subtitle2">
                                            No orders found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </PageContainer>
        </>
    )
};
