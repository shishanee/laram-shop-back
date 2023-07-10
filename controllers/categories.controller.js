const Category = require("../models/Category.model");

module.exports.categoriesController = {
  getAllCategories: async (req, res) => {
    try {
      const allCategories = await Category.find();
      res.json(allCategories);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const categoryById = await Category.findById(req.params.id);
      res.json(categoryById);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addCategory: async (req, res) => {
    try {
      const addedCategory = await Category.create({
        name: req.body.name,
      });
      res.json(addedCategory);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
