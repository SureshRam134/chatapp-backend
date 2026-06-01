const express =  require( "express")
const cors = require( "cors")
const httpServer = require('http')
const {Server} = require('socket.io')
require("dotenv").config()
const authRoute = require("./Route/authRoute");
const userRoute = require("./Route/userRoute")
const db = require("./config/DataBase")
const { sendMessage } = require("./models/userModels")
require("./config/initDB")

const app =express();
const server = httpServer.createServer(app)
app.use(cors());
app.use(express.json())
app.use('/api',authRoute)
app.use('/api/user', userRoute )
const io = new Server(server, {
    cors: {origin: "http://localhost:5173"}
})

io.on("connection", (socket) => {
    socket.on("send_message", (data) => {
        const {sender_id, receiver_id, sender_name, message} = data
        sendMessage([sender_id, receiver_id, sender_name, message], (err) => {
            if (err) {
                console.log("Error: DB Error", err);
            }else{
                io.emit('receive_message', data)
            }
        })

    })
})
 
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`server running port ${PORT}`);
})