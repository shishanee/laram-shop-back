const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { orderController } = require("../controllers/order.controller");

const router = Router();

router.get("/orders", authMiddleware, orderController.getOrder);
router.post("/orders", authMiddleware, orderController.addOrder)

module.exports = router;