import { Provider } from "@src/components";

export const metadata = {
    title: 'NBC Poultry Farm',
    description: 'NBC Poultry Farm',
    icon: '/favicon.ico',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body style={{
            minHeight: "100vh",
        }}>
        <Provider>
            {children}
        </Provider>
        </body>
        </html>
    )
}
