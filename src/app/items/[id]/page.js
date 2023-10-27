'use client'

import { PageContainer } from "@components/common";
import { useSession } from "next-auth/react";
import { useFetch } from "@lib/hooks";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Loading } from "@src/components";
import { ItemHistory } from "@components/tables";
import * as React from "react";
import { useEffect, useState } from "react";
import { ERROR_CODE } from "@lib/constants";

export default function Item({ params }) {
    const { data: session, status } = useSession();
    const [item, loading, error] = useFetch(`/api/items/${params.id}`, {}, status);
    const [history, loadingHistory, errorHistory] = useFetch(`/api/items/${params.id}/history`, {}, status);
    const [buttonLoading, setButtonLoading] = useState({});
    const [edit, setEdit] = useState(false);
    const [restock, setRestock] = useState(false);
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!item?.data) return;

        setInput(prev => ({
            ...prev,
            size: item.data.size,
            price: item.data.price,
            stock: item.data.stock
        }));
    }, [item]);

    if (loading || status === 'loading' || loadingHistory) return <Loading/>;

    if (item.code && item.code === ERROR_CODE.NOT_FOUND) return <PageContainer title="Item Not Found"/>;

    const admin = session.user.role === 'admin';
    const handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const item = {
            name: data.get('name'),
            price: input.price,
            size: input.size
        }

        console.log(item)

        // figure out a way to detect if item action is restock or edit
        // if restock, then call /api/items/:id/restock
        // if edit, then call /api/items/:id/edit
        // set loading
        // setButtonLoading(prev => ({ ...prev, save: true }));
        // window.location.reload();
    }

    const handleEdit = async e => {
        e.preventDefault();

        if (!edit) return setEdit(true);

        window.location.reload();
    }

    const handleDelete = async e => {
        e.preventDefault();

        setButtonLoading(prev => ({ ...prev, delete: true }));

        // call /api/items/:id/delete
    }

    const handleChange = e => {
        const { name, value } = e.target

        if (isNaN(value)) {
            setErrors(prev => ({ ...prev, [name]: 'Must be a number' }))
            setInput(prev => ({ ...prev, [name]: value }))
            return
        }

        if (!isNaN(value) && Number(value) <= 0) {
            setErrors(prev => ({ ...prev, [name]: 'Must be greater than 0' }))
            setInput(prev => ({ ...prev, [name]: value }))
            return
        }

        if (name === 'stock' && Number(value) <= item.data.stock) {
            setErrors(prev => ({ ...prev, [name]: 'Must be greater than stock' }))
            setInput(prev => ({ ...prev, [name]: value }))
            return
        }

        setErrors(prev => ({ ...prev, [name]: '' }))
        setInput(prev => ({ ...prev, [name]: Number(value) }))
    }

    const handleRestock = async e => {
        e.preventDefault();

        if (!restock) return setRestock(true);

        setRestock(false);
        setInput(prev => ({ ...prev, stock: item.data.stock }));
        setErrors(prev => ({ ...prev, stock: undefined }));
    }

    return (
        <>
            <PageContainer title='Item' subtitle={params.id}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        defaultValue={item.data.name}
                        autoFocus
                        disabled={!edit}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        name="price"
                        value={input.price}
                        onChange={handleChange}
                        placeholder={item.data.price}
                        disabled={!edit}
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                    />
                    <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth disabled={!edit}>
                        <InputLabel id='size-label'>Size *</InputLabel>
                        <Select
                            labelId='size-label'
                            label='Size *'
                            value={input.size}
                            onChange={e => setInput(prev => ({ ...prev, size: e.target.value }))}
                        >
                            <MenuItem value="small">
                                Small
                            </MenuItem>
                            <MenuItem value="medium">
                                Medium
                            </MenuItem>
                            <MenuItem value="large">
                                Large
                            </MenuItem>
                        </Select>
                    </FormControl>
                    {restock && (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="stock"
                            label="Stock"
                            name="stock"
                            value={input.stock}
                            onChange={handleChange}
                            placeholder={item.data.stock}
                            disabled={!restock}
                            error={Boolean(errors.stock)}
                            helperText={errors.price}
                        />
                    )}


                    {admin && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }} gap={1}>
                            <Button onClick={handleDelete} variant="contained" disabled={buttonLoading.delete}>
                                Delete
                            </Button>
                            <Button onClick={handleRestock} variant="contained" disabled={edit}>
                                {restock ? 'Cancel' : 'Restock'}
                            </Button>
                            <Button onClick={handleEdit} variant="contained" disabled={restock}>
                                {edit ? 'Cancel' : 'Edit'}
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={buttonLoading.save || (!edit && !restock)}
                            >
                                Save
                            </Button>

                        </Box>
                    )}
                </Box>
            </PageContainer>

            {admin && (
                <PageContainer title='Stock History'>
                    <ItemHistory histories={history.data}/>
                </PageContainer>
            )}
        </>
    )
}