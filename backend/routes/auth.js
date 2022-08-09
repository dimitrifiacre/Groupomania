const router = require("express").Router();
const { userRegister, userLogin, userLogout } = require("../controllers/auth");
const { validPassword } = require("../middleware/validInputs");

router.post("/register", validPassword, userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);

module.exports = router;