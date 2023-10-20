"use client"

import { LogoutButton, ProfileButton, } from "@components/buttons";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();


    return (
        <main
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
            }}
        >
            <div>
                <LogoutButton/>
                <ProfileButton/>
            </div>
        </main>
    );
}