import prisma from "@lib/prisma";
import { hash } from "@utils/hashing";
import { compare } from "bcryptjs";


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

    async getRole(id) {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                role: true
            }
        });

        return user ? user.role : null;
    }

    async updateRoles(id, roles) {
        const userRoles = await this.getRoles(id).then(roles => roles.map(role => role.id));

        const rolesToAdd = roles.filter(role => !userRoles.includes(role));
        const rolesToRemove = userRoles.filter(role => !roles.includes(role));

        return this.prismaClient.user.update({
            where: { id: id },
            data: {
                roles: {
                    create: rolesToAdd.map(role => ({ role_id: role })),
                    deleteMany: rolesToRemove.map(role => ({ role_id: role }))
                }
            }
        });
    }

    async getPayments(id) {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                payments: true
            }
        });

        return user ? user.payment_methods.map(({
                                                    createdAt,
                                                    updatedAt,
                                                    userId,
                                                    ...rest
                                                }) => rest) : [];
    }

    async deletePayment(id) {
        return this.prismaClient.paymentMethod.delete({
            where: {
                userId: id
            }
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

    async getReviews(id) {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                reviews: true
            }
        })

        return user ? user.reviews.map(({ createdAt, updatedAt, userId, ...rest }) => rest ) : [];
    }

    async deleteReviews(id) {
        return this.prismaClient.review.deleteMany({
            where: {
                userId: id
            }
        });
    }

    async createPayment(id, orderId, type) {
        const order = await this.prismaClient.order.findUnique({
            where: { id: orderId }
        });

        if (!order) throw new Error("Order not found");

        return this.prismaClient.user.update({
            where: { id: id },
            data: {
                payments: {
                    create: {
                        orderId: orderId,
                        type: type,
                        amount: order.total,
                    }
                }
            },
            select: {
                payments: true
            }
        })
        .then(user => user.payments[0])
        .then(({ createdAt, updatedAt, userId, ...rest }) => rest);
    }

    async getTokens(id) {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                tokens: true
            }
        });

        return user ? user.tokens.map(({ created_at, updated_at, user_id, ...rest }) => rest) : [];
    }

    async generateTokenOTP(id, token, type) {
        return prisma.tokenOTP.create({
            data: {
                token: token,
                type: type,
                user_id: id,
            },
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

        const tokenCreatedAt = new Date(tokenRecord.created_at);
        const now = new Date();

        if (now.getTime() - tokenCreatedAt.getTime() > TOKEN_OTP_EXPIRY) {
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