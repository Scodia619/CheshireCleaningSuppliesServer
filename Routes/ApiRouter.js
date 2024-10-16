const ProductRouter = require("./ProductRouter");
const TagRouter = require("./TagRouter");
const UserRouter = require("./UserRouter");

const ApiRouter = require("express").Router();

console.log("hello world")
ApiRouter.use("/products", ProductRouter);
ApiRouter.use("/tags", TagRouter);
ApiRouter.use("/user", UserRouter);

module.exports = ApiRouter;