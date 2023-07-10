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
        image: req.files,
        size: [
          {size: "XS", inStock: 0}, {size: "S", inStock: 0}, {size: "M", inStock: 0}, {size: "L", inStock: 0}, {size: "XL", inStock: 0}
      ],
        discount: req.body.discount,
      });
      res.json(cloth);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  findClothes: async (req, res) => {
    const data = await Cloth.find().populate('collections', "-__v").populate('category', "-__v");
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

  // addInStock: async (req, res) => {
  //   try {
  //     await Cloth.findByIdAndUpdate(req.params.id, {
        
  //     })
  //   }
  // }

  // addDiscount: async(req, res) => {
  //   try {
  //     await Cloth
  //   }
  // }

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
