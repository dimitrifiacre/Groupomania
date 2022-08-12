const router = require("express").Router();
const { getAllPosts, createPost, updatePost, deletePost } = require("../controllers/post");
const auth = require("../middleware/authJwt");
const multer = require("../middleware/multerConfig");
const { validContent } = require("../middleware/validInputs");

router.get("/", auth, getAllPosts);
router.post("/", auth, validContent, multer, createPost);
router.put("/:id", auth, validContent, multer, updatePost);
router.delete("/delete/:id", auth, deletePost);

module.exports = router;