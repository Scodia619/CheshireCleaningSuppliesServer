const { CreateNewOrderAsync, GetOrdersAsync, GetOrdersByUserAsync, UpdateOrderByOrderIdAsync, UpdatePaymentStatusByOrderIdAsync } = require("../Services/OrderService");

exports.PostOrderAsync = async (req, res, next) => {
    try {
        const order = await CreateNewOrderAsync(req);
        return res.status(201).send({ order });
    } catch (err) {
        next(err);
    }
};

exports.GetAllOrdersAsync = async (req, res, next) => {
    try {
        const orders = await GetOrdersAsync();
        return res.status(200).send({ orders })
    } catch (err) {
        next(err);
    }
}

exports.GetOrdersByUserAsync = async (req, res, next) => {
    try{
        const orders = await GetOrdersByUserAsync(req);
        return res.status(200).send({orders})
    } catch(err){
        next(err);
    }
}

exports.UpdateOrdersByIdAsync = async (req, res, next) => {
    try{
        const updatedOrder = await UpdateOrderByOrderIdAsync(req)
        return res.status(200).send({updatedOrder})
    } catch(err) {
        next(err)
    }
}

exports.UpdatePaymentStatusByIdAsync = async (req, res, next) => {
    try{
        const updatedOrder = await UpdatePaymentStatusByOrderIdAsync(req)
        return res.status(200).send({updatedOrder})
    } catch(err) {
        next(err)
    }
}