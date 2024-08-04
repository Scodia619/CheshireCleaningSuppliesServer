const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.SelectAllProducts = async () => {
    const products = await prisma.product.findMany()
    return products
}