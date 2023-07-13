const Cart = require("../models/Cart.model");
const Cloth = require("../models/Cloth.model");

module.exports.CartController = {
  getUserCart: async (req, res) => {
    try {
      const data = await Cart.findOne({ userId: req.user.id }).populate({
        path: "cart.cloth",
        populate: {
          path: "collections",
        },
      });
      res.json(data);
    } catch (error) {
      res.json(`${error}: error output cloths`);
    }
  },
  addCloth: async (req, res) => {
    try {
      const { size } = await Cloth.findById(req.params.id);
      const { inStock } = size.find((item) => item.size === req.body.size);
      const { cart } = await Cart.findOne({ userId: req.user.id });

      const haveCartCloth = cart.find(
        (item) =>
          item.cloth.toString() === req.params.id && item.size === req.body.size
      );
      const availableInCart = haveCartCloth ? haveCartCloth.amount : 0;

      if (inStock > availableInCart) {
        if (availableInCart) {
          const newCart = cart.map((item) => {
            if (
              item.cloth.toString() === req.params.id &&
              item.size === req.body.size
            ) {
              item.amount++;
              return item;
            }
            return item;
          });
          await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { cart: newCart }
          );
          return res.json("Добавлен в корзину");
        }
        const cloth = await Cart.findOneAndUpdate(
          { userId: req.user.id },
          { $push: { cart: { cloth: req.params.id, size: req.body.size } } }
        );
        const updateCart = await Cart.findOne({ userId: req.user.id }).populate(
          "cart.cloth"
        );
        const newCloth = updateCart.cart.pop();
        return res.json(newCloth);
      }
      res.json("Нет в наличии");
    } catch (error) {
      res.json(`${error}: error add cloth`);
    }
  },
  minusCloth: async (req, res) => {
    try {
      const { cart } = await Cart.findOne({ userId: req.user.id });
      const newCart = cart.map((item) => {
        if (
          item.cloth.toString() === req.params.id &&
          item.size === req.body.size
        ) {
          if (item.amount > 1) {
            item.amount--;
          }
          return item;
        }
        return item;
      });
      await Cart.findOneAndUpdate({ userId: req.user.id }, { cart: newCart });
      res.json("Удален из корзины");
    } catch (error) {
      res.json(`${error}: error add cloth`);
    }
  },
  removeCloth: async (req, res) => {
    try {
      const { cart } = await Cart.findOne({ userId: req.user.id });

      const newCart = cart.filter((item) => {
        if (
          item.cloth.toString() === req.params.id &&
          item.size === req.body.size
        ) {
          return false;
        }
        return true;
      });
      await Cart.findOneAndUpdate({ userId: req.user.id }, { cart: newCart });
      res.json("Удален из корзины");
    } catch (error) {
      res.json(`${error}: error add cloth`);
    }
  },
  buyCloths: async (req, res) => {
    try {
      const { cart } = await Cart.findOne({ userId: req.user.id }).populate(
        "cart.cloth"
      );
      cart.map(async (item) => {
        const { size } = await Cloth.findById(item.cloth._id);

        const newSize = size.map((el) => {
          if (el.size === item.size) {
            el.inStock = el.inStock - item.amount;
            return el;
          }
          return el;
        });
        await Cloth.findByIdAndUpdate(item.cloth._id, {
          size: newSize,
        });
      });
      const total = cart.reduce((accumulator, item) => {
        return accumulator + item.cloth.price * item.amount;
      }, 0);
      await Cart.findOneAndUpdate(
        { userId: req.user.id },
        {
          cart: [],
        }
      );
      res.json("Оплата прошла успешно"); // Для ордера
    } catch (error) {
      res.json(`${error}: error buy cloth`);
    }
  },
};
