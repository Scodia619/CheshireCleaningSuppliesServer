const { PostOrderAsync, GetOrdersByUserAsync, GetAllOrdersAsync, UpdateOrdersByIdAsync, UpdatePaymentStatusByIdAsync } = require("../Controllers/OrderController");

const OrderRouter = require("express").Router();

OrderRouter.route("/").post(PostOrderAsync).get(GetAllOrdersAsync)
OrderRouter.route("/:userId").get(GetOrdersByUserAsync)
OrderRouter.route("/update/:orderId").patch(UpdateOrdersByIdAsync)
OrderRouter.route("/update/:orderId/payment").patch(UpdatePaymentStatusByIdAsync)

module.exports = OrderRouter;