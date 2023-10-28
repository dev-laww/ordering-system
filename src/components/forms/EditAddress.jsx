'use client'

import * as React from 'react';
import { Box, Container, Grid, TextField } from '@mui/material/';
import { Button, CircularProgress, Typography } from "@mui/material";

export default function EditAddress({ address }) {
    const [loading, setLoading] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [input, setInput] = React.useState(address);

    const handleSubmit = async e => {
        e.preventDefault();

        console.log(input)

        // modify this to send the payload on address submit
    }

    const handleChange = e => {
        const { name, value } = e.target

        setInput(prev => ({ ...prev, [name]: value }))
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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                                    onClick={() => {
                                        setInput(address)
                                        setEdit(!edit)
                                    }}
                                >
                                    {edit ? 'Cancel' : 'Edit'}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={handleSubmit}
                                    disabled={loading || !edit}
                                >
                                    {loading ? <CircularProgress size={24}/> : 'Save'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
