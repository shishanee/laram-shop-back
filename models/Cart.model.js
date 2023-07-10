const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  cart: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Cloth" }],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
