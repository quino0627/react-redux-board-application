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

exports.getMessageToMe = async (req, res) => {
  try {
    console.log("SSIBAL");
    let myId = req.currentUserId;
    console.log(myId);
    const result = await processQuery(
      "SELECT * FROM message natural join (SELECT id as sender_id, username as sender_username FROM user) as t WHERE receiver_id = ?",
      [myId]
    );
    res.json(result);
  } catch (e) {
    throw e;
  }
};

exports.sendMessageToId = async (req, res) => {
  try {
    let myId = req.currentUserId;
    // let toId = req.params;
    let { message_content, receiver_username } = req.body;
    console.log(receiver_username);

    const tmp = await processQuery("SELECT id FROM user WHERE username=?", [
      receiver_username
    ]);
    const receiverId = tmp[0].id;
    console.log(receiverId);
    const message_at = moment()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const result = await processQuery(
      "INSERT INTO `message` (sender_id, receiver_id, message_content, message_at) VALUES (?,?,?,?)",
      [myId, receiverId, message_content, message_at]
    );
    res.json(result);
  } catch (e) {
    res.status(401).json({ success: false });
    throw e;
  }
};
