const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Definimos el esquema de cotización directamente aquí
const solicitudSchema = new mongoose.Schema({
  expertoId: { type: String, required: true },
  servicio: { type: String, required: true },
  descripcion: { type: String, required: true },
  valorPropuesto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});


const Solicitud = mongoose.model('Solicitud', solicitudSchema);

// Ruta POST para crear una cotización
router.post('/', async (req, res) => {
  try {
    const { expertoId, servicio, descripcion, valorPropuesto } = req.body;

    const nuevaSolicitud = new Solicitud({
      expertoId,
      servicio,
      descripcion,
      valorPropuesto
    });

    await nuevaSolicitud.save();

    res.status(201).json({ mensaje: '✅ Cotización guardada exitosamente' });
  } catch (error) {
    console.error('❌ Error al guardar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al guardar la solicitud' });
  }
});

// Ruta GET para ver todas las cotizaciones guardadas
router.get('/', async (req, res) => {
  try {
    const solicitudes = await Solicitud.find().sort({ fecha: -1 });
    res.json({ solicitudes });
  } catch (error) {
    console.error('❌ Error al obtener solicitudes:', error);
    res.status(500).json({ mensaje: 'Error al obtener solicitudes' });
  }
});

module.exports = router;
