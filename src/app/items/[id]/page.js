'use client'

import { PageContainer } from "@components/common";
import { useSession } from "next-auth/react";
import { useFetch } from "@lib/hooks";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { Loading } from "@src/components";
import { ItemHistory } from "@components/tables";
import * as React from "react";
import { useEffect, useState } from "react";
import { ERROR_CODE } from "@lib/constants";
import { Checkout } from "@components/forms";
import { fetchData } from "@src/lib/http";

export default function Item({ params }) {
    const { data: session, status } = useSession();
    const [item, loading, error] = useFetch(`/api/items/${params.id}`, {}, status);
    const [history, loadingHistory, errorHistory] = useFetch(`/api/items/${params.id}/history`, {}, status);
    const [buttonLoading, setButtonLoading] = useState({});
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
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
        const item_payload = {
            name: data.get('name'),
            price: input.price,
            size: input.size
        }

        if (restock) {
            if (input.stock == item.data.stock) return;

            const res = await fetchData(`/api/items/${params.id}/restock`, {
                    method: 'POST',
                    body: JSON.stringify({ quantity: input.stock - item.data.stock })
                },
                session,
            );

            if (res.code) {
                setErrors(prev => ({ ...prev, stock: res.message }));
                return;
            }

            setButtonLoading(prev => ({ ...prev, save: true }));
            window.location.reload();
        } else {
            const res = await fetchData(`/api/items/${params.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(item_payload)
                },
                session,
            );

            if (res.code) {
                setErrors(prev => ({ ...prev, price: res.message }));
                return;
            }

            setButtonLoading(prev => ({ ...prev, save: true }));
            window.location.reload();
        }
    }

    const handleEdit = async e => {
        e.preventDefault();

        if (!edit) return setEdit(true);

        window.location.reload();
    }

    const handleDelete = async e => {
        e.preventDefault();

        setButtonLoading(prev => ({ ...prev, delete: true }));

        await fetchData(`/api/items/${params.id}`, {
                method: 'DELETE'
            },
            session,
        );

        window.location.href = '/items';
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
            setErrors(prev => ({ ...prev, [name]: `Must be greater than ${item.data.stock}` }))
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
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                            helperText={errors.stock}
                        />
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }} gap={1}>

                        {admin && (
                            <>
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
                            </>
                        )}

                        {!admin && (
                            <Button
                                variant="contained"
                                onClick={() => setOpen(true)}
                            >
                                Checkout
                            </Button>
                        )}
                    </Box>
                </Box>
            </PageContainer>
            <Dialog
                open={open}
                fullWidth
                onClose={() => setOpen(false)}
            >
                <DialogContent>
                    <Checkout item={item.data}/>
                </DialogContent>
            </Dialog>
            {admin && (
                <PageContainer title='Stock History'>
                    <ItemHistory histories={history.data}/>
                </PageContainer>
            )}
        </>
    )
}