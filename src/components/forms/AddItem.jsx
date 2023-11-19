'use client'

import { Box, Button, TextField, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useState } from 'react'
import { fetchData } from '@src/lib/http';
import { useSession } from 'next-auth/react';


export default function AddItem() {
    const [errors, setErrors] = useState({})
    const [priceAndStock, setPriceAndStock] = useState({})
    const [size, setSize] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
    const { data: session } = useSession();

    const handleSubmit = async e => {
        e.preventDefault()
        setButtonLoading(true);

        const data = new FormData(e.currentTarget);
        const item = {
            name: data.get('name'),
            size: size,
            quantity: priceAndStock.stock,
            price: priceAndStock.price
        }

        await fetchData('/api/items', {
                method: 'POST',
                body: JSON.stringify(item)
            },
            session
        );

        window.location.reload();
    }

    const handleChange = e => {
        const { name, value } = e.target

        if (isNaN(value)) {
            setErrors(prev => ({ ...prev, [name]: 'Must be a number' }))
            setPriceAndStock(prev => ({ ...prev, [name]: value }))
            return
        }

        if (!isNaN(value) && Number(value) <= 0) {
            setErrors(prev => ({ ...prev, [name]: 'Must be greater than 0' }))
            setPriceAndStock(prev => ({ ...prev, [name]: value }))
            return
        }

        setErrors(prev => ({ ...prev, [name]: '' }))
        setPriceAndStock(prev => ({ ...prev, [name]: Number(value) }))
    }

    const handleSelectChange = e => {
        const { value } = e.target;
        setSize(value);
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Box sx={{ mt: 3 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoFocus
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                />
                <FormControl fullWidth>
                <InputLabel id="size-label">Size</InputLabel>
                <Select
                    labelId="size-label"
                    label="Size"
                    required
                    onChange={handleSelectChange}
                >
                    <MenuItem value='small'>Small</MenuItem>
                    <MenuItem value='medium'>Medium</MenuItem>
                    <MenuItem value='large'>Large</MenuItem>
                    <MenuItem value='xlarge'>Extra Large</MenuItem>
                </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="stock"
                    label="Stock"
                    placeholder='0'
                    name="stock"
                    value={priceAndStock.stock}
                    onChange={handleChange}
                    error={Boolean(errors.stock)}
                    helperText={errors.stock}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    value={priceAndStock.price}
                    onChange={handleChange}
                    placeholder='0.00'
                    error={Boolean(errors.price)}
                    helperText={errors.price}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={buttonLoading}
                >
                    Add Item
                </Button>
            </Box>
        </Box>
    )
}