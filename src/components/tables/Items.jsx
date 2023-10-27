import { Button, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import StatusChip from '@components/common/StatusChip';

const Item = ({ item }) => (
    <TableRow
        component={Button}
        href={`/items/${item.id}`}
    >
        <TableCell>
            <Typography variant="subtitle2">
                {item.id}
            </Typography>
        </TableCell>
        <TableCell>
            <Typography variant="body2">
                {item.name}
            </Typography>
        </TableCell>
        <TableCell>
            <Typography>
                {item.size}
            </Typography>
        </TableCell>
        <TableCell>
            <Typography variant="body2">
                <Chip
                    label={item.stock}
                    color={item.stock < 0 ? 'error' : item.stock <= 10 ? 'warning' : 'primary'}
                />
            </Typography>
        </TableCell>
    </TableRow>
);

export default function Items({ items }) {
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
                            ID
                        </Typography>
                    </TableCell>
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
                            Size
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            variant="subtitle2"
                            color='primary.dark'
                            fontWeight={600}
                        >
                            Stock
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Boolean(items) ? items.map((item) => <Item key={item.id} item={item}/>) : (
                    <TableRow>
                        <TableCell colSpan={4}>
                            <Typography variant="subtitle2">
                                No items found
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}