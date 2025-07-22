const { requireHelper } = require('../util/helper');
const jwt = require("jsonwebtoken");
const { decryptData } = requireHelper('util/encrypt');
const config = requireHelper('config/config');
const { writeLog } = require('../util/logger.js'); // Importamos el logger

async function authMiddleware(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;

    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decryptedToken = decryptData(token);
        const payload = jwt.verify(decryptedToken, config.secretJwtKey);

        req.userId = payload.userId;

        writeLog({
            status: '✅ AUTH OK',
            userId: payload.userId,
            method: req.method,
            path: req.originalUrl,
            ip,
            message: 'Acceso autorizado'
        });

        next();
    } catch (error) {
        writeLog({
            status: '❌ AUTH FAIL',
            method: req.method,
            path: req.originalUrl,
            ip,
            message: error.message
        });

        res.status(401).send({ error: 'Please authenticate' });
    }
}

module.exports = {
    authMiddleware
};
