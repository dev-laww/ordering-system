const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const nonRelationalData = [
    'user'
]

const seederMap = {
    user: require('./seeders/users.json')
}


async function main() {
    for (const key in seederMap) {
        const seeder = seederMap[key];

        if (nonRelationalData.includes(key)) {
            for (const data of seeder) {
                const func = prisma[key];

                if (!func) {
                    console.log(`Seeder ${key} not found`);
                    continue;
                }

                try {
                    const res = await func.create({ data });
                    console.log(res.id);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
}


main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })