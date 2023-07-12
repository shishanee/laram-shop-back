const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  customer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  number: {
    type: Number,
    default: Math.floor(1000 + Math.random() * 12000),
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cloth",
      },
      quantity: {
        type: Number,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
    
  },

  total: Number,
  status: {
    type: String,
    enum: ["В обработке", "Выполнен", "Отменен"],
    default: "В обработке",
  },

});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
