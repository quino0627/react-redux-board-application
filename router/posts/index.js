const express = require("express");
const router = express.Router();
const needsAuth = require("../../lib/needsAuth");

const postsCtrl = require("./posts.ctrl");

router.post("/", needsAuth.checkLogin, postsCtrl.insertPost);

router.get("/", postsCtrl.readPosts);

router.get("/:id", postsCtrl.readPostsById);

router.get("/title/:title", postsCtrl.readPostsByTitle);

//포스트 삭제하기
router.delete("/:id", needsAuth.isMyUid, postsCtrl.deletePost);

//포스트 수정하기
router.patch("/:id", needsAuth.isMyUid, postsCtrl.updatePost);

module.exports = router;
