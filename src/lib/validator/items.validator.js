import z from "zod";

const Validators = {
    create: z.object({
        name: z.string().min(2).max(255),
        price: z.number().min(0),
        size: z.enum(['small', 'medium', 'large']),
        quantity: z.number().min(0)
    }),
    update: z.object({
        name: z.string().min(2).max(255).optional(),
        price: z.number().min(0).optional(),
        size: z.enum(['small', 'medium', 'large']).optional(),
        quantity: z.number().min(0).optional()
    }),
    restock: z.object({
        quantity: z.number().min(0)
    }),
}

export default Validators;
