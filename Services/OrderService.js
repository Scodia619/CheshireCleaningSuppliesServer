const { incorrectDataError, notFoundError } = require("../ErrorConstants");
const { CreateOrder, CreateOrderItems } = require("../Repositories/OrderRepository");
const { SelectUserById } = require("../Repositories/UserRepository");

exports.CreateNewOrderAsync = async (request) => {
    const { userId, status, orderItems } = request.body;
    if (typeof userId !== "number" || typeof status !== "string" || orderItems.length === 0) {
        throw incorrectDataError
    }

    const userExists = await SelectUserById(userId)
    if (!userExists) {
        throw notFoundError;
    }

    const order = await CreateOrder(userId, status)

    const orderItemsData = orderItems.map((item) => ({
        order_id: order.order_id,
        product_id: item.product_id,
        quantity: item.quantity,
    }));

    const createdOrderItems = await CreateOrderItems(orderItemsData)

    return order;
}