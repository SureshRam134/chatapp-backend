const jwt = require("jsonwebtoken")
const { response } = require("../utils/response")

const userTokenVerify = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return response(res, 401, "Token not found")
    if (!authHeader.startsWith("Bearer ")) return response(res, 401, "Invalid token format");
    const token = authHeader.split("Bearer ")[1]
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify;
        next();
    } catch (error) {
        return response(res, 403, "Invalid token")
    }
}

module.exports = { userTokenVerify }
