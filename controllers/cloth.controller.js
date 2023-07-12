const Cloth = require("../models/Cloth.model");

module.exports.clothController = {
  addCloth: async (req, res) => {
    try {
      const cloth = await Cloth.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        collections: req.body.collections,
        accessory: req.body.accessory,
        image: req.files,
        size: [
          { size: "XS", inStock: 0 },
          { size: "S", inStock: 0 },
          { size: "M", inStock: 0 },
          { size: "L", inStock: 0 },
          { size: "XL", inStock: 0 },
        ],
        discount: req.body.discount,
      });
      res.json(cloth);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  findClothes: async (req, res) => {
    const data = await Cloth.find()
      .populate("collections", "-__v")
      .populate("category", "-__v");

    res.json(data);
  },

  changeCloth: async (req, res) => {
    try {
      const cloth = await Cloth.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        accessory: req.body.accessory,
      });
      res.json(cloth);
    } catch (error) {
      res.json(`${error}: change product`);
    }
  },
  findOne: async (req, res) => {
    try {
      const data = await Cloth.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  removeCloth: async (req, res) => {
    try {
      await Cloth.findByIdAndDelete(req.params.id);
      res.json("Cloth delete");
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  allCollection: async (req, res) => {
    try {
      const data = await Cloth.find({ collections: req.params.id });
      res.json(data);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  allCategory: async (req, res) => {
    try {
      const data = await Cloth.find({ category: req.params.id });
      res.json(data);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  allAccessory: async (req, res) => {
    try {
      const data = await Cloth.find({ accessory: req.params.id });
      res.json(data);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
