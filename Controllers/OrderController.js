const { CreateNewOrderAsync } = require("../Services/OrderService");

exports.PostOrderAsync = async (req, res, next) => {
    try {
        const order = await CreateNewOrderAsync(req);
        return res.status(201).send({ order });
    } catch (err) {
        next(err);
    }
};