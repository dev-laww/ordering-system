import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import Order from '@components/common/items/Order';

export default function Orders({ items }) {
    return (
        <Table aria-label="simple table" sx={{ mt: 2 }}>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography
                            variant="subtitle2"
                            color='primary.dark'
                            fontWeight={600}
                        >
                            Date
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            variant="subtitle2"
                            color='primary.dark'
                            fontWeight={600}
                        >
                            Order Number
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            variant="subtitle2"
                            color='primary.dark'
                            fontWeight={600}
                        >
                            Status
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
                </TableRow>
            </TableHead>
            <TableBody>
                {Boolean(items) ? items.map((order) => <Order key={order.id} order={order}/>) : (
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2">
                                No orders found
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}