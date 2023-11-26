import * as React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Link, Typography } from '@mui/material';


export default function ItemCard({ item }) {
    return (
        <Card sx={ { minWidth: 250 } }>
            <CardActionArea component={Link} href={`/items/${item.id}`}>
                <CardContent>
                    <CardMedia
                        component="img"
                        image="/egg.jpg"
                        title="Egg"
                        sx={ { height: 200, marginBottom: 3 } }
                    />
                    <Typography sx={ { fontSize: 14 } } color="text.secondary" gutterBottom>
                        { item.name }
                    </Typography>
                    <Typography variant="h5" component="div">
                        { item.price }
                    </Typography>
                    <Typography variant="body2">
                        { item.size }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}