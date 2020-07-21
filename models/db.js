const mysql = require("mysql");
require("dotenv").config();

const con = mysql.createConnection({
  host: process.env.DB_URL,
  user: process.env.DB_ID,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

con.connect((err) => {
  if (err) throw err;
  console.log("DB Connected!");
});

module.exports = con;
