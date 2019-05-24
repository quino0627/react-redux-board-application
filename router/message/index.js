const express = require("express");
const router = express.Router();
const needsAuth = require("../../lib/needsAuth");

const messageCtrl = require("./message.ctrl");

module.exports = router;
