const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
require('dotenv').config(); // Cargar variables de entorno

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Usar la clave secreta del .env

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

    // Crear y guardar el nuevo usuario
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

// Login de usuario
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos.' });
    }

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos.' });
    }

    // Generar el token
    const token = jwt.sign(
      { id: usuario._id, tipoUsuario: usuario.tipoUsuario },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      mensaje: 'Login exitoso',
      token,
      tipoUsuario: usuario.tipoUsuario,
      nombre: usuario.nombre,
      correo: usuario.correo
    });

  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error.message);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
});

module.exports = router;
