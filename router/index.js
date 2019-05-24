const express = require("express");
const router = express.Router();

const posts = require("./posts");
const message = require("./message");
const auth = require("./auth");
// router.get("/", (req, res) => {
//   res.send("Hello, World");
// });

router.use("/api/posts", posts);
router.use("/api/message", message);
router.use("/api/auth", auth);

module.exports = router;
