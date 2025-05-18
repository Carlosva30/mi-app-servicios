const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No hay token.' });
  }

  try {
    const tokenSinBearer = token.replace('Bearer ', '');
    const verificado = jwt.verify(tokenSinBearer, JWT_SECRET);
    req.usuario = {
      id: verificado.id,
      correo: verificado.correo,
      tipoUsuario: verificado.tipoUsuario
    };
    next();
  } catch (error) {
    res.status(400).json({ mensaje: 'Token inválido' });
  }
}

module.exports = verificarToken;
