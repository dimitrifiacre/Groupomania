const router = require("express").Router();
const { createComment, updateComment, deleteComment } = require("../controllers/comment");
const auth = require("../middleware/authJwt");
const { validContent } = require("../middleware/validInputs");

router.post("/:id", auth, validContent, createComment);
router.put("/:id", auth, validContent, updateComment);
router.delete("/delete/:id", auth, deleteComment);

module.exports = router;