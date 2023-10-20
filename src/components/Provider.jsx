'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@lib/theme';

function Provider({ children }) {
    return (
        <SessionProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </SessionProvider>);
}

export default Provider;