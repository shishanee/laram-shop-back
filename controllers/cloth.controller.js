const Cloth = require("../models/Cloth.model");

module.exports.clothController = {
  addCloth: async (req, res) => {
    try {
      const cloth = await Cloth.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        collection: req.body.collection,
        // image: req.files,
        size: req.body.size,
        discount: req.body.discount,
      });
      res.json(cloth);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  findClothes: async (req, res) => {
    const data = await Cloth.find();
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

  //   getUserCloth: async (req, res) => {
  //     const data = await Cloth.find({ user: req.user.id });
  //     res.json(data);
  //   },
  //   findOneCloth: async (req, res) => {
  //     try {
  //       const oneCloth = await Cloth.findById(req.params.id).populate("user");

  //       res.json(oneCloth);
  //     } catch (error) {
  //       res.json({ error: error.message });
  //     }
  //   },
  //   removeImage: async (req, res) => {
  //     try {
  //       const oneCloth = await Cloth.findByIdAndUpdate(
  //         req.params.id,
  //         { $pull: { image: { filename: req.body.filename } } },
  //         { new: true }
  //       );
  //       res.json(oneCloth);
  //     } catch (error) {
  //       res.json({ error: error.message });
  //     }
  //   },
  //   addImageCloth: async (req, res) => {
  //     try {
  //       const { image } = await Product.findById(req.params.id);
  //       const newImage = [...image, ...req.files];
  //       const cloth = await Cloth.findByIdAndUpdate(req.params.id, {
  //         image: newImage,
  //       });
  //       res.json(cloth);
  //     } catch (error) {
  //       res.json({ error: error.message });
  //     }
  //   },
};
