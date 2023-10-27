'use client'

import { Box, Button, Chip, CircularProgress, Divider, Typography } from '@mui/material';
import { ERROR_CODE } from "@lib/constants";
import Loading from "@components/Loading";
import PageContainer from "@components/common/PageContainer";
import { useFetch } from "@lib/hooks";
import { useSession } from "next-auth/react";
import { OrderItems } from "@components/tables/";
import { StatusChip } from "@components/common/";
import * as React from "react";
import { useState } from "react";
import { refreshToken } from "@lib/http";

export default function Order({ params }) {
    const { data: session, status } = useSession();
    const [data, loading, error] = useFetch(`/api/orders/${params.id}`, {}, status);
    const [buttonLoading, setButtonLoading] = useState({});

    if (loading || status === 'loading' || !Boolean(data.data)) return <Loading/>;

    if (data.code && data.code === ERROR_CODE.NOT_FOUND) return <PageContainer title="Order Not Found"/>;

    const { data: order } = data;
    const pending = order.status === 'pending';

    const handleCancel = async e => {
        e.preventDefault();

        setButtonLoading(prev => ({ ...prev, cancel: true }));

        let response = await fetch(`/api/orders/${params.id}/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session.accessToken
            },
            body: JSON.stringify({ reason: 'Cancelled by admin' }),
        });
        const data = await response.json();

        if (data.message === 'Invalid access token') {
            // refresh token
            const accessToken = await refreshToken(session.refreshToken);

            response = await fetch(`/api/orders/${params.id}/cancel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ reason: 'Cancelled by admin' }),
            });
        }

        setButtonLoading(prev => ({ ...prev, cancel: false }));

        if (!response.ok) return;

        if (data.code && data.code === ERROR_CODE.NOT_FOUND) return;

        window.location.reload();
    }

    const handleComplete = async e => {
        e.preventDefault();

        setButtonLoading(prev => ({ ...prev, complete: true }));

        let response = await fetch(`/api/orders/${params.id}/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session.accessToken
            },
            body: JSON.stringify({ reason: 'Completed by admin' }),
        });
        const data = await response.json();

        if (data.message === 'Invalid access token') {
            // refresh token
            const accessToken = await refreshToken(session.refreshToken);

            response = await fetch(`/api/orders/${params.id}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ reason: 'Completed by admin' }),
            });
        }

        setButtonLoading(prev => ({ ...prev, complete: false }));

        if (!response.ok) return;


        if (data.code && data.code === ERROR_CODE.NOT_FOUND) return;

        window.location.reload();
    }

    const handlePaid = async e => {
        e.preventDefault();

        setButtonLoading(prev => ({ ...prev, paid: true }));

        let response = await fetch(`/api/payments/${order.payment.id}/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session.accessToken
            },
            body: JSON.stringify({ reason: 'Paid by admin' }),
        });
        const data = await response.json();

        if (data.message === 'Invalid access token') {
            // refresh token
            const accessToken = await refreshToken(session.refreshToken);

            response = await fetch(`/api/payments/${order.payment.id}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ reason: 'Cancelled by admin' }),
            });
        }


        setButtonLoading(prev => ({ ...prev, paid: false }));

        if (!response.ok) return;


        if (data.code && data.code === ERROR_CODE.NOT_FOUND) return;


        window.location.reload();
    }


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
                    {order.reason && <Typography mb={2}>Reason: {order.reason}</Typography>}
                    {order.payment && (
                        <>
                            <Divider>
                                <Typography color="gray">Payment Details</Typography>
                            </Divider>
                            <Typography mt={2}>ID: {order.payment.id}</Typography>
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
                {session.user.role === 'admin' && (
                    <>
                        <Divider>
                            <Typography color="gray">User Details</Typography>
                        </Divider>
                        <Typography mt={2}>User ID: {order.user.id}</Typography>
                        <Typography mt={2}>Name: {order.user.firstName} {order.user.lastName}</Typography>
                        <Typography mt={2}>Email: {order.user.email}</Typography>
                        <Typography my={2}>Role: {order.user.role}</Typography>
                        <Divider>
                            <Typography color="gray">Actions</Typography>
                        </Divider>
                        <Box
                            display='flex'
                            flexDirection='row'
                            justifyContent='flex-end'
                            gap={2}
                            my={2}
                        >
                            <Button
                                variant='contained'
                                disabled={!pending || buttonLoading.cancel}
                                onClick={handleCancel}
                            >
                                {buttonLoading.cancel ? <CircularProgress size={24}/> : 'Cancel'}
                            </Button>
                            <Button
                                variant='contained'
                                disabled={!pending || buttonLoading.complete}
                                onClick={handleComplete}
                            >
                                {buttonLoading.complete ? <CircularProgress size={24}/> : 'Mark as complete'}
                            </Button>
                            <Button
                                variant='contained'
                                disabled={order.payment?.status !== 'pending' || !pending || buttonLoading.paid}
                                onClick={handlePaid}
                            >
                                {buttonLoading.paid ? <CircularProgress size={24}/> : 'Mark as paid'}
                            </Button>
                        </Box>
                    </>
                )}
            </PageContainer>
        </>
    )
}