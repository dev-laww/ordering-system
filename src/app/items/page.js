'use client'

import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useFetch } from '@lib/hooks';
import { Loading } from '@src/components';
import { PageContainer } from '@components/common';
import { useSession } from 'next-auth/react';
import { Items as ItemsTable } from "@components/tables";
import { AddItem } from "@components/forms";
import { useState } from 'react';


export default function Items() {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            return { redirect: { destination: '/auth/login', permanent: false } }
        }
    });
    const [data, loading, error] = useFetch('/api/items', {}, status);
    const [open, setOpen] = useState(false);

    if (loading || status === 'loading') return <Loading/>;

    return (
        <>
            <PageContainer title="Items">
                <Box
                    sx={{
                        overflow: "auto",
                        width: { xs: "280px", sm: "auto" },
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Button
                        sx={{ alignSelf: 'flex-end' }}
                        variant="contained"
                        onClick={() => setOpen(true)}
                    >
                        Add Item
                    </Button>
                    <ItemsTable items={data.data}/>
                </Box>
            </PageContainer>
            <Dialog
                open={open}
                fullWidth
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    <Typography variant="h5">Add Item</Typography>
                </DialogTitle>
                <DialogContent
                >
                    <AddItem/>
                </DialogContent>
            </Dialog>
        </>
    )
};
