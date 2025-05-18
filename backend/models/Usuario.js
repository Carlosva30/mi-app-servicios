const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  },
  tipoUsuario: {
    type: String,
    enum: ['cliente', 'experto'],
    required: true
  },
  servicio: {              // NUEVO: servicio ofrecido
    type: String
  },
  zona: {                  // NUEVO: zona de cobertura
    type: String
  },
  contacto: {              // NUEVO: número de contacto
    type: String
  },
  estado: {                // NUEVO: disponibilidad
    type: Boolean,
    default: true
  },
  calificacion: {          // opcional
    type: Number,
    default: 0
  },
  serviciosRealizados: {   // opcional
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
