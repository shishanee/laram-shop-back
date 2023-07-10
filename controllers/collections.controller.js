const Collection = require("../models/Collection.model");

module.exports.collectionsController = {
  getAllCollections: async (req, res) => {
    try {
      const allCollections = await Collection.find();
      res.json(allCollections);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getCollectionById: async (req, res) => {
    try {
      const collectionById = await Collection.findById(req.params.id);
      res.json(collectionById);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addCollection: async (req, res) => {
    try {
      const addedCategory = await Collection.create({
        name: req.body.name,
      });
      res.json(addedCategory);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
