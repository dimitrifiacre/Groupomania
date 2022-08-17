const router = require("express").Router();
const { getOneUser, updateUser, deleteUser } = require("../controllers/user");
const { authJwt } = require("../middleware/authJwt");
const multer = require("../middleware/multerConfig");
const { validNames, validJob } = require("../middleware/validInputs");

router.get("/:id", authJwt, getOneUser);
router.put("/:id", authJwt, validNames, validJob, multer, updateUser);
router.delete("/delete/:id", authJwt, deleteUser);

module.exports = router;