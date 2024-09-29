const { SelectAllProducts, SelectProductByTag } = require("../Repositories/ProductRepository");
const { SelectUniqueTag } = require("../Repositories/TagRepository");

const GetAllProducts = async (req, res, next) => {
  try {
    const products = await SelectAllProducts();
    console.log("Controller");
    return res.status(200).send({ products });
  } catch (err) {
    next(err); // Pass the error to the next middleware
  }
};

const GetProductsByTag = async (req, res, next) => {
  const { tag_name } = req.params;
  if (!isNaN(parseInt(tag_name))) {
    return res.status(400).send({ message: "Invalid Data Type for TagName" });
  }
  const checkTag = await SelectUniqueTag(tag_name);
  if (!checkTag) {
    return res.status(404).send({ message: "No tag found" });
  }
  const products = await SelectProductByTag(checkTag.tag_id);
  return res.status(200).send({ products });
};

// Export both functions
module.exports = {
  GetAllProducts,
  GetProductsByTag
};
