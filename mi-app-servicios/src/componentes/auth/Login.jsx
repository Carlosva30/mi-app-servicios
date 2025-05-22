import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLoginExitoso, onRegistro }) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const manejarLogin = async () => {
    try {
      const respuesta = await axios.post('https://backend-nowservices.onrender.com/api/auth/login', {
        correo,
        contraseña
      });

      const { token, usuario, tipoUsuario } = respuesta.data;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('tipoUsuario', tipoUsuario);

      if (onLoginExitoso) {
        onLoginExitoso(tipoUsuario);
      }
    } catch (err) {
      console.error(err);
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
      />
      <button onClick={() => onRegistro('recuperar')}>¿Olvidaste tu contraseña?</button>
      <button onClick={manejarLogin}>Ingresar</button>
      <button onClick={onRegistro}>Registrarse</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
