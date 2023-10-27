import { Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const Item = ({ history }) => (
    <TableRow>
        <TableCell>
            <Typography variant="subtitle2">
                {history.id}
            </Typography>
        </TableCell>
        <TableCell>
            <Typography variant="body2">
                {history.createdAt}
            </Typography>
        </TableCell>
        <TableCell>
            <Typography variant="body2">
                {history.quantity}
            </Typography>
        </TableCell>
        <TableCell>
            <Typography>
                <Chip
                    label={history.type.charAt(0).toUpperCase() + history.type.slice(1)}
                    color={history.type === 'sale' ? 'success' : 'primary'}
                    size="small"
                />
            </Typography>
        </TableCell>
    </TableRow>
);

export default function Items({ histories }) {
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
                            Date
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
                            Type
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Boolean(histories) ? histories.map((history) => <Item key={history.id} history={history}/>) : (
                    <TableRow>
                        <TableCell colSpan={4}>
                            <Typography variant="subtitle2">
                                No histories found
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}