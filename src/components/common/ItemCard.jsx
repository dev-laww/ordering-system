import * as React from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography, Link } from '@mui/material';


export default function ItemCard({ item }) {
    return (
        <Card sx={{ minWidth: 250 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {item.name}
                </Typography>
                <Typography variant="h5" component="div">
                    {item.price}
                </Typography>
                <Typography variant="body2">
                    {item.size}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    component={Link}
                    href={`/items/${item.id}`}
                >
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
}