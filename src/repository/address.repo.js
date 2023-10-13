import prisma from "@lib/prisma";

export default class AddressRepository {
    prismaClient = prisma;

    async getAll(filters, limit = 50, cursor) {
        return this.prismaClient.address.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filters,
        });
    }

    async getById(id){
        return this.prismaClient.address.findUnique({
            where: { id: id },
        });
    }

    async create(data) {
        return this.prismaClient.address.create({
            data: data
        });
    }

    async update(id, data) {
        return this.prismaClient.address.update({
            where: { id: id },
            data: data
        });
    }

    async delete(id) {
        return this.prismaClient.address.delete({
            where: { id: id }
        });
    }

    async getAllUserAddresses(userId) {
        return this.prismaClient.address.findMany({
            where: { userId }
        });
    }
}