const mongoose = require("mongoose");

const clothSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
  collections: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Collection",
  },
  image: [],
  size: [{ size: String, inStock: Number }],
  discount: {
    type: Number,
    default: 0,
  },
});

const Cloth = mongoose.model("Cloth", clothSchema);
module.exports = Cloth;
