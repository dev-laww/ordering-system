'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { IconLock } from '@tabler/icons-react';
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const [errors, setErrors] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const router = useRouter();

    const handleSubmit = async event => {
        event.preventDefault();
        setErrors({})

        const data = new FormData(event.currentTarget);
        const credentials = {
            email: data.get('email')
        };

        const valid = Object.keys(credentials).every(key => credentials[key] !== '');

        if (!valid) {
            Object.keys(credentials).forEach(key => {
                if (credentials[key] === '') setErrors(prev => ({ ...prev, [key]: 'Required' }))
            })

            return
        }

        setLoading(true)

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'token',
                    ...credentials
                }),
            });

            const json = await res.json();

            setLoading(false);

            if (!res.ok) {
                switch (res.status) {
                    case 400:
                        return setErrors({ email: 'Required' });
                    case 404:
                        return setErrors({ email: 'Not found' });
                }

                throw Error(json.message)
            }

            setSuccess(true)

            setTimeout(() => {
                router.push('/auth/login')
            }, 3000)
        } catch (err) {
            console.log(err);
        }

        setLoading(false)
    };

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
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <IconLock/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        autoComplete="email"
                        name="email"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        error={!!errors.email}
                        helperText={errors.email}
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading || success}
                    >
                        {success ? 'Email sent' : 'Send email'}
                    </Button>

                </Box>
            </Box>
        </Container>
    );
}