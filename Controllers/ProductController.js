const { SelectAllProducts, SelectProductByTag } = require("../Repositories/ProductRepository");
const { SelectUniqueTag } = require("../Repositories/TagRepository");
const { GetAllProductsAsync, GetProductsByTagAsync } = require("../Services/ProductService");

const GetAllProducts = async (req, res, next) => {
  try {
    const products = await GetAllProductsAsync();
    return res.status(200).send({ products });
  } catch (err) {
    next(err); // Pass the error to the next middleware
  }
};

const GetProductsByTag = async (req, res, next) => {
  const products = await GetProductsByTagAsync(req);
  return res.status(200).send({ products });
};

// Export both functions
module.exports = {
  GetAllProducts,
  GetProductsByTag
};
