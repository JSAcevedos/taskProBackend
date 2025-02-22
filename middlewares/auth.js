const { requireHelper } = require('../util/helper')
const jwt = require("jsonwebtoken")
const { decryptData } = requireHelper('util/encrypt')
const config = requireHelper('config/config')

async function authMiddleware (req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decryptedToken = decryptData(token.replace('Bearer ', ''))
        const payload = jwt.verify(decryptedToken, config.secretJwtKey)

        req.userId = payload.userId
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = {
    authMiddleware
}