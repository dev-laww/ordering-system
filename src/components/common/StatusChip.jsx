import { Chip } from '@mui/material';

export default function StatusChip({ status }) {
    const color = status === "completed" ? "primary.main" : status === "cancelled" ? "error.main" : "warning.main";
    const label = status.charAt(0).toUpperCase() + status.slice(1);

    return <Chip
        sx={{
            px: "4px",
            backgroundColor: color,
            color: "#fff",
        }}
        size="small"
        label={label}
    />
}