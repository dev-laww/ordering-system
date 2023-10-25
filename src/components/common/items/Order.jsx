import { TableCell, TableRow, Typography, } from '@mui/material';

import StatusChip from "@components/common/StatusChip";

export default function Order({ order }) {
    return (
        <TableRow>
            <TableCell>
                <Typography variant="body2">
                    {order.createdAt}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="subtitle2">
                    {order.id}
                </Typography>
            </TableCell>
            <TableCell>
                <StatusChip status={order.status}/>
            </TableCell>
            <TableCell>
                <Typography
                    color="textSecondary"
                    variant="subtitle2"
                >
                    {order.total}
                </Typography>
            </TableCell>
        </TableRow>)
}