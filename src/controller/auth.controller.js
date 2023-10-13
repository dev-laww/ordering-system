import Validators from "@lib/validator/auth.validator";
import Response, { getBody } from "@lib/http";
import UserRepository from "@repository/user.repo";
import { generateAccessToken, generateRefreshToken } from "@utils/token";

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
}
