const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema({
  name: String
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
