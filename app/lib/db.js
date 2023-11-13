const mysql = require("mysql2");
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;

const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});
module.exports = connection;

