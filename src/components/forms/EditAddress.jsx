'use client'

import * as React from 'react';
import { 
    Box,
    Container,
    Grid,
    TextField,
    Button,
    CircularProgress,
    Typography
} from '@mui/material';
import { fetchData } from '@src/lib/http';
import { useSession } from 'next-auth/react';


export default function EditAddress({ address }) {
    const { data: session } = useSession();
    const [loading, setLoading] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [input, setInput] = React.useState(address);
    const [errors, setErrors] = React.useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData(e.currentTarget);
        console.log(input)

        await fetchData(`/api/profile/addresses/${address.id}`, {
            method: 'PUT',
            body: JSON.stringify(input)
        }, session);

        window.location.reload();
    }

    const handleDelete = async e => {
        e.preventDefault();
        setLoading(true);

        await fetchData(`/api/profile/addresses/${address.id}`, {
            method: 'DELETE'
        }, session);

        window.location.reload();
    }

    const handleChange = e => {
        const { name, value } = e.target

        setInput(prev => ({ ...prev, [name]: value }))

        if (value == "") {
            setErrors(prev => ({ ...prev, [name]: 'This field is required.' }))
            return
        }

        if ((name == "zip" || name == "phone") && isNaN(value)) {
            setErrors(prev => ({ ...prev, [name]: 'Must be a number' }))
            setInput(prev => ({ ...prev, [name]: '' }))
            return
        }

        setErrors(prev => ({ ...prev, [name]: '' }))
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
                <Typography variant="h6" gutterBottom>
                    Address Details
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="name"
                                name="name"
                                label="Name"
                                fullWidth
                                autoComplete="given-name"
                                disabled={!edit}
                                value={input.name}
                                onChange={handleChange}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="address"
                                name="address"
                                label="Address"
                                fullWidth
                                autoComplete="address-line"
                                disabled={!edit}
                                value={input.address}
                                onChange={handleChange}
                                helperText={errors.address}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="address-level"
                                disabled={!edit}
                                value={input.city}
                                onChange={handleChange}
                                helperText={errors.city}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="state"
                                name="state"
                                label="State/Province/Region"
                                fullWidth
                                disabled={!edit}
                                value={input.state}
                                onChange={handleChange}
                                helperText={errors.state}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="zip"
                                name="zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="postal-code"
                                disabled={!edit}
                                value={input.zip}
                                onChange={handleChange}
                                helperText={errors.zip}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="phone"
                                name="phone"
                                label="Phone Number"
                                fullWidth
                                autoComplete="tel"
                                disabled={!edit}
                                value={input.phone}
                                onChange={handleChange}
                                helperText={errors.phone}
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                                    onClick={handleDelete}
                                    disabled={loading}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setInput(address)
                                        setEdit(!edit)
                                    }}
                                    disabled={loading}
                                >
                                    {edit ? 'Cancel' : 'Edit'}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading || !edit}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
