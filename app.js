const express = require('express')
const { requireHelper } = require('./util/helper')
const database = requireHelper('database/index')
const routes = requireHelper('routes/index')
const config = requireHelper('config/config')
const cors = require('cors');

const port = config.appPort

async function startApp() {
  try {
    const db = await database.initDatabase()
    const app = express()

    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
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