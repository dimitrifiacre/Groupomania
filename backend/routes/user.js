const router = require("express").Router();
const { getOneUser, updateUser, deleteUser } = require("../controllers/user");
const auth = require("../middleware/authJwt");
const multer = require("../middleware/multerConfig");
const { validNames, validJob } = require("../middleware/validInputs");

router.get("/:id", auth, getOneUser);
router.put("/:id", auth, validNames, validJob, multer, updateUser);
router.delete("/delete/:id", auth, deleteUser);

module.exports = router;