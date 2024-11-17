const { PostOrderAsync, GetOrdersByUserAsync, GetAllOrdersAsync } = require("../Controllers/OrderController");

const OrderRouter = require("express").Router();

OrderRouter.route("/").post(PostOrderAsync).get(GetAllOrdersAsync)
OrderRouter.route("/:userId").get(GetOrdersByUserAsync)

module.exports = OrderRouter;