const express = require('express');
const router = express.Router();
const Solicitud = require('../models/Solicitud');
const verificarToken = require('../middleware/authMiddleware');

// Guardar solicitud vinculada al usuario autenticado
router.post('/', verificarToken, async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud({
      email: req.body.email,
      servicio: req.body.servicio,
      descripcion: req.body.descripcion,
      usuario: req.usuario.id // viene del token
    });

    await nuevaSolicitud.save();
    res.status(201).json({ mensaje: 'Solicitud guardada exitosamente' });
  } catch (error) {
    console.error('❌ Error al guardar solicitud:', error.message);
    res.status(500).json({ error: 'Error al guardar la solicitud' });
  }
});

// Obtener solo las solicitudes del usuario autenticado
router.get('/', verificarToken, async (req, res) => {
  try {
    const solicitudes = await Solicitud.find({ usuario: req.usuario.id });
    res.json({ solicitudes });
  } catch (error) {
    console.error('❌ Error al obtener solicitudes:', error.message);
    res.status(500).json({ error: 'Error al obtener las solicitudes' });
  }
});

module.exports = router;
