import prisma from "@lib/prisma";

export default class ItemRepository {
    prismaClient = prisma;

    async getAll(filters, limit = 50, cursor) {
        return this.prismaClient.item.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filters,
        });
    }

    async getById(id){
        return this.prismaClient.item.findUnique({
            where: { id: id },
        });
    }

    async create(data) {
        let item = await this.prismaClient.item.create({
            data: data
        });

        await this.prismaClient.itemRecord.create({
            data: {
                itemId: item.id,
                quantity: item.quantity
            }
        });

        return item;
    }

    async update(id, data) {
        return this.prismaClient.item.update({
            where: { id: id },
            data: data
        });
    }

    async delete(id) {
        return this.prismaClient.item.delete({
            where: { id: id }
        });
    }

    async restock(id, quantity) {
        let item = this.prismaClient.item.update({
            where: { id: id },
            data: {
                quantity: {
                    increment: quantity
                }
            }
        });

        await this.prismaClient.itemRecord.create({
            data: {
                itemId: id,
                quantity: data.quantity
            }
        });

        return item;
    }
}