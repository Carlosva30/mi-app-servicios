const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Usuario = require('../models/Usuario');
const verificarToken = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();

// ——————————————
// Registro (sin hashing, guarda lo que venga en req.body)
// ——————————————
router.post('/registro', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('❌ Error en registro:', error);
    res.status(400).json({ mensaje: 'Error en el registro', error });
  }
});

// ——————————————
// Login (texto plano, iguala req.body.contraseña vs DB)
// ——————————————
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
      { id: usuario._id, correo: usuario.correo, tipoUsuario: usuario.tipoUsuario },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, usuario, tipoUsuario: usuario.tipoUsuario });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ mensaje: 'Error en el login', error });
  }
});

// ——————————————
// Recuperar contraseña (envío de correo real con Nodemailer)
// ——————————————
router.post('/recuperar', async (req, res) => {
  const { correo } = req.body;
  console.log('📩 Solicitud de recuperación recibida para:', correo);

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      console.log('⚠️ Correo no registrado:', correo);
      return res.status(404).json({ mensaje: 'Correo no registrado' });
    }

    // ✅ Verificar que las variables estén definidas
    if (!process.env.EMAIL_FROM || !process.env.EMAIL_PASS) {
      console.error('❌ Faltan credenciales en .env');
      return res.status(500).json({ mensaje: 'Error de configuración del servidor (correo).' });
    }

    console.log("📧 EMAIL_FROM:", process.env.EMAIL_FROM);
    console.log("🔐 EMAIL_PASS:", process.env.EMAIL_PASS ? "SÍ definida" : "NO definida");

    // ✅ Configurar transportador de Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Now Services" <${process.env.EMAIL_FROM}>`,
      to: correo,
      subject: 'Recuperación de contraseña - Now Services',
      text: `Hola ${usuario.nombre || 'usuario'},\n\nRecibimos una solicitud para recuperar tu contraseña.\n\nPor seguridad, contáctanos si no fuiste tú.\n\nEste es un ejemplo; pronto añadiremos un enlace real de recuperación.`
    };

    console.log('🚀 Enviando correo a:', correo);
    await transporter.sendMail(mailOptions);
    console.log('✅ Correo enviado con éxito');

    res.json({ mensaje: '📬 Correo enviado correctamente. Revisa tu bandeja de entrada.' });

  } catch (error) {
    console.error('❌ Error al enviar correo de recuperación:', error);
    res.status(500).json({ mensaje: '❌ Error al enviar correo de recuperación.' });
  }
});

// ——————————————
// Obtener un usuario por ID (protegido)
// ——————————————
router.get('/:id', verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    console.error('❌ Error al buscar usuario:', error);
    res.status(500).json({ mensaje: 'Error al buscar el usuario', error });
  }
});

// ——————————————
// Actualizar perfil de usuario (protegido)
// ——————————————
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    res.status(500).json({ mensaje: 'Error al actualizar perfil', error });
  }
});

// ——————————————
// Listar todos los expertos
// ——————————————
router.get('/', async (req, res) => {
  try {
    const expertos = await Usuario.find({ tipoUsuario: 'experto' });
    res.json(expertos);
  } catch (error) {
    console.error('❌ Error al obtener expertos:', error);
    res.status(500).json({ mensaje: 'Error al obtener expertos', error });
  }
});

module.exports = router;


