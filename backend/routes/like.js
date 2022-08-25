const router = require("express").Router();
const { Like } = require("../controllers/like");
const { authJwt } = require("../middleware/authJwt");

router.post("/:id", authJwt, Like);

module.exports = router;