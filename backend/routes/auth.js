const verificarToken = require('../middleware/authMiddleware');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');


const router = express.Router();
const JWT_SECRET = 'mi_clave_secreta'; // más adelante lo pondremos en .env

// Registro de usuario
router.post('/registro', async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

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
      contraseña: contraseñaSegura
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });

  } catch (error) {
    console.error('❌ Error al registrar:', error.message); // 👈 muestra el mensaje real del error
    res.status(500).json({ mensaje: 'Error al registrar' });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;


  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!coincide) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, correo: usuario.correo },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });

  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error.message);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
});


router.get('/perfil', verificarToken, (req, res) => {
    res.json({
      mensaje: 'Accediste al perfil protegido',
      usuario: req.usuario
    });
  });
  
module.exports = router;
