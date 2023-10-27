'use client'

import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react'


export default function AddItem() {
    const [errors, setErrors] = useState({})
    const [priceAndStock, setPriceAndStock] = useState({})

    const handleSubmit = async e => {
        e.preventDefault()

        const data = new FormData(e.currentTarget);
        const item = {
            name: data.get('name'),
            size: data.get('size'),
            quantity: priceAndStock.stock,
            price: priceAndStock.price
        }

        // validate nd set errors if any

        console.log(item)
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

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="size"
                    label="Size"
                    name="size"
                    error={Boolean(errors.size)}
                    helperText={errors.size}
                />
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
                >
                    Add Item
                </Button>
            </Box>
        </Box>
    )
}