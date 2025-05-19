const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const verificarToken = require('../middleware/authMiddleware');
const router = express.Router();
require('dotenv').config();

// Registro
router.post('/registro', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.contraseña, salt);

    const nuevoUsuario = new Usuario({
      nombre: req.body.nombre,
      correo: req.body.correo,
      contraseña: hashed,
      tipoUsuario: req.body.tipoUsuario
    });

    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error en el registro', error });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({
      id: usuario._id,
      correo: usuario.correo,
      tipoUsuario: usuario.tipoUsuario
    }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token, usuario, tipoUsuario: usuario.tipoUsuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el login', error });
  }
});

// Obtener todos los expertos
router.get('/', async (req, res) => {
  try {
    const expertos = await Usuario.find({ tipoUsuario: 'experto' });
    res.json(expertos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener expertos', error });
  }
});

module.exports = router;
