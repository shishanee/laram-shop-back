const Cart = require("../models/Cart.model");

module.exports.CartController = {
  getUserCart: async (req, res) => {
    try {
      const data = await Cart.findById(req.user.id);
      res.json(data);
    } catch (error) {
      res.json(`${error}: error output cloths`);
    }
  },
};
