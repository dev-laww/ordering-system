const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const nonRelationalData = [
    'user',
    'item'
]

const seederMap = {
    user: require('./seeders/users.json'),
    address: require('./seeders/addresses.json'),
    item: require('./seeders/items.json'),
    order: require('./seeders/orders.json'),
    orderItem: require('./seeders/order-items.json'),
    payment: require('./seeders/payments.json'),
    itemRecord: require('./seeders/item-records.json'),
}

async function seed(func, seeder) {
    for (const data of seeder) {
        try {
            await func.create({ data });
        } catch (e) {
            console.error('--- Error seeding ---\n', e);
        }
    }
}


async function main() {
    for (const key in seederMap) {
        const seeder = seederMap[key];
        const func = prisma[key];

        console.log(`Seeding ${key}...`);

        if (!func) {
            console.log(`Seeder ${key} not found`);
            continue;
        }

        if (nonRelationalData.includes(key)) {
            await seed(func, seeder);
            continue;
        }

        await seed(func, seeder);

    }

    console.log('Seeding complete');
}


main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })