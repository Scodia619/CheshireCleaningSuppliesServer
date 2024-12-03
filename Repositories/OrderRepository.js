const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.CreateOrder = async (userId, status) => {
    const newOrder = { user_id: userId, status: status }
    return await prisma.order.create({ data: newOrder })
}

exports.CreateOrderItems = async (orderItemsData) => {
    return await prisma.orderItem.createMany({ data: orderItemsData })
}

exports.GetAllOrdersAsync = async () => {
    return await prisma.order.findMany({
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });
}

exports.GetOrdersByUserIdAsync = async (userId) => {
    return await prisma.order.findMany({
        where: { user_id: userId },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    })
}

exports.UpdateOrderStatusAsync = async (orderId) => {
    return await prisma.order.update({
        where: {
          order_id: orderId,
        },
        data: {
          status: "Confirmed",
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
      });
}

exports.GetOrderByIdAsync = async (orderId) => {
    return await prisma.order.findUnique({
        where: {order_id: orderId},
    })
}