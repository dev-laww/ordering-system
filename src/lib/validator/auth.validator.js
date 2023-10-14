import z from "zod";

const Validators = {
    login: z.object({
        email: z.string({ required_error: "Email or username is required" }),
        password: z.string({ required_error: "Password is required" })
    }),
    register: z.object({
        firstName: z.string({ required_error: "First name is required" }),
        lastName: z.string({ required_error: "Last name is required" }),
        email: z.string({ required_error: "Email is required" })
            .email("Invalid email address"),
        password: z.string({ required_error: "Password is required" }),
        confirmPassword: z.string({ required_error: "Confirm password is required" }),
    }),
    refreshToken: z.object({
        token: z.string({ required_error: "Token is required" })
    }),
    forgotPassword: z.object({
        email: z.string({ required_error: "Token is required" })
            .email("Invalid email address"),
        type: z.enum(["otp", "token"], { required_error: "Type is required" })
    }),
    resetPassword: z.object({
        password: z.string({ required_error: "Password is required" }),
        confirmPassword: z.string({ required_error: "Confirm password is required" }),
        token: z.string({ required_error: "Token is required" }),
        type: z.enum(["otp", "token"], { required_error: "Type is required" })
    }),
    confirmEmail: z.object({
        "type": z.enum(["otp", "token"], { required_error: "Type is required" }),
        "token": z.string({ required_error: "Token is required" })
    }),
    resendVerificationEmail: z.object({
        type: z.enum(["otp", "token"], { required_error: "Type is required" }),
        email: z.string({ required_error: "Email is required" })
    }),
}

export default Validators;
