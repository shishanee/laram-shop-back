const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { CartController } = require("../controllers/cart.controller");

const router = Router();

router.get("/user-cart", authMiddleware, CartController.getUserCart);
router.patch("/cart-add-cloth/:id", authMiddleware, CartController.addCloth);
router.patch("/buy-cloths", authMiddleware, CartController.buyCloths);

module.exports = router;
