const Cloth = require("../models/Cloth.model");

module.exports.clothController = {
  addCloth: async (req, res) => {
    try {
      const cloth = await Cloth.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        collections: req.body.collection, 
        image: req.files,
        size: req.body.size,
        discount: req.body.discount,
      });
      res.json(cloth);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  findClothes: async (req, res) => {
    const data = await Cloth.find().populate('category')
    res.json(data);
  },

  changeCloth: async (req, res) => {
    try {
      const cloth = await Cloth.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      });
      res.json(cloth);
    } catch (error) {
      res.json(`${error}: change product`);
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

  
};
