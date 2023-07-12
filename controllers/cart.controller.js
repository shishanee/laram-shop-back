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
      const { cart } = Cart.findOne({ userId: req.user.id });
      const availableInCart = cart.find((item) => item.cloth === req.params.id);
      if (inStock > 0) {
        if (availableInCart) {
          const newCart = cart.map((item) => {
            if (item.cloth === req.params.id) {
              item.amount++;
              return item;
            }
            return item;
          });
          await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { cart: newCart }
          );
          res.json("Добавлен в корзину");
        }
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
      const { cart } = Cart.findOne({ userId: req.user.id }).populate(
        "cart.cloth"
      );
      const notAvailable = [];
      cart.map(async (item) => {
        const { size } = await Cloth.findById(item.cloth);
        const newSize = size.map((el) => {
          if (el.size === item.size) {
            if (el.inStock >= item.amount) {
              el.inStock - item.amount;
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
        const newCart = cart.filter(
          (item) => !notAvailable.includes(item.cloth)
        );

        const newTotal = newCart.reduce((accumulator, item) => {
          return accumulator + item.cloth.price * item.amount;
        }, 0);

        res.json(newCart); // Для ордера
      }

      const total = cart.reduce((accumulator, item) => {
        return accumulator + item.cloth.price * item.amount;
      }, 0);

      res.json(cart); // Для ордера
    } catch (error) {
      res.json(`${error}: error buy cloth`);
    }
  },
};
