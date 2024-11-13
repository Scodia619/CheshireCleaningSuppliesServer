const { PostOrderAsync } = require("../Controllers/OrderController");

const OrderRouter = require("express").Router();

OrderRouter.route("/").post(PostOrderAsync)

module.exports = OrderRouter;