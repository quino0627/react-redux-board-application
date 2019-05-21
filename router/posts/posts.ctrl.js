const mysql_db = require("../../database/db.config")();
const pool = mysql_db.init();
require("babel-polyfill");
const moment = require("moment");

async function processQuery(query, data) {
  try {
    const conn = await pool.getConnection();
    try {
      const sql = conn.format(query, data);
      const [result] = await conn.query(sql);
      conn.release();
      return result;
    } catch (e) {
      conn.release();
      throw e;
    }
  } catch (e) {
    throw e;
  }
}

exports.readPosts = async (req, res) => {
  try {
    let { page } = req.query;
    let result = await processQuery(
      "SELECT * FROM `post` ORDER BY `post_no` DESC LIMIT ? OFFSET ?",
      [5, (page - 1) * 5]
    );

    const postCount = await processQuery(
      "SELECT count (distinct `post_no`) as cnt from `post` "
    );
    const pageCount = Math.ceil(postCount[0].cnt / 10);
    res.set("Last-Page", pageCount);

    res.json(result);
    // console.log(postCount[0].cnt, pageCount);
  } catch (e) {
    throw e;
  }
};

exports.readPostsById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await processQuery("SELECT * FROM `post` WHERE post_no=?", [
      id
    ]);
    res.json(result);
  } catch (e) {
    throw e;
  }
};

exports.readPostsByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const result = await processQuery(
      "SELECT * FROM `post` WHERE post_title=?",
      [title]
    );
    res.json(result);
  } catch (e) {
    throw e;
  }
};

exports.insertPost = async (req, res) => {
  try {
    let { post_title, post_content, board_no, user_id } = req.body;
    const created_at = moment()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const response = await processQuery(
      "INSERT INTO `post` (post_title, post_content, created_at, board_no, user_id) VALUES (?,?,?,?,?)",
      [post_title, post_content, created_at, board_no, user_id]
    );
    console.log(response);
    res.send({
      _id: response.insertId,
      response: response
    });
  } catch (e) {
    throw e;
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    let { post_title, post_content, board_no, user_id } = req.body;
    //temp
    user_id = 1;
    const updated_at = moment()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    await processQuery(
      "UPDATE `post` SET post_title=?, post_content=?, updated_at=? WHERE post_no=? ",
      [post_title, post_content, updated_at, id]
    );
    res.send("Successfully uploaded!");
  } catch (e) {
    throw e;
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const updated_at = moment()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    await processQuery("DELETE FROM `post` WHERE post_no=? ", [id]);
    res.send("Successfully deleted!");
  } catch (e) {
    throw e;
  }
};
