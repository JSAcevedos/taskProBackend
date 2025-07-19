const express = require('express')
const { requireHelper } = require('./util/helper')
const database = requireHelper('database/index')
const routes = requireHelper('routes/index')
const config = requireHelper('config/config')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const port = config.appPort

async function startApp() {
  try {
    const db = await database.initDatabase()
    const app = express()

    // Set up rate limiting to prevent abuse - DDoS protection on Backend
    const limiter = rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 50, // Limit each IP to 50 requests per windowMs
      message: {
        status: 429,
        error: 'Too many requests, please try again later.'
      },
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false // Disable the `X-RateLimit-*` headers
    })

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(limiter)
    app.use(routes)

    app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })

    module.exports = { app, db }
  } catch (error) {
    console.error('Failed to start the app:', error)
    process.exit(1)
  }
}

startApp()