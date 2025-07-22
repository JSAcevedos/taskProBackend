// services/auditoriaService.js
const Auditoria = require('../modelos/auditoria.model');

async function logAuditoria({ req, accion, recurso, idRecurso, datos }) {
  try {
    await Auditoria.create({
      userId: req.userId,
      accion,
      recurso,
      idRecurso,
      datos,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
  } catch (err) {
    console.error("Error guardando log de auditoría:", err.message);
  }
}

module.exports = { logAuditoria };
