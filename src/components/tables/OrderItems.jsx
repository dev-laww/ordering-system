import { Button, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const OrderItem = ({ item }) => (
    <TableRow
        component={Button}
        href={`/items/${item.item.id}`}
    >
        <TableCell>{item.item.name}</TableCell>
        <TableCell>{item.quantity}</TableCell>
        <TableCell>{item.item.price}</TableCell>
        <TableCell>{item.item.price * item.quantity}</TableCell>
    </TableRow>
);

export default function OrderItems({ items }) {
    return (
        <Table sx={{ my: 2 }}>
            <TableHead>
                <TableCell>
                    <Typography
                        variant="subtitle2"
                        color='primary.dark'
                        fontWeight={600}
                    >
                        Name
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="subtitle2"
                        color='primary.dark'
                        fontWeight={600}
                    >
                        Quantity
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="subtitle2"
                        color='primary.dark'
                        fontWeight={600}
                    >
                        Price
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography
                        variant="subtitle2"
                        color='primary.dark'
                        fontWeight={600}
                    >
                        Total
                    </Typography>
                </TableCell>
            </TableHead>
            {items.map(item => <OrderItem key={item.id} item={item}/>)}
        </Table>
    )
}