
const express = require('express')
const {userRegisterFunction, userLoginFunction} = require("../controllers/authControler")

const authRoute = express.Router();

authRoute.post('/register', userRegisterFunction)
authRoute.post('/login', userLoginFunction)


module.exports = authRoute