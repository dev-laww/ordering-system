import z from "zod";

const Validators = {
    login: z.object({
        "email": z.string({ required_error: "Email or username is required" }),
        "password": z.string({ required_error: "Password is required" })
    })
}

export default Validators;
