const Order = require("../models/Order.model");

module.exports.orderController = {
  getUserOrders: async (req, res) => {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  },
};
