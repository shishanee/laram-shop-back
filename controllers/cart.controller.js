const Cart = require("../models/Cart.model");
const Cloth = require("../models/Cloth.model");

module.exports.CartController = {
  getUserCart: async (req, res) => {
    try {
      const data = await Cart.findById(req.user.id);
      res.json(data);
    } catch (error) {
      res.json(`${error}: error output cloths`);
    }
  },
  addCloth: async (req, res) => {
    try {
      const { size } = await Cloth.findById(req.params.id);
      const { inStock } = size.find((item) => item.size === req.body.size);
      if (inStock > 0) {
        await Cart.findOneAndUpdate(
          { userId: req.user.id },
          { $push: { cart: req.params.id } }
        );
        res.json("Добавлен в корзину");
      }
      res.json("Что-то пошло не так...");
    } catch (error) {
      res.json(`${error}: error add cloth`);
    }
  },
  buyCloths: async (req, res) => {
    try {
      const { cart } = Cart.findOne({ userId: req.user.id });
      const notAvailable = [];
      cart.map(async (item) => {
        const { size } = await Cloth.findById(item.cloth);
        const newSize = size.map((el) => {
          if (el.size === item.size) {
            if (el.inStock > 0) {
              el.inStock--;
              return el;
            } else {
              notAvailable.push(item.cloth);
            }
          }
          return el;
        });
        await Cloth.findByIdAndUpdate(item, {
          size: newSize,
        });
      });
      if (notAvailable.length) {
        let newCart;
        notAvailable.map((el) => {
          newCart = cart.filter((item) => item.cloth !== el);
        });
        res.json(newCart);
      }
      res.json(cart);
    } catch (error) {
      res.json(`${error}: error buy cloth`);
    }
  },
};
