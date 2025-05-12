const express = require('express');
const router = express.Router();
const Cotizacion = require('../models/Cotizacion');

// 🟢 GUARDAR
router.post('/', async (req, res) => {
  try {
    const cotizacion = new Cotizacion(req.body);
    await cotizacion.save();
    res.status(201).json({ mensaje: 'Cotización guardada', cotizacion });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar cotización' });
  }
});

// 🔵 MOSTRAR TODAS
router.get('/', async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.find().sort({ fecha: -1 });
    res.json({ cotizaciones });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener cotizaciones' });
  }
});

module.exports = router;
