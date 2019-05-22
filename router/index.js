const express = require("express");
const router = express.Router();

const posts = require("./posts");
const auth = require("./auth");
// router.get("/", (req, res) => {
//   res.send("Hello, World");
// });

router.use("/api/posts", posts);
router.use("/api/auth", auth);

module.exports = router;
