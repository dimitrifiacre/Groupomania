const router = require("express").Router();
const authCtrl = require("../controllers/auth");
const validInputs = require("../middleware/validInputs");

router.post("/register", validInputs.validEmail, authCtrl.userRegister);
router.post("/login", authCtrl.userLogin);

module.exports = router;