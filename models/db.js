const mysql = require("mysql");
const scheme = require("../models/scheme");
require("dotenv").config();

const con = mysql.createConnection({
  host: process.env.DB_URL,
  user: process.env.DB_ID,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

con.connect(async (err) => {
  if (err) console.log(err.message);

  // create table
  for (let key in scheme) {
    await con.query(scheme[key]);
  }
  console.log("DB Connected!");
});

module.exports = con;
