import prisma from "@lib/prisma";
import { hash, compare } from "@utils/hashing";
import { TOKEN_OTP_EXPIRY } from "@lib/constants";


export default class UserRepository {
    prismaClient = prisma;

    async getAll(filter, limit = 50, cursor) {
        return this.prismaClient.user.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter,
            orderBy: { id: "asc" }
        }).then(users => users.map(({ password, createdAt, updatedAt, confirmed, ...rest }) => rest));
    }

    async getById(id) {
        return this.prismaClient.user.findUnique({
            where: { id: id }
        }).then((res => {
            if (!res) return null;

            const { password, createdAt, updatedAt, confirmed, ...rest } = res;
            return rest;
        }));
    }

    async getByEmail(email) {
        return this.prismaClient.user.findUnique({
            where: { email: email }
        });
    }

    async getByUsername(username) {
        return this.prismaClient.user.findUnique({
            where: { username: username }
        });
    }

    async create(data) {
        return this.prismaClient.user.create({
            data: data
        });
    }

    async update(id, data) {
        return this.prismaClient.user.update({
            where: { id: id },
            data: data
        });
    }

    async changePassword(id, password) {
        const hashed = await hash(password);

        return this.prismaClient.user.update({
            where: { id: id },
            data: {
                password: hashed
            }
        });
    }

    async delete(id) {
        return this.prismaClient.user.delete({
            where: { id: id }
        });
    }

    async getAddresses(id) {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                addresses: true
            }
        });

        return user ? user.addresses.map(({ createdAt, updatedAt, userId, ...rest }) => rest) : [];
    }

    async deleteAddress(id) {
        return this.prismaClient.address.delete({
            where: {
                userId: id
            }
        });
    }

    async getOrders(id) {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                orders: {
                    include: {
                        orderItems: true
                    }
                }
            }
        });

        return user ? user.orders.map(({ createdAt, updatedAt, userId, ...rest }) => rest) : [];
    }

    async deleteOrders(id) {
        return this.prismaClient.order.deleteMany({
            where: {
                userId: id
            }
        });
    }

    async generateTokenOTP(id, token, type) {
        return prisma.tokenOTP.create({
            data: {
                token,
                type,
                userId: id,
                expiredAt: new Date(Date.now() + TOKEN_OTP_EXPIRY)
            }
        });
    }

    async verifyTokenOTP(token, type) {
        const tokenRecord = await prisma.tokenOTP.findFirst({
            where: {
                token: token,
                type: type,
            },
            include: {
                user: true,
            }
        });

        if (!tokenRecord) return {
            success: false,
            data: {}
        };

        const tokenCreatedAt = new Date(tokenRecord.expiredAt);
        const now = new Date();

        if (now.getTime() > tokenCreatedAt.getTime()) {
            await prisma.tokenOTP.delete({
                where: {
                    id: tokenRecord.id
                }
            });

            return {
                success: false,
                data: {}
            };
        }

        await prisma.tokenOTP.delete({
            where: {
                id: tokenRecord.id
            }
        });

        return {
            success: true,
            data: tokenRecord.user
        };
    }

    async verifyPassword(id, password) {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                password: true
            }
        });

        if (!user) return false;

        return compare(password, user.password);
    }
}