const path = require('path')

function getBasePath() {
  return path.dirname(require.main.filename)
}

function requireHelper(modulePath) {
  return require(path.resolve(getBasePath(), modulePath))
}

module.exports = {
  requireHelper,
}
