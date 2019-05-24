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

  exports.getMessageToMe = async (req, res) =>{
      try{
        let myId = req.currentUsername;
        const result = await processQuery("SELECT * FROM message natural join (SELECT id as sender_id, username as sender_username FROM user) as t WHERE receiver_id = ?", [myId]);
        res.json(result);
      }catch(e){
        throw e;
      }
  }

  exports.sendMessageToId = async (req, res) =>{
      try{
          let myId = req.currentUsername;
        let toId = req.params;
        let message_content = req.body;
        const message_at = moment()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
        const result = await processQuery("INSERT INTO `message` (sender_id, receiver_id, message_content, message_at) VALUES (?,?,?,?)", [myId, toId, message_content, message_at])
      } catch(e){
          throw e;
      }
  }