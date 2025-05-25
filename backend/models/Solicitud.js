const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  servicio: String,
  descripcion: String,
  valorPropuesto: Number,
  email: String,
  expertoId: String,
  estado: {
    type: String,
    default: 'pendiente',
    enum: [
      'pendiente',         // aún sin respuesta
      'aceptada',          // el experto acepta
      'rechazada',         // el experto rechaza
      'realizada_cliente', // cliente marca como realizado
      'realizada_experto', // experto marca como realizado
      'completada'         // ambos marcaron como realizado
    ]
  },
  clienteConfirmo: {
    type: Boolean,
    default: false
  },
  expertoConfirmo: {
    type: Boolean,
    default: false
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Solicitud', solicitudSchema);
