const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  orderNumber: Number,
  products: [{}],
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["В обработке", "Выполнен", "Отменен"],
    default: "В обработке",
  },
  city: String,
  address: String,
  name: String,
  phone: String,
  email: String,
  comment: String,
  total: Number,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
