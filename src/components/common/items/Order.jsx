import { Chip, TableCell, TableRow, Typography, } from "@mui/material";

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
                <Chip
                    sx={{
                        px: "4px",
                        backgroundColor:
                            order.status === "completed"
                                ? "primary.main"
                                : order.status === "cancelled" ? "error.main" : "warning.main",
                        color: "#fff",
                    }}
                    size="small"
                    label={
                        order.status
                            .charAt(0)
                            .toUpperCase() +
                        order.status.slice(1)
                    }
                />
            </TableCell>
            <TableCell
                sx={{
                    maxWidth: {
                        xs: 150,
                        md: 350,
                        lg: 500,
                    },
                }}
            >
                <Typography
                    color="textSecondary"
                    variant="subtitle2"
                >
                    {order.total}
                </Typography>
            </TableCell>
        </TableRow>)
}