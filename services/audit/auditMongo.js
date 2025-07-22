// modelos/auditoria.model.js
const mongoose = require('mongoose');

const auditoriaSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  userId: String,
  accion: String,
  recurso: String,
  idRecurso: String,
  datos: mongoose.Schema.Types.Mixed,
  ip: String,
  userAgent: String
});

module.exports = mongoose.model('auditoriaa', auditoriaSchema); // nombre debe coincidir con la colección


