const router = require("express").Router();
const { createComment, updateComment, deleteComment } = require("../controllers/comment");
const { authJwt } = require("../middleware/authJwt");
const { validContent } = require("../middleware/validInputs");

router.post("/:id", authJwt, validContent, createComment);
router.put("/:id", authJwt, validContent, updateComment);
router.delete("/delete/:id", authJwt, deleteComment);

module.exports = router;