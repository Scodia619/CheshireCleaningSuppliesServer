const ProductRouter = require("./ProductRouter");

const ApiRouter = require("express").Router();

ApiRouter.use("/products", ProductRouter);

module.exports = ApiRouter;