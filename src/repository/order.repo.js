import prisma from "@lib/prisma";

export default class OrderRepository {
    prismaClient = prisma;

    async getAll(filters = undefined, limit = 50, cursor = undefined) {
        return this.prismaClient.order.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filters,
            include: { items: true }
        });
    }

    async getById(id) {
        return this.prismaClient.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: { item: true }
                },
                address: true,
                payment: true,
                user: true
            }
        });
    }

    async create(data) {
        return this.prismaClient.order.create({
            data: data,
            include: { items: true }
        });
    }

    async update(id, data) {
        return this.prismaClient.order.update({
            where: { id: id },
            data: data,
            include: { items: true }
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

    async getOrderItem(itemId) {
        return this.prismaClient.orderItem.findUnique({
            where: { id: itemId },
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

    async createOrderItems(orderId, items) {
        const data = [];

        for (const item of items) {
            const itemData = await this.prismaClient.orderItem.create({
                data: {
                    orderId,
                    itemId: item.itemId,
                    quantity: item.quantity
                }
            });

            data.push(itemData);
        }

        return data;
    }
}