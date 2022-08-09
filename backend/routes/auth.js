const router = require("express").Router();
const authCtrl = require("../controllers/auth");
const validInputs = require("../middleware/validInputs");

router.post("/register", validInputs.validPassword, authCtrl.userRegister);
router.post("/login", authCtrl.userLogin);
router.post("/logout", authCtrl.userLogout);

module.exports = router;