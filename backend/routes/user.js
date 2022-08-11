const router = require("express").Router();
const { getOneUser, updateUser, deleteUser } = require("../controllers/user");
const auth = require("../middleware/authJwt");
const multer = require("../middleware/multerConfig");
const { validNames } = require("../middleware/validInputs");

router.get("/:id", auth, getOneUser);
router.put("/:id", auth, validNames, multer, updateUser);
router.delete("/delete/:id", auth, deleteUser);

module.exports = router;