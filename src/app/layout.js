import { Provider } from "@src/components";

export const metadata = {
    title: 'Ordering System',
    description: 'Ordering System',
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
