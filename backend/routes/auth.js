const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Usuario = require('../models/Usuario');
const verificarToken = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();

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

// Recuperar contraseña con envío real de correo
router.post('/recuperar', async (req, res) => {
  const { correo } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Correo no registrado' });
    }

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
      text: `Hola ${usuario.nombre},\n\nRecibimos una solicitud para recuperar tu contraseña.\n\nPor seguridad, contáctanos si no fuiste tú.\n\nEste es un ejemplo. Pronto añadiremos un enlace real de recuperación.`
    };

    await transporter.sendMail(mailOptions);

    res.json({ mensaje: 'Correo enviado correctamente. Revisa tu bandeja de entrada.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al enviar correo de recuperación' });
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
