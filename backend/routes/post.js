const router = require("express").Router();
const { getAllPosts, createPost, updatePost, deletePost } = require("../controllers/post");
const { authJwt } = require("../middleware/authJwt");
const multer = require("../middleware/multerConfig");
const { validContent } = require("../middleware/validInputs");

router.get("/", authJwt, getAllPosts);
router.post("/", authJwt, validContent, multer, createPost);
router.put("/:id", authJwt, validContent, multer, updatePost);
router.delete("/delete/:id", authJwt, deletePost);

module.exports = router;