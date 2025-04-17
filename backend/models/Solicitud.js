const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  email: String,
  servicio: String,
  descripcion: String,
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Solicitud', solicitudSchema);
