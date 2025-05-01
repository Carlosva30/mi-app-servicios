const verificarToken = require('../middleware/authMiddleware');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');


const router = express.Router();
const JWT_SECRET = 'mi_clave_secreta'; // más adelante lo pondremos en .env

// Registro de usuario
router.post('/registro', async (req, res) => {
  const { nombre, correo, contraseña, tipoUsuario } = req.body;

  try {
    // Verificar si el correo ya existe
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ mensaje: 'Ese correo ya está registrado.' });
    }

    // Encriptar la contraseña
    const contraseñaSegura = await bcrypt.hash(contraseña, 10);

    // Crear y guardar el nuevo usuario con tipo
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña: contraseñaSegura,
      tipoUsuario
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });

  } catch (error) {
    console.error('❌ Error al registrar:', error.message);
    res.status(500).json({ mensaje: 'Error al registrar' });
  }
});
