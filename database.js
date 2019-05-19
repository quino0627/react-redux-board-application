const mysql = require("mysql2/promise");

module.exports = () => {
  return {
    init: () => {
      return mysql.createPool({
        host: "ipobfcpvprjpmdo9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "eqtru7wlsqzsdved",
        password: "acvsbnanm7o1ynjt",
        database: "va1rgpsck1az4tvc"
      });
    }
  };
};
