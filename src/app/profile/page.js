'use client'

import { useSession } from 'next-auth/react'
import { PageContainer } from "@components/common";
import { Loading } from '@src/components';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Dialog,
    DialogContent,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import { useFetch } from "@lib/hooks";
import { fetchData } from '@src/lib/http';
import { Address as AddAddress, EditAddress } from "@components/forms";

const Address = ({ address }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <Card sx={{ minWidth: 250 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {address.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {address.address}
                    </Typography>
                    <Typography variant="body2">
                        {address.city}, {address.state} {address.zip}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={() => setOpen(true)}
                    >
                        View Details
                    </Button>
                </CardActions>
            </Card>
            <Dialog
                open={open}
                fullWidth
                onClose={() => setOpen(false)}
            >
                <DialogContent
                >
                    <EditAddress address={address}/>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default function Profile() {
    const { data: session, status } = useSession()
    const [loading, setLoading] = React.useState(false)
    const [input, setInput] = React.useState({})
    const [edit, setEdit] = React.useState(false)
    const [addresses, addressLoading, error] = useFetch('/api/profile/addresses', {}, status)
    const [open, setOpen] = React.useState(false)
    const [errors, setErrors] = React.useState({})

    React.useEffect(() => {
        if (!session) return

        setInput(prev => ({
            ...prev,
            firstName: session.user.firstName,
            lastName: session.user.lastName
        }))
    }, [session])

    if (status === 'loading' || addressLoading) return <Loading/>

    const onChange = e => {
        const { name, value } = e.target

        if (name === 'confirmPassword' && value !== input.newPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }))
            setInput(prev => ({ ...prev, [name]: value }))
            console.log(value)
            return
        }

        setInput(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, confirmPassword: '' }))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        await fetchData('/api/profile', {
            method: 'PUT',
            body: JSON.stringify({
                firstName: input.firstName,
                lastName: input.lastName
            })
        }, session);
    }

    const handleChangeSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        const data = new FormData(e.target);
        const payload = {
            oldPassword: data.get('oldPassword'),
            newPassword: data.get('newPassword'),
            confirmPassword: data.get('confirmPassword')
        }

        await fetchData('/api/profile/change-password', {
            method: 'PUT',
            body: JSON.stringify(payload)
        }, session);

        setLoading(false)
    }

    return (
        <>
            <PageContainer title="Profile" subtitle={`${session.user.id}\n${session.user.email}`}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                disabled={!edit}
                                value={input.firstName}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                disabled={!edit}
                                value={input.lastName}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            mt: 3,
                            mb: 2,
                            gap: 2
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => {
                                setInput(prev => ({
                                    ...prev,
                                    firstName: session.user.firstName,
                                    lastName: session.user.lastName
                                }))
                                setEdit(!edit)
                            }}
                        >
                            {edit ? 'Cancel' : 'Edit'}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading || !edit}
                        >
                            {loading ? <CircularProgress size={24}/> : 'Save'}
                        </Button>
                    </Box>
                </Box>
            </PageContainer>

            <PageContainer title="Addresses">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                    >
                        Add Address
                    </Button>
                </Box>
                {addresses.data && addresses.data.map(address => (
                    <Box key={address.id} sx={{ mt: 2 }}>
                        <Address address={address}/>
                    </Box>
                ))}

                <Dialog
                    open={open}
                    fullWidth
                    onClose={() => setOpen(false)}
                >
                    <DialogContent
                    >
                        <AddAddress/>
                    </DialogContent>
                </Dialog>
            </PageContainer>

            <PageContainer title="Change Password">
                <Box component="form" onSubmit={handleChangeSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="oldPassword"
                                label="Old Password"
                                type="password"
                                id="old-password"
                                value={input.oldPassword}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                name="newPassword"
                                label="New Password"
                                type="password"
                                id="new-password"
                                value={input.password}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirm-password"
                                value={input.confirmPassword}
                                onChange={onChange}
                                helperText={errors.confirmPassword}
                            />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            mt: 3,
                            mb: 2,
                            gap: 2
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            Change Password
                        </Button>
                    </Box>
                </Box>
            </PageContainer>
        </>
    )
}
