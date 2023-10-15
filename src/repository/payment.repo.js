import prisma from "@lib/prisma";

export default class PaymentRepository {
    prismaClient = prisma;

    async getAll(filter = undefined, limit = 50, cursor = undefined) {
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
            where: { orderId: orderId },
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

    async completed(id, reason) {
        return this.prismaClient.payment.update({
            where: { id: id },
            data: { status: "completed", reason },
        });
    }

    async cancel(id) {
        return this.prismaClient.payment.update({
            where: { id: id },
            data: { status: "cancelled" },
        });
    }
}