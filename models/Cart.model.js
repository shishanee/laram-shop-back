const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  cart: [
    {
      cloth: { type: mongoose.SchemaTypes.ObjectId, ref: "Cloth" },
      size: string,
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
