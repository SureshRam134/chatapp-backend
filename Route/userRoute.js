
const express = require('express');
const { getUserDataFunction, getMessageFunction } = require('../controllers/userController');
const { userTokenVerify } = require('../middleware/userMiddleware');

const userRoute = express.Router();
userRoute.get('/getuser',userTokenVerify, getUserDataFunction )
userRoute.get('/getmessage',userTokenVerify, getMessageFunction )

module.exports = userRoute;