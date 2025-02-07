const mongoose = require('mongoose');
const { requireHelper } = require('../util/helper');
const config = requireHelper('config/config');

async function initDatabase () {
  try {
    const connection = await mongoose.connect(config.dbUrl);
    console.log('Database connected');
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  initDatabase
};