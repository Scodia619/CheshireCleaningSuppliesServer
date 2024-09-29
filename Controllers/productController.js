const { SelectAllProducts, SelectProductByTag } = require("../Repositories/ProductRepository");
const { SelectUniqueTag } = require("../Repositories/TagRepository");

exports.GetAllProducts = async (req, res, next) => {
  try {
    const products = await SelectAllProducts()
    return res.status(200).send({ products });
  } catch (err) {
    next();
  }
};

exports.GetProductsByTag = async (req, res, next) => {
  const { tag_name } = req.params
  if (!isNaN(parseInt(tag_name))) {
    return res.status(400).send({ message: "Invalid Data Type for TagName" })
  }
  const checkTag = await SelectUniqueTag(tag_name)
  if (!checkTag) {
    res.status(404).send({ message: "No tag found" })
  }
  const products = await SelectProductByTag(checkTag.tag_id);
  return res.status(200).send({ products })
}