const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const verificarToken = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();

// Registro con contraseña encriptada
router.post('/registro', async (req, res) => {
  try {
    const { nombre, correo, contraseña, tipoUsuario } = req.body;

    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña: contraseñaHasheada,
      tipoUsuario
    });

    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error en el registro', error });
  }
});

// Login con verificación segura
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Correo no encontrado' });
    }

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        correo: usuario.correo,
        tipoUsuario: usuario.tipoUsuario
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, usuario, tipoUsuario: usuario.tipoUsuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el login', error });
  }
});

// Obtener usuario por ID
router.get('/:id', verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar el usuario', error });
  }
});

// Actualizar perfil del usuario
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar perfil', error });
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
