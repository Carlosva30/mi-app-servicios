const express = require('express');
const router = express.Router();
const Solicitud = require('../models/Solicitud');
const verificarToken = require('../middleware/authMiddleware');

// 📝 Crear solicitud (cliente)
router.post('/', verificarToken, async (req, res) => {
  try {
    const { servicio, descripcion, valorPropuesto, expertoId } = req.body;

    const nuevaSolicitud = new Solicitud({
      servicio,
      descripcion,
      valorPropuesto,
      expertoId,
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

// 📄 Obtener solicitudes del cliente autenticado
router.get('/', verificarToken, async (req, res) => {
  try {
    const solicitudes = await Solicitud.find({ usuario: req.usuario.id }).sort({ fecha: -1 });
    res.json({ solicitudes });

  } catch (error) {
    console.error('❌ Error al obtener solicitudes:', error);
    res.status(500).json({ mensaje: 'Error al obtener solicitudes' });
  }
});

// 📄 Obtener solicitudes que recibió el experto
router.get('/recibidas', verificarToken, async (req, res) => {
  try {
    const solicitudes = await Solicitud.find({ expertoId: req.usuario.id }).sort({ fecha: -1 });
    res.json({ solicitudes });
  } catch (error) {
    console.error('❌ Error al obtener solicitudes recibidas:', error);
    res.status(500).json({ mensaje: 'Error al obtener solicitudes del experto' });
  }
});

// 🔁 Actualizar estado: aceptar/rechazar o marcar como realizado
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const { estado } = req.body;
    const solicitud = await Solicitud.findById(req.params.id);

    if (!solicitud) {
      return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
    }

    // Aceptar o rechazar por experto
    if (estado === 'aceptada' || estado === 'rechazada') {
      solicitud.estado = estado;
    }

    // Cliente marca como realizada
    if (estado === 'realizada_cliente') {
      solicitud.clienteConfirmo = true;
    }

    // Experto marca como realizada
    if (estado === 'realizada_experto') {
      solicitud.expertoConfirmo = true;
    }

    // Marcar como completada si ambos confirmaron
    if (solicitud.clienteConfirmo && solicitud.expertoConfirmo) {
      solicitud.estado = 'completada';
    }

    await solicitud.save();
    res.json({ mensaje: '✅ Solicitud actualizada', solicitud });

  } catch (error) {
    console.error('❌ Error actualizando solicitud:', error);
    res.status(500).json({ mensaje: 'Error al actualizar solicitud' });
  }
});

module.exports = router;
