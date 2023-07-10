const { Router } = require("express");
const { clothController } = require("../controllers/cloth.controller");
// const authmidlleware = require("../middlewares/auth.middleware");
const fileMiddleware = require("../middlewares/file.middleware");

const router = Router();

router.get("/clothes", clothController.findClothes);
router.post("/clothes", fileMiddleware.array("img", 4), clothController.addCloth);
router.patch("/clothes/:id", clothController.changeCloth);
router.delete("/clothes/:id", clothController.removeCloth);

module.exports = router;