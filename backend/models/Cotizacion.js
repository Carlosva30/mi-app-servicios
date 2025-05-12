const mongoose = require('mongoose');

const cotizacionSchema = new mongoose.Schema({
  expertoId: String, // El ID del experto que elige el cliente
  descripcion: String, // Qué necesita
  valorPropuesto: Number, // Cuánto quiere pagar
  clienteEmail: String, // Para saber quién pidió
  fecha: {
    type: Date,
    default: Date.now // Se pone automáticamente la fecha actual
  }
});

module.exports = mongoose.model('Cotizacion', cotizacionSchema);
