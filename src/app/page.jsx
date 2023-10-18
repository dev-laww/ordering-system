"use client"

import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    RegisterButton,
} from "@components/buttons";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();

    console.log(session);

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
                <LoginButton />
                <RegisterButton />
                <LogoutButton />
                <ProfileButton />
            </div>
        </main>
    );
}