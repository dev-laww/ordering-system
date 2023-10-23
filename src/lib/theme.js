import { Poppins } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const poppins = Poppins({
    weight: ['300', '400', '500', '700'],
    styles: ['regular', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})

export const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#96734e'
        },
        secondary: {
            main: '#fef8c3'
        },
        background: {
            default: '#EFE3D9'
        },
    },
    typography: {
        fontFamily: poppins.style.fontFamily,
        h1: {
            fontWeight: 600,
            fontSize: '2.25rem',
            lineHeight: '2.75rem'
        },
        h2: {
            fontWeight: 600,
            fontSize: '1.875rem',
            lineHeight: '2.25rem'
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: '1.75rem'
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.3125rem',
            lineHeight: '1.6rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: '1.6rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: '1.2rem',
        },
        button: {
            textTransform: 'capitalize',
            fontWeight: 400
        },
        body1: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: '1.334rem'
        },
        body2: {
            fontSize: '0.75rem',
            letterSpacing: '0rem',
            fontWeight: 400,
            lineHeight: '1rem'
        },
        subtitle1: {
            fontSize: '0.875rem',
            fontWeight: 400
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 400
        },
    }
});


