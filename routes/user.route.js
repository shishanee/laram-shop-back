const { Router } = require("express");
const { userController } = require("../controllers/user.controller");

const router = Router();

router.post("/auth", userController.registerUser); // Роут регистрации пользователя
router.post("/login", userController.login); // Вход в учетную запись

module.exports = router;
