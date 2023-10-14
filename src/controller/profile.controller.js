import Validators from "@lib/validator/profile.validator";
import Response, { getBody, getSession, isAllowed } from "@lib/http";
import UserRepository from "@repository/user.repo";
import AddressRepository from "@repository/address.repo";
import { hash } from "@utils/hashing";

export default class ProfileController {
    repo = new UserRepository();
    addressRepo = new AddressRepository();

    async profile(req) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const { role, confirmed, ...session } = await getSession(req);

        return Response.ok("Profile", session);
    }

    async update(req) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const reqData = Validators.update.safeParse(body);

        if (!reqData.success) return Response.badRequest(reqData.error);

        const { role, confirmed, ...session } = await getSession(req);

        const {
            password,
            createdAt,
            updatedAt,
            role: userRole,
            confirmed: userConfirmed,
            ...user
        } = await this.repo.update(session.id, reqData.data);

        return Response.ok("Profile updated successfully", user);
    }

    async changePassword(req) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const session = await getSession(req);
        const password = Validators.password.safeParse(body);

        if (!password.success) return Response.validationError(password.error.errors);

        const passwordMatches = await this.repo.verifyPassword(session.id, password.data.oldPassword);

        if (!passwordMatches) return Response.unauthorized("Password is incorrect");
        if (password.data.newPassword !== password.data.confirmPassword) return Response.badRequest("Passwords do not match");

        await this.repo.update(session.id, {
            password: await hash(password.data.newPassword)
        });

        return Response.ok("Password updated successfully");
    }

    async addresses(req) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const session = await getSession(req);

        const addresses = await this.addressRepo.getAllUserAddresses(session.id);

        if (!addresses.length) return Response.notFound("No addresses found");

        return Response.ok("Addresses", addresses);
    }

    async addAddress(req) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const session = await getSession(req);

        const address = Validators.address.safeParse(body);

        if (!address.success) return Response.validationError(address.error.errors);

        address.data.userId = session.id;

        const created = await this.addressRepo.create(address.data);

        return Response.created("Address added successfully", created);
    }

    async address(req, params) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const address = await this.addressRepo.getById(params.id);

        if (!address) return Response.notFound("Address not found");

        return Response.ok("Address", address);
    }

    async updateAddress(req, params) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const address = Validators.address.safeParse(body);

        if (!address.success) return Response.validationError(address.error.errors);

        const exists = await this.addressRepo.getById(params.id);

        if (!exists) return Response.notFound("Address not found");

        const updated = await this.addressRepo.update(params.id, address.data);

        return Response.ok("Address updated successfully", updated);
    }

    async deleteAddress(req, params) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const exists = await this.addressRepo.getById(params.id);

        if (!exists) return Response.notFound("Address not found");

        await this.addressRepo.delete(params.id);

        return Response.ok("Address deleted successfully");
    }
}
