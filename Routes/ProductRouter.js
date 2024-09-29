const { GetAllProducts, GetProductsByTag } = require("../Controllers/productController");

const ProductRouter = require("express").Router();

ProductRouter.route("/").get(GetAllProducts)
ProductRouter.route("/:tag_name").get(GetProductsByTag)

module.exports = ProductRouter;