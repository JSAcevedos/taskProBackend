const fs = require('fs');
const logPath = 'C:/logs/nodejs.log'; // Asegúrate de que esta carpeta exista

function writeLog({ status, userId = '-', method, path, ip, message }) {
    const logEntry = `[${new Date().toISOString()}] ${status} | IP: ${ip} | METHOD: ${method} | PATH: ${path} | USER: ${userId} | MSG: ${message}\n`;
    fs.appendFileSync(logPath, logEntry);
}

module.exports = {
    writeLog
};
