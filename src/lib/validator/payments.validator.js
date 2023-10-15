import z from "zod";

const Validators = {
    markAsCompleted: z.object({
        reason: z.string().min(5).max(255),
    })
}

export default Validators;
