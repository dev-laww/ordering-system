import prisma from "@lib/prisma";

export default class OrderRepository {
    prismaClient = prisma;

    async getAll(filters, limit = 50, cursor) {
        return this.prismaClient.order.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filters,
        });
    }

    async getById(id){
        return this.prismaClient.order.findUnique({
            where: { id: id },
        });
    }

    async create(data) {
        return this.prismaClient.order.create({
            data: data
        });
    }

    async update(id, data) {
        return this.prismaClient.order.update({
            where: { id: id },
            data: data
        });
    }

    async delete(id) {
        return this.prismaClient.order.delete({
            where: { id: id }
        });
    }

    async getOrderItems(orderId) {
        return this.prismaClient.orderItem.findMany({
            where: { orderId: orderId },
            include: {
                item: true
            }
        });
    }

    async getByStatus(status) {
        return this.prismaClient.order.findMany({
            where: { status: status }
        });
    }
}