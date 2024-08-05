const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.SelectAllProducts = async () => {
    const products = await prisma.product.findMany()
    return products
}

exports.InsertProduct = async (newProduct) => {
    const product = await prisma.product.create({newProduct})
    return product
}