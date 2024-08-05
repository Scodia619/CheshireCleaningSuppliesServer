const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seed = async() => {

    await prisma.$executeRaw`TRUNCATE TABLE "Tags" RESTART IDENTITY CASCADE`;

    await prisma.tags.create({
        data: {
            tag_name: "Cleaning"
        }
    })

}

seed();

module.exports = seed;