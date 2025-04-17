const express = require('express');
const router = express.Router();
const Solicitud = require('../models/Solicitud');

// Ruta para guardar una solicitud
router.post('/', async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud(req.body);
    await nuevaSolicitud.save();
    res.status(201).json({ mensaje: 'Solicitud guardada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la solicitud' });
  }
});

// Ruta para obtener todas las solicitudes 
router.get('/', async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las solicitudes' });
  }
});

module.exports = router;
