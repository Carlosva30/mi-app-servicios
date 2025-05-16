const express = require('express');
const router = express.Router();
const Cotizacion = require('../models/Cotizacion');
const verificarToken = require('../middleware/authMiddleware');


// Crear una cotización
router.post('/', verificarToken, async (req, res) => {
  try {
    const { expertoId, descripcion, valorPropuesto } = req.body;

    const nuevaCotizacion = new Cotizacion({
      expertoId,
      descripcion,
      valorPropuesto,
      clienteEmail: req.usuario.correo, // tomado desde el token
      fecha: new Date()
    });

    await nuevaCotizacion.save();

    res.status(201).json({ mensaje: 'Cotización guardada correctamente ✅' });
  } catch (error) {
    console.error('Error al guardar cotización:', error);
    res.status(500).json({ mensaje: '❌ Error al guardar la cotización' });
  }
});

// Obtener todas las cotizaciones del usuario autenticado
router.get('/', verificarToken, async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.find({ clienteEmail: req.usuario.correo });
    res.json({ cotizaciones });
  } catch (error) {
    console.error('Error al obtener cotizaciones:', error);
    res.status(500).json({ mensaje: '❌ Error al obtener cotizaciones' });
  }
});

module.exports = router;
