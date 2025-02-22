const mongoose = require('mongoose')
const { requireHelper } = require('../util/helper')
const config = requireHelper('config/config')

async function initDatabase () {
  await mongoose.connect(config.dbUrl)
    .then(() => console.log('Database connected'))
    .catch((error) => console.error(error))
}

module.exports = {
  initDatabase
}