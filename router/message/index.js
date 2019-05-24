const express = require("express");
const router = express.Router();
const needsAuth = require("../../lib/needsAuth");

const messageCtrl = require("./message.ctrl");

//id는 자기 id입니다.
router.get("/mymails", needsAuth.checkLogin, messageCtrl.getMessageToMe);
//id는 상대의 id입니다.
router.post("/send/:id", needsAuth.checkLogin, messageCtrl.sendMessageToId);


module.exports = router;
