const fs = require('fs');
const path = require('path');

const logPath = 'C:/logs/nodejs.log';
const logDir = path.dirname(logPath);

// Verifica que exista la carpeta C:/logs
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

function writeLog({ status, userId = '-', method, path, ip, message }) {
    const logEntry = `[${new Date().toISOString()}] ${status} | IP: ${ip} | METHOD: ${method} | PATH: ${path} | USER: ${userId} | MSG: ${message}\n`;
    fs.appendFileSync(logPath, logEntry);
}

module.exports = {
    writeLog
};
