const jwt = require('jsonwebtoken')
const { dbRegister, dbLogin } = require("../models/authModules");
const bcrypt = require('bcrypt');
const { response } = require('../utils/response');
const userRegisterFunction = async (req, res) => {
    const { name, email, password } = req.body
    try {
        if (!name || !email || !password) return res.status(400).json("All fields are required")
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(email)) return response(res, 400, "Enter Valid Email")
        if (!/(?=.*[a-z])/.test(password)) return response(res, 400, "Must have one small letter")
        if (!/(?=.*[A-Z])/.test(password)) return response(res, 400, "Must have one capital letter")
        if (!/(?=.*[@#$%&!*])/.test(password)) return response(res, 400, "Must have one special character")
        if (!/(?=.*\d)/.test(password)) return response(res, 400, "Must have one number")
        if (password.length < 8) return response(res, 400, "Must have 8 character")
        const hashPassword = await bcrypt.hash(password, 10)
        dbRegister([name, email, hashPassword], (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: "Email already exists" })
                return response(res, 400, "database error")
            }
            return response(res, 200, "SuccessFully Registered")
        })
    } catch (error) {
        return response(res, 500, "error: Internal server error", error.message)
    }
}

const userLoginFunction = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) return response(res, 400, "All fields are required")
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(email)) return response(res, 400, "Enter Valid Email")
        if (!/(?=.*[a-z])/.test(password)) return response(res, 400, "Must have one small letter")
        if (!/(?=.*[A-Z])/.test(password)) return response(res, 400, "Must have one capital letter")
        if (!/(?=.*[@#$%&!*])/.test(password)) return response(res, 400, "Must have one special character")
        if (!/(?=.*\d)/.test(password)) return response(res, 400, "Must have one number")
        if (password.length < 8) return response(res, 400, "Must have 8 character")
        dbLogin([email], async (err, result) => {
            if (err) return response(res, 500, "error: DB error", err.message)
            const user = result[0]
            if (!user) return response(res, 400, "Email Invaild")
            const hashPassword = await bcrypt.compare(password, user.password)
            if (!hashPassword) return response(res, 400, "Password Invaild")
            const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP })
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            }
            return response(res, 200, "SuccessFully Logined", userData)
        })
    } catch (error) {
        return response(res, 500, "error: Internal server error", error.message)
    }
}

module.exports = { userRegisterFunction, userLoginFunction }