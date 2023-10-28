"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loading } from "@src/components";
import { useFetch } from "@lib/hooks";
import { ItemCard, Navigation } from "@components/common";
import { Grid } from "@mui/material";

export default function Home() {
    const { data: session, status } = useSession();
    const [data, loading, error] = useFetch('/api/items', {}, status);

    if (status === "loading" || loading) return <Loading/>;

    const items = data.data;

    return (
        <>
            <Navigation admin={session.user.role === 'admin'}/>
            <Grid
                container
                spacing={2}
                sx={{
                    margin: "0 auto",
                    maxWidth: "1280px",
                    padding: "0 1rem",
                    width: "100%",
                }}
            >
                {items.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <ItemCard item={item}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}