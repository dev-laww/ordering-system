import { Navigation } from "@components/common";

export const metadata = {
    title: 'Ordering System - Orders',
    description: 'Ordering System - Orders'
}

export default function Layout({ children }) {
    return (
        <>
            <Navigation/>
            {children}
        </>
    )
}