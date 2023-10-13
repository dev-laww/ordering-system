import prisma from "@lib/prisma";

export default class PaymentRepository {
    prismaClient = prisma;

    async getAll(filter, limit = 50, cursor) {
        return this.prismaClient.payment.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter,
        });
    }

    async getById(id) {
        return this.prismaClient.payment.findUnique({
            where: { id: id },
        });
    }

    async getByOrderId(orderId){
        return this.prismaClient.payment.findMany({
            where: { order_id: orderId },
        });
    }

    async getByStatus(status) {
        return this.prismaClient.payment.findMany({
            where: { status: status },
        });
    }

    async create(data) {
        return this.prismaClient.payment.create({
            data: data,
        });
    }

    async update(id, data) {
        return this.prismaClient.payment.update({
            where: { id: id },
            data: data,
        });
    }

    async delete(id) {
        return this.prismaClient.payment.delete({
            where: { id: id },
        });
    }

    async success(id) {
        return this.prismaClient.payment.update({
            where: { id: id },
            data: { status: "success" },
        });
    }

    async fail(id) {
        return this.prismaClient.payment.update({
            where: { id: id },
            data: { status: "failed" },
        });
    }
}