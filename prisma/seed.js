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
}

async function seed(func, seeder) {
    for (const data of seeder) {
        try {
            await func.create({ data });
        } catch (e) {
            console.error('--- Error seeding ---', e);
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

        console.log('Seeded complete');
    }
}


main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })