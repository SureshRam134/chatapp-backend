const response =(res, code, msg, result = null) => {
    return res.status(code).json({status:code<400 ,message:msg , result} )
}
module.exports = {response}