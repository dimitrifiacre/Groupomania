const router = require("express").Router();
const { addLike, removeLike } = require("../controllers/like");
const auth = require("../middleware/authJwt");

router.post("/:id", auth, addLike);
router.delete("/:id", auth, removeLike);

module.exports = router;