import Validators from "@lib/validator/auth.validator";
import Response, { getBody } from "@lib/http";
import UserRepository from "@repository/user.repo";
import {
    generateAccessToken,
    generateOTP,
    generateRandomToken,
    generateRefreshToken,
    verifyRefreshToken
} from "@utils/token";
import { TOKEN_TYPE } from "@lib/constants";
import { hash } from "@utils/hashing";
import Email from "@utils/email";

export default class AuthController {
    repo = new UserRepository();

    async login(req) {
        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const reqData = Validators.login.safeParse(body);

        if (!reqData.success) return Response.validationError(reqData.error.errors);

        const { email, password } = reqData.data;
        const user = await this.repo.getByEmail(email);

        if (!user) return Response.notFound("User not found");

        const passwordMatch = await this.repo.verifyPassword(user.id, password);

        if (!passwordMatch) return Response.invalidCredentials("Password is incorrect");

        const session = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            confirmed: user.confirmed
        }

        const accessToken = generateAccessToken(session);
        const refreshToken = generateRefreshToken(session);

        return Response.ok("Login successful", {
            ...session,
            accessToken,
            refreshToken
        });
    }

    async register(req) {
        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const requestData = Validators.register.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        if (body.password !== body.confirmPassword) return Response.badRequest("Passwords do not match");

        delete body.confirmPassword;

        const userExistsByEmail = await this.repo.getByEmail(body.email);

        if (userExistsByEmail) return Response.badRequest("User already exists");

        body.password = await hash(body.password);

        const user = await this.repo.create(body)
        const userSession = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            role: user.role
        }

        const token = generateRandomToken();
        const confirmationToken = await this.repo.generateTokenOTP(
            user.id,
            token,
            TOKEN_TYPE.EMAIL_CONFIRMATION_TOKEN.toString()
        );

        if (!confirmationToken) return Response.internalServerError("Failed to generate confirmation token");


        try {
            await Email.sendToken(user.email, token)
        } catch (error) {
            return Response.internalServerError("Failed to send confirmation email");
        }

        return Response.created("Signup successful", {
            ...userSession,
            accessToken: generateAccessToken(userSession),
            refreshToken: generateRefreshToken(userSession),
        });
    }

    async refreshToken(req) {
        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const requestData = Validators.refreshToken.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        const session = await verifyRefreshToken(requestData.data.token);

        if (!session) return Response.unauthorized("Invalid refresh token");

        return Response.ok(
            "Token refresh successful",
            { accessToken: generateAccessToken(session) }
        );
    }

    async forgotPassword(req) {
        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const requestData = Validators.forgotPassword.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        const user = await this.repo.getByEmail(requestData.data.email);

        if (!user) return Response.notFound("User not found");

        const token = requestData.data.type === "otp" ? generateOTP() : generateRandomToken();
        const resetPasswordToken = await this.repo.generateTokenOTP(
            user.id,
            token,
            requestData.data.type === "otp" ?
                TOKEN_TYPE.PASSWORD_RESET_OTP.toString() :
                TOKEN_TYPE.PASSWORD_RESET_TOKEN.toString()
        );

        if (!resetPasswordToken) return Response.internalServerError("Failed to generate reset password token");

        try {
            requestData.data.type === "token" ?
                await Email.sendPasswordResetEmail(user.email, token) :
                await Email.sendPasswordResetOTP(user.email, token);
        } catch (error) {
            return Response.internalServerError("Failed to send confirmation email");
        }

        return Response.ok("Password reset email sent successfully");
    }

    async resetPassword(req) {
        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const requestData = Validators.resetPassword.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        if (body.password !== body.confirmPassword) return Response.badRequest("Passwords do not match");

        delete body.confirmPassword;

        const { success, data } = await this.repo.verifyTokenOTP(
            requestData.data.token,
            requestData.data.type === "otp" ?
                TOKEN_TYPE.PASSWORD_RESET_OTP.toString() :
                TOKEN_TYPE.PASSWORD_RESET_TOKEN.toString()
        );

        if (!success) return Response.unauthorized("Invalid token");

        await this.repo.changePassword(data.id, requestData.data.password);

        return Response.ok("Password change successful")
    }

    async verifyEmail(req) {
        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const requestData = Validators.confirmEmail.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        const { success, data } = await this.repo.verifyTokenOTP(
            requestData.data.token,
            requestData.data.type === "otp" ?
                TOKEN_TYPE.EMAIL_CONFIRMATION_OTP.toString() :
                TOKEN_TYPE.EMAIL_CONFIRMATION_TOKEN.toString()
        );

        if (!success) return Response.unauthorized("Invalid token");

        if (data.confirmed) return Response.badRequest("Email already confirmed");

        await this.repo.update(data.id, { confirmed: true });

        return Response.ok("Email confirm successful");
    }

    async resendVerificationEmail(req) {
        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const requestData = Validators.resendVerificationEmail.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        let user = await this.repo.getByEmail(requestData.data.email);

        if (!user) {
            user = await this.repo.getByUsername(requestData.data.email);

            if (!user) return Response.badRequest("User does not exist");
        }

        if (user.confirmed) return Response.badRequest("Email already confirmed");

        const token = requestData.data.type === "token" ? generateRandomToken() : generateOTP();
        const emailConfirmationToken = await this.repo.generateTokenOTP(
            user.id,
            token,
            requestData.data.type === "token" ? TOKEN_TYPE.EMAIL_CONFIRMATION_TOKEN.toString() : TOKEN_TYPE.EMAIL_CONFIRMATION_OTP.toString()
        );

        if (!emailConfirmationToken) return Response.internalServerError("Failed to generate confirmation token");

        try {
            requestData.data.type === "token" ?
                await Email.sendToken(user.email, token) :
                await Email.sendOTP(user.email, token);
        } catch (error) {
            return Response.internalServerError("Failed to send confirmation email");
        }

        return Response.ok("Confirmation email sent");
    }
}
