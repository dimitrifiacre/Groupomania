const router = require("express").Router();
const { getAllPosts, createPost, updatePost, deletePost } = require("../controllers/post");
const auth = require("../middleware/authJwt");
const multer = require("../middleware/multerConfig");

router.get("/", auth, getAllPosts);
router.post("/", auth, multer, createPost);
router.put("/:id", auth, multer, updatePost);
router.delete("/delete/:id", auth, deletePost);

module.exports = router;