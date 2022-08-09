const router = require("express").Router();
const { createComment, updateComment, deleteComment } = require("../controllers/comment");
const auth = require("../middleware/authJwt");

router.post("/:id", auth, createComment);
router.put("/:id", auth, updateComment);
router.delete("/:id", auth, deleteComment);

module.exports = router;