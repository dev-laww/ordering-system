import Provider from "@components/Provider";

export const metadata = {
    title: 'Ordering System',
    description: 'Ordering System',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <Provider>
            {children}
        </Provider>
        </body>
        </html>
    )
}
