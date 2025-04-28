import React, { useState } from 'react';
import axios from '../../api/axios';

function Login({ onLoginExitoso, onRegistro }) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post('/auth/login', { correo, contraseña });
      localStorage.setItem('token', respuesta.data.token);
      if (onLoginExitoso) onLoginExitoso();
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al iniciar sesión');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      {/* Logo */}
      <div style={{ marginBottom: '20px' }}>
        <img src="https://via.placeholder.com/150" alt="Logo" style={{ width: '100px' }} />
      </div>

      <h2>Iniciar sesión</h2>

      <form onSubmit={manejarLogin}>
        {/* Email o nombre */}
        <input
          type="email"
          placeholder="Email o Nombre"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          style={{ width: '250px', padding: '10px', marginBottom: '10px' }}
        />
        <br />

        {/* Contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
          style={{ width: '250px', padding: '10px', marginBottom: '10px' }}
        />
        <br />

        {/* Link olvidar contraseña (solo visual por ahora) */}
        <div style={{ marginBottom: '20px' }}>
          <a href="#" style={{ fontSize: '14px', color: '#ccc' }}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Botones */}
        <button type="submit" style={{ marginRight: '10px', padding: '10px 20px' }}>Entrar</button>
        <button type="button" onClick={onRegistro} style={{ padding: '10px 20px' }}>Registrarse</button>

        {/* Mensaje de error */}
        {mensaje && <p style={{ color: 'red', marginTop: '15px' }}>{mensaje}</p>}
      </form>
    </div>
  );
}

export default Login;
