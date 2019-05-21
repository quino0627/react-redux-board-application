const express = require("express");
const router = express.Router();

const postsCtrl = require("./posts.ctrl");

router.post("/", postsCtrl.insertPost);

router.get("/", postsCtrl.readPosts);

router.get("/:id", postsCtrl.readPostsById);

router.get("/title/:title", postsCtrl.readPostsByTitle);

//포스트 삭제하기
router.delete("/:id", postsCtrl.deletePost);

//포스트 수정하기
router.patch("/:id", postsCtrl.updatePost);

module.exports = router;
