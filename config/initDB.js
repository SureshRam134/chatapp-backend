const db = require("./DataBase")

const userRegTable = "CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(150) NOT NULL, email VARCHAR(150) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL)"
db.query(userRegTable, (err) => {
    if (err) return console.log("User table not create", err);
    return console.log("User table create")
})

const chatMessage = "CREATE TABLE IF NOT EXISTS messages (id INT AUTO_INCREMENT PRIMARY KEY,sender_id INT,receiver_id INT,sender_name VARCHAR(255),message TEXT)"
db.query(chatMessage, (err) => {
    if (err) return console.log("Message table not create", err);
    return console.log("Message table create")
})





