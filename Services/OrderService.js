const { incorrectDataError, notFoundError } = require("../ErrorConstants");
const { CreateOrder, CreateOrderItems, GetOrdersByUserIdAsync, GetAllOrdersAsync, GetOrderByIdAsync, UpdateOrderStatusAsync } = require("../Repositories/OrderRepository");
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

exports.GetOrdersAsync = async () => {
    const orders = await GetAllOrdersAsync();
    return orders;
}

exports.GetOrdersByUserAsync = async (request) => {
    const {userId} = request.params;
    if (!parseInt(userId)) {
        throw incorrectDataError;
    }

    const userExists = await SelectUserById(parseInt(userId));
    if (!userExists) {
        throw notFoundError;
    }

    try {
        return await GetOrdersByUserIdAsync(parseInt(userId));
    } catch (err) {
        next(err)
    }
};

exports.UpdateOrderByOrderIdAsync = async (request) => {
    const {orderId} = request.params
    if (!parseInt(orderId)) {
        throw incorrectDataError;
    }

    const orderExists = await GetOrderByIdAsync(parseInt(orderId));
    if(!orderExists) throw notFoundError

    try{
        return await UpdateOrderStatusAsync(parseInt(orderId))
    } catch (err){
        next(err)
    }

}
