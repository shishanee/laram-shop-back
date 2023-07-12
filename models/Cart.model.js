const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  cart: [
    {
      cloth: { type: mongoose.SchemaTypes.ObjectId, ref: "Cloth" },
      size: String,
      amount: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
