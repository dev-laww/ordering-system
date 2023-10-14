import z from "zod";

const Validators = {
    create: z.object({
        userId: z.string().uuid(),
        addressId: z.string().uuid(),
        paymentMethod: z.enum(["ewallet", "cash"]),
        items: z.array(z.object({
            itemId: z.string().uuid(),
            quantity: z.number().int().positive(),
        }))
    }),
    complete: z.object({
        reason: z.string()
    }),
    cancel: z.object({
        reason: z.string()
    })
}

export default Validators;
