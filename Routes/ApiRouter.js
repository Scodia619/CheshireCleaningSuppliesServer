const OrderRouter = require("./OrderRouter");
const ProductRouter = require("./ProductRouter");
const TagRouter = require("./TagRouter");
const UserRouter = require("./UserRouter");

const ApiRouter = require("express").Router();

ApiRouter.use("/order", OrderRouter)
ApiRouter.use("/products", ProductRouter);
ApiRouter.use("/tags", TagRouter);
ApiRouter.use("/user", UserRouter);

module.exports = ApiRouter;