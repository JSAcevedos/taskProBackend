const CryptoJS = require("crypto-js")
const { requireHelper } = require('./helper')
const config = requireHelper('config/config')

function encryptData(data) {
  return CryptoJS.AES.encrypt(data, config.secretKey).toString()
}

function decryptData(encryptedData) {
  return CryptoJS.AES.decrypt(encryptedData, config.secretKey).toString(CryptoJS.enc.Utf8)
}

module.exports = {
  encryptData,
  decryptData
}