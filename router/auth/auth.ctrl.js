const mysql_db = require("../../database/db.config")();
const pool = mysql_db.init();
require("babel-polyfill");
const moment = require("moment");
const util = require("util");
const crypto = require("crypto");
const randomBytes = util.promisify(crypto.randomBytes);
const pbkdf2 = util.promisify(crypto.pbkdf2);

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
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const db_result = await processQuery(
      "SELECT id, username, pwd, pwd_help FROM `user` WHERE username = ?",
      [username]
    );
    if (db_result.length > 0) {
      const input = await pbkdf2(
        password,
        db_result[0].pwd_help,
        100000,
        64,
        "sha512"
      );
      if (input.toString("base64") === db_result[0].pwd) {
        req.session.user = {
          uid: db_result[0].id,
          username: username
        };
        res.send("LOGIN SUCCESS");
      } else {
        res.send("LOGIN FAIL");
      }
    } else {
      return res.status(401).json({ success: false });
    }
  } catch (e) {
    res.send("Internal Error");
    throw e;
  }
};

exports.check = async (req, res) => {
  if (typeof req.session.user === "undefined") {
    return res.status(401).json({
      logged: false
    });
  }
  res.json({ logged: req.session.user });
};

exports.logout = async (req, res) => {
  // req.session = null;
  req.session.destroy(err => {
    if (err) throw err;
  });
  return res.json({ sucess: true });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await randomBytes(64);
    const pwd = await pbkdf2(
      password,
      salt.toString("base64"),
      100000,
      64,
      "sha512"
    );
    const data = [username, pwd.toString("base64"), salt.toString("base64")];
    console.log(data);
    await processQuery(
      "INSERT INTO `user` (username, pwd, pwd_help) VALUES (?,?,?)",
      data
    );
    return res.json({ sucess: true });
  } catch (e) {
    throw e;
  }
};
