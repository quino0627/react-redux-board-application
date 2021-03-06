const mysql_db = require("../../database/db.config")();
const pool = mysql_db.init();
require("babel-polyfill");
const util = require("util");
const crypto = require("crypto");
const randomBytes = util.promisify(crypto.randomBytes);
const pbkdf2 = util.promisify(crypto.pbkdf2);

// **************BEGIN EDITING*****************
async function processQuery(query, data) {
  try {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const [rows2] = await conn.query(
        "SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE"
      );
      const [rows5] = await conn.query("SET autocommit=0");
      const [rows3] = await conn.query("SELECT @@TX_ISOLATION");
      console.log(rows3);
      const [rows4] = await conn.query("SELECT @@AUTOCOMMIT");
      console.log(rows4);
      console.log("Transaction Started");
      const sql = conn.format(query, data);
      const [result] = await conn.query(sql);
      await conn.commit();
      conn.release();
      console.log("Transaction End");
      return result;
    } catch (e) {
      await conn.rollback();
      conn.release();
      console.log("Query Error");
      throw e;
    }
  } catch (e) {
    console.log("DB error");

    throw e;
  }
}

// **************QUIT EDITING*****************

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
        res.status(401).json({ success: false });
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

    const duplicated = await processQuery(
      "SELECT * FROM `user` WHERE `username`= ?",
      username
    );

    if (duplicated === []) {
      return res.status(401).json({ success: false });
    } else {
      console.log("ASDF");
      await processQuery(
        "INSERT INTO `user` (username, pwd, pwd_help) VALUES (?,?,?)",
        data
      );
      return res.json({ sucess: true });
    }
  } catch (e) {
    throw e;
  }
};
