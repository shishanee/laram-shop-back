const Accessory = require("../models/Accessory.model");

module.exports.accessoriesController = {
  getAllAccessories: async (req, res) => {
    try {
      const allAccessories = await Accessory.find();
      res.json(allAccessories);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getAccessoryById: async (req, res) => {
    try {
      const accessoryById = await Accessory.findById(req.params.id);
      res.json(accessoryById);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addAccessory: async (req, res) => {
    try {
      const addedaccessory = await Accessory.create({
        name: req.body.name,
      });
      res.json(addedaccessory);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};