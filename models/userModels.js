const db = require('../config/database')

const userGet = (callback) => {
    const sql = "SELECT * FROM user"
    db.query(sql, callback)
}

const sendMessage = (data, callback) => {
    const sql = `INSERT INTO messages (sender_id, receiver_id, sender_name, message) VALUES (?, ?, ?, ?)`
    db.query(sql, data, callback)
}

const getMessage = (callback) => {
    const sql = "SELECT * FROM messages"
    db.query(sql, callback)
}

module.exports = { userGet, sendMessage, getMessage }