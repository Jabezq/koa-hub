const mysql = require('mysql2');

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = require('./config');

const pool = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});

pool.getConnection((err, conn) => {
  if (err) {
    console.log("Database connection failed.", err)
  } else {
    console.log("Database connection successful.");
  }
})

module.exports = pool.promise();