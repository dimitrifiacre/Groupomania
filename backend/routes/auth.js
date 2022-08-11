const router = require("express").Router();
const { userRegister, userLogin, userLogout } = require("../controllers/auth");
const { validEmail, validPassword, validNames } = require("../middleware/validInputs");

router.post("/register", validEmail, validPassword, validNames, userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);

module.exports = router;