const express = require('express');
const router = express.Router();
const Solicitud = require('../models/Solicitud');
const verificarToken = require('../middleware/authMiddleware');

// Crear solicitud (requiere autenticación)
router.post('/', verificarToken, async (req, res) => {
  try {
    const { servicio, descripcion } = req.body;

    const nuevaSolicitud = new Solicitud({
      servicio,
      descripcion,
      email: req.usuario.correo,
      usuario: req.usuario.id,
      fecha: new Date()
    });

    await nuevaSolicitud.save();
    res.status(201).json({ mensaje: '✅ Solicitud guardada exitosamente' });

  } catch (error) {
    console.error('❌ Error al guardar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al guardar la solicitud' });
  }
});

// Obtener solicitudes del usuario autenticado
router.get('/', verificarToken, async (req, res) => {
  try {
    const solicitudes = await Solicitud.find({ usuario: req.usuario.id }).sort({ fecha: -1 });
    res.json({ solicitudes });

  } catch (error) {
    console.error('❌ Error al obtener solicitudes:', error);
    res.status(500).json({ mensaje: 'Error al obtener solicitudes' });
  }
});

module.exports = router;
