const express = require("express");
const router = express.Router();

const authCtrl = require("./auth.ctrl");

router.post("/login", authCtrl.login);

router.get("/check", authCtrl.check);

router.post("/register", authCtrl.register);

router.post("/logout", authCtrl.logout);

module.exports = router;
