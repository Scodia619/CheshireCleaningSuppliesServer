const {SelectAllProducts} = require ("../Repositories/ProductRepository")

exports.GetAllProducts = async (req, res, next) => {
    try {
      const products = await SelectAllProducts()
      res.status(200).send({ products });
    } catch (err) {
      next();
    }
  };