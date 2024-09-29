const ProductRouter = require("./ProductRouter");
const TagRouter = require("./TagRouter");

const ApiRouter = require("express").Router();

console.log("hello world")
ApiRouter.use("/products", ProductRouter);
ApiRouter.use("/tags", TagRouter);

module.exports = ApiRouter;