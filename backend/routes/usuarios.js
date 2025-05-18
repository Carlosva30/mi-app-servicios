const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const verificarToken = require('../middleware/authMiddleware');

// Actualizar perfil del usuario (experto)
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const { nombre, servicio, zona, contacto } = req.body;

    const actualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, servicio, zona, contacto },
      { new: true }
    );

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error actualizando el perfil', error });
  }
});

module.exports = router;
