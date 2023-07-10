const mongoose = require("mongoose");

const clothSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: {
    ref: "Category",
    type: mongoose.SchemaTypes.ObjectId,
    collection: {
      ref: "Collection",
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  image: [],
  size: [
    { size: String, inStock: Number },
],
  discount: {
    type: Number,
    default: 0 
  }
});

const Cloth = mongoose.model("Cloth", clothSchema);
module.exports = Cloth;
