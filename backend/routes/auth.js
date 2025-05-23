const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Usuario = require('../models/Usuario');
const verificarToken = require('../middleware/authMiddleware');
require('dotenv').config();

// Registro
router.post('/registro', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
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

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    if (usuario.contraseña !== contraseña) {
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

// Recuperar contraseña
router.post('/recuperar', async (req, res) => {
  const { correo } = req.body;
  console.log('📩 Solicitud de recuperación recibida para:', correo);

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      console.log('❌ Correo no registrado en la base de datos');
      return res.status(404).json({ mensaje: 'Correo no registrado' });
    }

    console.log('✅ Usuario encontrado, preparando envío de correo...');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: correo,
      subject: 'Recuperación de contraseña - Now Services',
      text: `Hola ${usuario.nombre},\n\nRecibimos una solicitud para recuperar tu contraseña.\n\nPor seguridad, contáctanos si no fuiste tú.\n\nEste es un ejemplo, pronto añadiremos un enlace real de recuperación.`
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Correo enviado correctamente a', correo);

    res.json({ mensaje: '📬 Correo enviado correctamente. Revisa tu bandeja de entrada.' });

  } catch (error) {
    console.error('❌ Error al enviar correo de recuperación:', error.message);
    res.status(500).json({ mensaje: '❌ Error al enviar correo de recuperación.', error: error.message });
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

// Actualizar perfil
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

