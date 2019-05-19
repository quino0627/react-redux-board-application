const express = require("express");
const router = express.Router();
require("babel-polyfill");
const mysql_db = require("./database")();
const pool = mysql_db.init();
const moment = require("moment");

//포스트 올리기
router.post("/api/posts", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      let { post_title, post_content, board_no, user_id } = req.body;
      //temp
      board_no = 1;
      user_id = 1;
      const created_at = moment()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const sql = conn.format(
        "INSERT INTO `post` (post_title, post_content, created_at, board_no, user_id) VALUES (?,?,?,?,?)",
        [post_title, post_content, created_at, board_no, user_id]
      );
      await conn.query(sql);
      conn.release();
      res.send("Successfully uploaded!");
    } catch (e) {
      conn.release();
      throw e;
    }
  } catch (e) {
    throw e;
  }
});

//포스트 리스트 받기
router.get("/api/posts", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const sql = conn.format("SELECT * FROM `post`", []);
      const [result] = await conn.query(sql);
      conn.release();
      res.json(result);
    } catch (e) {
      conn.release();
      throw e;
    }
  } catch (e) {
    throw e;
  }
});

//포스트 가져오기
router.get("/api/posts/:id", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const { id } = req.params;
      const sql = conn.format("SELECT * FROM `post` WHERE post_no=?", [id]);
      const [result] = await conn.query(sql);
      conn.release();
      res.json(result);
    } catch (e) {
      conn.release();
      throw e;
    }
  } catch (e) {
    throw e;
  }
});

//포스트 삭제하기
router.delete("/api/posts/:id", (req, res) => {
  res.end();
});

//포스트 올리기
router.patch("/api/posts/:id", (req, res) => {
  res.end();
});

module.exports = router;
