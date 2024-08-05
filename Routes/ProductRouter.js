const { GetAllProducts } = require("../Controllers/ProductController");

const ProductRouter = require("express").Router();

ProductRouter.route("/").get(GetAllProducts)

module.exports = ProductRouter;