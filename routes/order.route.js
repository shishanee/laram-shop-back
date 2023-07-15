const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { orderController } = require("../controllers/order.controller");

const router = Router();

router.get("/orders", authMiddleware, orderController.getUserOrders);

module.exports = router;