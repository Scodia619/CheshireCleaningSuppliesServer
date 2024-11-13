const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.CreateOrder = async (userId, status) => {
    const newOrder = {user_id: userId, status: status}
    return await prisma.order.create({data: newOrder})
}

exports.CreateOrderItems = async (orderItemsData) => {
    return await prisma.orderItem.createMany({data: orderItemsData})
}