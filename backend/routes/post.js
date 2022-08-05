const router = require("express").Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/authJwt");
const multer = require("../middleware/multerConfig");

router.get("/", auth, postCtrl.getAllPosts);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;