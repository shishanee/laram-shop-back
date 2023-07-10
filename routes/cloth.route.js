const { Router } = require("express");
const { clothController } = require("../controllers/cloth.controller");
// const authmidlleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/clothes", clothController.findClothes);
router.post("/clothes", clothController.addCloth);
router.patch("/clothes/:id", clothController.changeCloth);
router.delete("/clothes/:id", clothController.removeCloth)