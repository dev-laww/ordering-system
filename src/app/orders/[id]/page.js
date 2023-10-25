'use client'

import { Box, Chip, Divider, Typography } from '@mui/material';
import { ERROR_CODE } from "@lib/constants";
import Loading from "@components/Loading";
import PageContainer from "@components/common/PageContainer";
import { useFetch } from "@lib/hooks";
import { useSession } from "next-auth/react";
import { OrderItems } from "@components/tables/";
import { StatusChip } from "@components/common/";

export default function Order({ params }) {
    const { status } = useSession();
    const [data, loading, error] = useFetch(`/api/orders/${params.id}`, {}, status);

    if (loading || status === 'loading' || !Boolean(data.data)) return <Loading/>;

    if (data.code && data.code === ERROR_CODE.NOT_FOUND) return <PageContainer title="Order Not Found"/>;

    const { data: order } = data;

    console.log(order);

    return (
        <>
            <PageContainer
                title="Order"
                subtitle={params.id}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    <Divider>
                        <Typography color="gray">Items</Typography>
                    </Divider>
                    <OrderItems items={order.items}/>
                    <Divider>
                        <Typography color="gray">Details</Typography>
                    </Divider>
                    <Typography mt={2}>
                        Status: {
                            <StatusChip status={order.status}/>
                        }
                    </Typography>
                    <Typography mt={2}>Total: {order.total}</Typography>
                    <Typography my={2}>Created at: {order.createdAt}</Typography>
                    {order.reason && <Typography my={2}>Reason: {order.reason}</Typography>}
                    {order.payment && (
                        <>
                            <Divider>
                                <Typography color="gray">Payment Details</Typography>
                            </Divider>
                            <Typography mt={2}>Type: {
                                order.payment.type
                                    .charAt(0)
                                    .toUpperCase() +
                                order.payment.type.slice(1)
                            }</Typography>
                            <Typography mt={2}>Status: {
                                <Chip
                                    sx={{
                                        px: "4px",
                                        backgroundColor:
                                            order.payment.status === "completed"
                                                ? "primary.main"
                                                : order.payment.status === "cancelled" ? "error.main" : "warning.main",
                                        color: "#fff",
                                    }}
                                    size="small"
                                    label={
                                        order.payment.status
                                            .charAt(0)
                                            .toUpperCase() +
                                        order.payment.status.slice(1)
                                    }
                                />
                            }</Typography>
                            <Typography my={2}>Amount: {order.payment.amount}</Typography>
                            {order.payment.reason && <Typography mb={2}>Reason: {order.payment.reason}</Typography>}
                        </>
                    )}
                    <Divider>
                        <Typography color="gray">Address Details</Typography>
                    </Divider>
                    <Typography mt={2}>Name: {order.address.name}</Typography>
                    <Typography mt={2}>Phone: {order.address.phone}</Typography>
                    <Typography mt={2}>Address: {order.address.address}</Typography>
                    <Typography mt={2}>City: {order.address.city}</Typography>
                    <Typography mt={2}>State: {order.address.state}</Typography>
                    <Typography my={2}>Zip: {order.address.zip}</Typography>
                </Box>
            </PageContainer>
        </>
    )
}