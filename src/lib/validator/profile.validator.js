import z from "zod";

const Validators = {
    update: z.object({
        firstName: z.string().min(3).max(255).optional(),
        lastName: z.string().min(3).max(255).optional()
    }),
    password: z.object({
        oldPassword: z.string({ required_error: "Old password is required" }).max(255),
        newPassword: z.string({ required_error: "New password is required" }).min(8).max(255),
        confirmPassword: z.string({ required_error: "Confirm password is required" }).min(8).max(255)
    }),
    address: z.object({
        name: z.string({ required_error: "Name is required" })
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 50 characters"),
        address: z.string({ required_error: "Address is required" })
            .min(3, "Address must be at least 3 characters long")
            .max(50, "Address must not exceed 50 characters"),
        city: z.string({ required_error: "City is required" })
            .min(3, "City must be at least 3 characters long")
            .max(50, "City must not exceed 50 characters"),
        state: z.string({ required_error: "State is required" })
            .max(50, "State must not exceed 50 characters"),
        zip: z.string({ required_error: "Zip is required" })
            .min(4, "Zip must be at least 4 characters long")
            .max(5, "Zip must not exceed 5 characters"),
        phone: z.string({ required_error: "Phone is required" })
    }),
    updateAddress: z.object({
        name: z.string()
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 50 characters")
            .optional(),
        address: z.string()
            .min(3, "Address must be at least 3 characters long")
            .max(50, "Address must not exceed 50 characters")
            .optional(),
        city: z.string()
            .min(3, "City must be at least 3 characters long")
            .max(50, "City must not exceed 50 characters")
            .optional(),
        state: z.string()
            .max(50, "State must not exceed 50 characters")
            .optional(),
        zip: z.string()
            .min(4, "Zip must be at least 4 characters long")
            .max(5, "Zip must not exceed 5 characters")
            .optional(),
        phone: z.string()
            .optional()
    }),
}

export default Validators;
