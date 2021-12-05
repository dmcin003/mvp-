const db = require("../../config/config.js");
const { Pool } = require("pg");

const pool = new Pool(db.CONFIG);

pool.connect(() => {
  console.log("connected to db");
});

module.exports.pool = pool;
