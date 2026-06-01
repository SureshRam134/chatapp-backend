const db = require('../config/database')

const dbRegister = (data, callback) => {
    const sql = "INSERT INTO user (`name`, `email`, `password`) VALUES (?, ?, ?)"
    db.query(sql, data, callback)
}

const dbLogin = (data, callback) => {
    const sql = "SELECT * FROM user WHERE email = ?"
    db.query(sql, data, callback)
}

module.exports = { dbRegister, dbLogin }