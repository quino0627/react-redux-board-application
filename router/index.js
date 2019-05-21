const express = require("express");
const router = express.Router();

const posts = require("./posts");

// router.get("/", (req, res) => {
//   res.send("Hello, World");
// });

router.use("/api/posts", posts);

module.exports = router;
