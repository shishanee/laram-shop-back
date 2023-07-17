const Order = require("../models/Order.model");

module.exports.orderController = {
  getUserOrders: async (req, res) => {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  },
  getOrderById: async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.json(order);
  },
};
