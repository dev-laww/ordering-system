import { Navigation } from "@components/common";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";

export const metadata = {
    title: 'NBC Poultry Farm - Profile',
    description: 'NBC Poultry Farm - Profile'
}

export default async function Layout({ children }) {
    const session = await getServerSession(authOptions);

    return (
        <>
            <Navigation admin={session.user.role === 'admin'}/>
            {children}
        </>
    )
}