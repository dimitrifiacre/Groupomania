const router = require("express").Router();
const { createComment } = require("../controllers/comment");
const { authJwt } = require("../middleware/authJwt");
const { validContent } = require("../middleware/validInputs");

router.post("/:id", authJwt, validContent, createComment);

module.exports = router;