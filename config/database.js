const mysql = require('mysql2');
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.Db_LOCALHOST,
    user: process.env.Db_USER,
    password: '',
    database: process.env.Bd_DATABASE,
})
db.connect((err) => {
    if (err) {
        console.log("mysql connection error:", err)
    } else {
        console.log("mysql connected");
    }
})

module.exports = db;