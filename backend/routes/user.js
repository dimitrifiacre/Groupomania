const router = require("express").Router();
const { getOneUser, updateUser, deleteUser } = require("../controllers/user");
const auth = require("../middleware/authJwt");
const multer = require("../middleware/multerConfig");

router.get("/:id", auth, getOneUser);
router.put("/:id", auth, multer, updateUser);
router.delete("/delete/:id", auth, deleteUser);

module.exports = router;