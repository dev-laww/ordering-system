import z from "zod";

const Validators = {
    create: z.object({
        userId: z.string().uuid(),
        addressId: z.string().uuid(),
        paymentMethod: z.enum(["ewallet", "cash"]),
        items: z.array(z.object({
            id: z.string().uuid(),
            quantity: z.number().int().positive(),
        }))
    })
}

export default Validators;
