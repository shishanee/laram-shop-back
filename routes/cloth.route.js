const { Router } = require("express");
const { clothController } = require("../controllers/cloth.controller");
// const authmidlleware = require("../middlewares/auth.middleware");
const fileMiddleware = require("../middlewares/file.middleware");

const router = Router();

router.get("/clothes", clothController.findClothes);
router.post(
  "/clothes",
  fileMiddleware.array("img", 4),
  clothController.addCloth
);
router.patch("/clothes/:id", clothController.changeCloth);
router.delete("/clothes/:id", clothController.removeCloth);
router.get("/clothes/:id", clothController.findOne);
router.get("/collection/:id", clothController.allCollection); // вывод одежды по коллекции
router.get("/category/:id", clothController.allCategory); // вывод одежды по коллекции

module.exports = router;
