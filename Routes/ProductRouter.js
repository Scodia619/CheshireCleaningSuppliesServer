const { GetAllProducts } = require("../Controllers/productController");

const ProductRouter = require("express").Router();

ProductRouter.route("/").get(GetAllProducts)

module.exports = ProductRouter;