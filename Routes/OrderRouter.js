const { PostOrderAsync, GetOrdersByUserAsync, GetAllOrdersAsync, UpdateOrdersByIdAsync } = require("../Controllers/OrderController");

const OrderRouter = require("express").Router();

OrderRouter.route("/").post(PostOrderAsync).get(GetAllOrdersAsync)
OrderRouter.route("/:userId").get(GetOrdersByUserAsync)
OrderRouter.route("/update/:orderId").patch(UpdateOrdersByIdAsync)

module.exports = OrderRouter;