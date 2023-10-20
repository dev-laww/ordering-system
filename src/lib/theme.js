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
        fontFamily: poppins.style.fontFamily
    }
});


