'use client'

import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import Image from "next/image";
import * as React from "react";
import { useSession } from "next-auth/react";
import { useFetch } from "@lib/hooks";
import { Loading } from "@src/components";

export default function Checkout({ item }) {
    const { data: session, status } = useSession()
    const [errors, setErrors] = React.useState({})
    const [input, setInput] = React.useState({ address: '', quantity: 1, payment: '' })
    const [data, loading, error] = useFetch('/api/profile/addresses', {}, status)

    if (status === 'loading' || loading) return <Loading/>;

    const addresses = data.data

    const handleChange = e => {
        const { name, value } = e.target

        if (isNaN(value)) {
            setErrors(prev => ({ ...prev, [name]: 'Must be a number' }))
            setInput(prev => ({ ...prev, [name]: value }))
            return
        }

        if (!isNaN(value) && Number(value) <= 0) {
            setErrors(prev => ({ ...prev, [name]: 'Must be greater than 0' }))
            setInput(prev => ({ ...prev, [name]: value }))
            return
        }

        if (name === 'quantity' && Number(value) > item.stock) {
            setErrors(prev => ({ ...prev, [name]: 'Must be less than or equal the stock' }))
            setInput(prev => ({ ...prev, [name]: value }))
            return
        }

        setErrors(prev => ({ ...prev, [name]: '' }))
        setInput(prev => ({ ...prev, [name]: Number(value) }))
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const order = {
            userId: session.user.id,
            addressId: input.address,
            paymentMethod: input.payment,
            items: [{
                itemId: item.id,
                quantity: input.quantity
            }]
        }

        console.log(order)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Checkout
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="quantity"
                        label="Quantity"
                        placeholder={item.stock}
                        name="quantity"
                        value={input.quantity}
                        onChange={handleChange}
                        error={Boolean(errors.quantity)}
                        helperText={errors.quantity}
                    />
                    <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
                        <InputLabel id='address-label'>Address *</InputLabel>
                        <Select
                            labelId='address-label'
                            label='Address *'
                            value={input.address}
                            onChange={e => setInput(prev => ({ ...prev, address: e.target.value }))}
                        >
                            <MenuItem
                                value=""
                                disabled
                            >
                                {addresses ? 'Select an address' : 'No addresses found'}
                            </MenuItem>
                            {addresses && addresses.map(address => (
                                <MenuItem key={address.id} value={address.id}>
                                    {address.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
                        <InputLabel id='payment-label'>Payment method *</InputLabel>
                        <Select
                            labelId='payment-label'
                            label='Payment method *'
                            value={input.payment}
                            onChange={e => setInput(prev => ({ ...prev, payment: e.target.value }))}
                        >
                            <MenuItem value="" disabled>
                                Select payment method
                            </MenuItem>
                            <MenuItem value='cash'>Cash</MenuItem>
                            <MenuItem value='ewallet'>GCash</MenuItem>
                        </Select>
                    </FormControl>
                    {input.payment === 'ewallet' && (
                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Image
                                src='/gcash.png'
                                alt='GCash'
                                width={120}
                                height={120}
                            />
                        </Box>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24}/> : 'Checkout'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}