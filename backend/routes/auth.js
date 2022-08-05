const router = require("express").Router();
const authCtrl = require("../controllers/auth");

router.post("/register", authCtrl.userRegister);
router.post("/login", authCtrl.userLogin);

module.exports = router;