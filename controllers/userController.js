const { userGet, getMessage } = require("../models/userModels")
const { response } = require("../utils/response")

const getUserDataFunction = async (req, res) => {
    try {
        userGet((err, result) => {
            if(err) return response(res, 500, "error: DB error", err.message)
            if(!result) return response(res, 404, "User not found")
            return response(res, 200, '', result)
        })
    } catch (error) {
        return response(res, 500, "error: Internal server error", error.message)
    }
}

const getMessageFunction = async(req, res) => {
    try {
        getMessage((err, result) => {
            if(err) return response(res, 500, "error: DB error", err.message)
            if(!result) return response(res, 404, "Message not found")
            return response(res, 200,"", result)
        })
    } catch (error) {
        return response(res, 500, "error: Internal server error", error.message)
    }
}

module.exports={getUserDataFunction, getMessageFunction}