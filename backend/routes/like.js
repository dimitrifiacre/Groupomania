const router = require("express").Router();
const { addLike, removeLike } = require("../controllers/like");
const { authJwt } = require("../middleware/authJwt");

router.post("/:id", authJwt, addLike);
router.delete("/delete/:id", authJwt, removeLike);

module.exports = router;