const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Usuario = require('../models/Usuario');
const verificarToken = require('../middleware/authMiddleware');

// Registro
router.post('/registro', async (req, res) => {
  try {
    const { nombre, correo, contraseña, tipoUsuario } = req.body;

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña: hashedPassword,
      tipoUsuario
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ mensaje: 'Error al registrar el usuario' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo no registrado' });
    }

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({
      id: usuario._id,
      correo: usuario.correo,
      tipoUsuario: usuario.tipoUsuario
    }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.status(200).json({
      mensaje: 'Login exitoso',
      token,
      tipoUsuario: usuario.tipoUsuario,
      usuario: {
        nombre: usuario.nombre,
        correo: usuario.correo,
        tipoUsuario: usuario.tipoUsuario
      }
    });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
});

// Ruta protegida para obtener perfil
router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-contraseña');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ usuario });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ mensaje: 'Error al obtener perfil' });
  }
});

module.exports = router;
