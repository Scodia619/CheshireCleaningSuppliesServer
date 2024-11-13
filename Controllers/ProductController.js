const { GetAllProductsAsync, GetProductsByTagAsync } = require("../Services/ProductService");

const GetAllProducts = async (req, res, next) => {
  try {
    const products = await GetAllProductsAsync();
    return res.status(200).send({ products });
  } catch (err) {
    next(err);
  }
};

const GetProductsByTag = async (req, res, next) => {
  const products = await GetProductsByTagAsync(req);
  return res.status(200).send({ products });
};

module.exports = {
  GetAllProducts,
  GetProductsByTag
};
