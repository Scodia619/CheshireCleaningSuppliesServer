const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seed = async() => {

    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Tags" RESTART IDENTITY CASCADE`;

    await prisma.tags.createMany({
        data: [
        {tag_name: "Cleaning"},
        {tag_name: "Car Supplies"}
    ]
    })

    const tags = await prisma.tags.findMany();

    try{
        await prisma.product.create({
            data: {
                name: "White Roll",
                description: "A cleaning roll",
                tagId: 1,
                image_url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRq4StzxY42Q8DL4z8H-_QotWGziier20XdM32xQgnqxBSwlU4TpVdp3kscXijwyBnn3rX_REuzsjFuGRbnjndE9mt-KFLAobQKx-O3Tt8vsMVv5wLe0CEFZRqwDkikgPr_KDT8dc0&usqp=CAc7RRvU0oLrkLqqmBpVdH30AAAAA="
            }
        })
    }catch(err){
        console.log(err)
    }

}

seed();

module.exports = seed;