const router = require("express").Router();
const postCtrl = require("../controllers/post");

router.get("/", postCtrl.getAllPosts);
router.post("/", postCtrl.createPost);
router.put("/:id", postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);

module.exports = router;