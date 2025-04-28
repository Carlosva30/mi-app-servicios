const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  servicio: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  usuario: { // Aquí está el vínculo con el usuario autenticado
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});

module.exports = mongoose.model('Solicitud', solicitudSchema);