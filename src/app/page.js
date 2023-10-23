"use client"

import Navigation from "@components/common/Navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@components/Loading";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") return <Loading/>;

    if (!session) router.push("/auth/login");

    return (
        <>
            <Navigation/>
            <main
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "70vh",
                }}
            >
            </main>
        </>
    );
}