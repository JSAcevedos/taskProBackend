process.loadEnvFile()

const config = {
    appPort: process.env.APP_PORT,
    dbUrl: process.env.MONGO_DB_URL,
    webUrl: process.env.WEB_URL,
    secretJwtKey: process.env.SECRET_JWT_KEY,
    secretKey: process.env.SECRET_KEY
}

module.exports = config