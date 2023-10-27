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
import * as React from "react";
import { useSession } from "next-auth/react";
import { useFetch } from "@lib/hooks";
import { Loading } from "@src/components";

export default function Checkout({ item }) {
    const { data: session, status } = useSession()
    const [errors, setErrors] = React.useState({})
    const [input, setInput] = React.useState({ address: '', quantity: 1})
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
                    marginTop: 8,
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
                                Select an address
                            </MenuItem>
                            {addresses.map(address => (
                                <MenuItem key={address.id} value={address.id}>
                                    {address.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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