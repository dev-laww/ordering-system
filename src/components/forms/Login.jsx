'use client'

import * as React from 'react';

import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Link,
    TextField,
    Typography
} from '@mui/material';
import { signIn, useSession } from "next-auth/react";
import { IconLock } from "@tabler/icons-react";
import { useRouter } from "next/navigation";


export default function SignIn() {
    const [errors, setErrors] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const { data: session } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (!session) return

        router.push('/')
    }, [router, session])

    const handleSubmit = async event => {
        event.preventDefault();

        setErrors({})

        const data = new FormData(event.currentTarget);
        const credentials = {
            email: data.get('email'),
            password: data.get('password')
        }

        const valid = Object.keys(credentials).every(key => credentials[key] !== '')

        if (!valid) {
            Object.keys(credentials).forEach(key => {
                if (credentials[key] === '') setErrors(prev => ({ ...prev, [key]: 'Required' }))
            })

            return
        }

        setLoading(true)

        const res = await signIn('credentials', { redirect: false, ...credentials })

        if (res.error) setErrors({ email: 'Invalid credentials', password: 'Invalid credentials' })

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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        error={!!errors.email}
                        helperText={errors.email}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        error={!!errors.password}
                        helperText={errors.password}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24}/> : 'Sign In'}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/auth/forgot-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/auth/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}