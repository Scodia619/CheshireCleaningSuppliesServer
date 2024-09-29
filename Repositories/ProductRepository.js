const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.SelectAllProducts = async () => {
    return await prisma.product.findMany()
}

exports.InsertProduct = async (newProduct) => {
    return await prisma.product.create({newProduct})
}

exports.SelectProductByTag = async (id) => {
    return await prisma.product.findMany({
        where:{
            tagId: id
        }
    }) 
}