const { incorrectDataError, notFoundError } = require("../ErrorConstants");
const { SelectAllProducts, SelectProductByTag } = require("../Repositories/ProductRepository");
const { SelectUniqueTag } = require("../Repositories/TagRepository");

exports.GetAllProductsAsync = async () => {
    const products = await SelectAllProducts();
    return products;
}

exports.GetProductsByTagAsync = async (request) => {
    const { tag_name } = request.params;
    if (!isNaN(parseInt(tag_name))) {
        throw incorrectDataError;
    }
    const checkTag = await SelectUniqueTag(tag_name);
    if (!checkTag) {
        throw notFoundError
    }
    const products = await SelectProductByTag(checkTag.tag_id);
    return products;
}